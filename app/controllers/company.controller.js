const config = require("../config/auth.config");
const db = require("../models");
const {where} = require("sequelize");
const e = require("express");
const Company = db.company;
const User = db.user;
const Personnel = db.personnel;
const PersonnelCompanyInfo = db.personneldetails;
const Task = db.task;
const UserGroup = db.usergroups;
const Rolegroup = db.rolegroups;
const Role = db.role;
const JobPosting = db.jobpostings;
const Event = db.event;
const AccessRequest = db.accessrequest;
var companyid;
exports.pendingPersonnelRequests = async (req, res) => {
    companyid;
    console.log(req.query)
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
        }
    } else {
        companyid = req.query.userid;
    }
    console.log(companyid);
    Company.findByPk(companyid)
        .then(company => {
            if (!company) {
                return res.status(404).send("Company not found");
            }else{
                const pendingPersonnels = [];

                Personnel.findAll({
                    where: {
                        company: company.id
                    }
                }).then(personnel => {
                    let counter = 0;

                    for (let i = 0; i < personnel.length; i++) {
                        User.findOne({
                            where: {
                                id: personnel[i].id
                            }
                        }).then(user => {
                            if (user) {
                                user.getRolegroups().then(rolesgroup => {
                                    if (rolesgroup[0].name === "pending") {

                                        pendingPersonnels.push({
                                            id: user.id,
                                            email: user.email,
                                            name: personnel[i].name,
                                            surname: personnel[i].surname,
                                            phone: personnel[i].phone
                                        });


                                    }

                                    counter++; // Increment the counter

                                    if (counter === personnel.length) {
                                        console.log(pendingPersonnels);
                                        res.status(200).send(pendingPersonnels); // Send data here
                                    }
                                });
                            }
                        }).catch(() => {
                            res.status(404).send({
                                message: "User Not Found"
                            })
                        });
                    }
                });
            }


        }).catch(error => {
        // Handle any errors in retrieving the company
        console.error(error);
        res.status(500).send("Internal Server Error");
    });

};

exports.getCompanyPersonnels = async (req, res) =>{
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
        }
    } else {
        companyid = req.query.userid;
    }
    Company.findByPk(companyid)
        .then(company  => {
            if (!company) {
                return res.status(404).send("Company not found");
            }

            const pendingPersonnels = [];

            Personnel.findAll({
                where: {
                    company: company.id
                }
            }).then(personnel => {
                let counter = 0;

                for (let i = 0; i < personnel.length; i++) {
                    User.findOne({
                        where: {
                            id: personnel[i].id
                        }
                    }).then(user => {
                        if (user) {
                            user.getRolegroups().then(rolegroups => {

                                    if(rolegroups[0].name !== "pending"){
                                        pendingPersonnels.push({
                                            id: user.id,
                                            email: user.email,
                                            name: personnel[i].name,
                                            surname: personnel[i].surname,
                                            phone: personnel[i].phone
                                        });
                                    }
                                counter++; // Increment the counter

                                if (counter === personnel.length) {
                                    console.log(pendingPersonnels);
                                    res.status(200).send(pendingPersonnels); // Send data here
                                }
                            });
                        }
                    }).catch(error => {
                        res.status(500).send({message: error.message});
                    });
                }
            });
        }).catch(error => {

        res.status(500).send({message: error.message});
    });

}
exports.confirmPending = (req, res) => {
    console.log(req.body.id);
   User.findOne({
       where:{
           id:req.body.id
       }
   }).then(user =>{
        if(user){
            user.setRolegroups([1]).then(rolegroup =>{
                console.log(rolegroup)
                res.status(200).send("User Confirmed Successfully");
            })
        }else{
            res.status(404).send({message: "User Not Found"})
        }
    }).catch(error =>{
        res.status(500).send({message: error.message})
   })
};


exports.selectedPersonnelCompanyInfo = (req, res) => {
    PersonnelCompanyInfo.findByPk(req.query.userid).then(personnel => {
       if(personnel){
           res.status(200).send({
               date_start: personnel.date_start,
               salary: personnel.salary,
               allowance: personnel.allowance
           });
       }else{
           res.status(200).send({message: "Personnel Not Found"})
       }
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
};
exports.editselectedPersonnelCompanyInfo = (req, res) => {
    console.log(req.body)
    PersonnelCompanyInfo.findByPk(req.body.id).then(personnel => {
        if(personnel){
            console.log(personnel)
           PersonnelCompanyInfo.update({
               salary: req.body.salary,
                   allowance: req.body.allowance
           },
               {where: {id: req.body.id}}

           ).then(()=>{
               res.status(200).send("Personnel updated successfully")
           })
        } else{
            res.status(404).send({message: "User Not Found"})
        }
    }).catch(error => {
        res.status(500).send({message: error.message})
    })
}
exports.createTask = async (req, res) => {
    var companyid;
    if (req.body.user_type === 0) {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.body.userid,
                },
            });
            companyid = personnel.company;
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
        }
    } else {
        companyid = req.body.userid;
    }
    Task.create({
        companyid: companyid,
        deadline: req.body.deadline,
        taskdesc: req.body.description,
        name:req.body.name,
        status: 0,
    }).then(() => {
        res.status(200).send("task created successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.getTasks = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
        }
    } else {
        companyid = req.query.userid;
    }
    Task.findAll({
        where: {
            companyid: companyid
        }
    }).then(tasks =>{
        if(tasks){
            res.status(200).send(tasks)
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.createUserGroup = async (req, res) => {
    console.log(req.body)
    var companyid;
    if (req.body.user_type === 0) {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.body.userid,
                },
            });
            companyid = personnel.company;
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
        }
    } else {
        companyid = req.body.userid;
    }
    UserGroup.create({
        name: req.body.groupname,
        companyid:companyid,
    }).then(usergroup =>{
        let counter = 0;
        for (let i = 0; i < req.body.selectedPersonnels.length; i++) {
            usergroup.setUsers([req.body.selectedPersonnels[i].id]);
            counter++;
        }
        if(counter === req.body.selectedPersonnels.length){
            res.status(200).send("User Group Created Successfully");
        }

    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}


exports.giveTaskToUser = (req, res) =>{
    console.log(req.body)
    User.findByPk(req.body.personnelid).then(user =>{
        if(user){
            user.addTask([req.body.taskid]).then(() =>{
                res.status(200).send("Task Given Successfully")
            })
        }

    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.giveTaskToUsergroup = (req, res) =>{
    console.log(req.body)
  UserGroup.findByPk(req.body.usergroupid).then(userGroup =>{
      userGroup.addTask([req.body.taskid]).then(() =>{
          res.status(200).send("Task given to user group successfully")
      })
  })
}
exports.getUsergroups = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
            
        } catch (error) {
            
        }
    } else {
        companyid = req.query.userid;
    }
    UserGroup.findAll({
        where: {
            companyid: companyid
        }
    }).then(usergroup =>{
        if(usergroup){
            res.status(200).send(usergroup)
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.createJobPostings = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.body.userid,
                },
            });
            companyid = personnel.company;
            
        } catch (error) {
            
        }
    }else{
        companyid = req.body.userid;
    }
    JobPosting.create({
        companyid: companyid,       
        jobtitle:req.body.jobtitle,    
        deadline: req.body.deadline,
        location:req.body.location,
        description: req.body.description,
        requirements:req.body.requirements,
        benefits:req.body.benefits,
    }).then(() => {
        res.status(200).send("job posting created successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.getJobPostings = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
           
        } catch (error) {
            
        }
    } else {
        companyid = req.query.userid;
    }
    JobPosting.findAll({
        where: {
            companyid: companyid
        }
    }).then(jobpostings =>{
        if(jobpostings){
            res.status(200).send(jobpostings)
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.editSelectedCompanyJobPosting = (req, res) =>{
    JobPosting.update({
        jobtitle: req.body.jobtitle,
        description: req.body.description,
        requirements: req.body.requirements,
        benefits: req.body.benefits,
        location: req.body.location
    },
        {
            where: {id: req.body.id}
        }).then(() =>{
            res.status(200).send("Job Posting Updated Successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.deleteJobPosting = (req, res) =>{
    JobPosting.destroy({
        where:{
            id:req.body.id
        }
    }).then(() =>{
        res.status(200).send("Job Posting Deleted")
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getSelectedJobPosting = (req, res) =>{
    JobPosting.findByPk(req.query.id).then(jobpostings =>{
        if(jobpostings){

            res.status(200).send(jobpostings);
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.createEvent = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.body.userid,
                },
            });
            companyid = personnel.company;
            
        } catch (error) {
            
        }
    }else{
        companyid = req.body.userid;
    }
    Event.create({
        companyid: companyid,       
        name:req.body.name,    
        desc: req.body.desc,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        multimedia: req.body.multimedia,
    }).then(() => {
        res.status(200).send("event created successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.getEvents = async (req, res) => {
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
           
        } catch (error) {
            
        }
    } else {
        companyid = req.query.userid;
    }
    Event.findAll({
        where: {
            companyid: companyid
        }
    }).then(event =>{
        if(event){
            res.status(200).send(event)
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.editSelectedEvent = (req, res) =>{
    Event.update({
        desc: req.body.desc,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        multimedia:req.body.multimedia,
    },
        {
            where: {id: req.body.id}
        }).then(() =>{
            res.status(200).send("Event Updated Successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.deleteEvent = (req, res) =>{
    Event.destroy({
        where:{
            id:req.body.id
        }
    }).then(() =>{
        res.status(200).send("Event Deleted")
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getSelectedEvent = (req, res) =>{
    Event.findByPk(req.query.id).then(event =>{
        if(event){

            res.status(200).send(event);
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.getRolegroups = async (req, res) =>{
    var companyid;
    if (req.query.user_type === '0') {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.query.userid,
                },
            });
            companyid = personnel.company;
           
        } catch (error) {
           
        }
    } else {
        companyid = req.query.userid;
    }
    Rolegroup.findAll({
        where: {
            companyid: companyid
        }
    }).then(rolegroups =>{
        res.status(200).send(rolegroups)
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getUserRoles = (req, res) =>{
    Role.findAll( {

    }).then(roles =>{
        res.status(200).send(roles)
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.createRolegroup = async (req, res) => {
    var companyid;
    if (req.body.user_type === 0) {
        try {
            const personnel = await Personnel.findOne({
                where: {
                    id: req.body.userid,
                },
            });
            companyid = personnel.company;
            
        } catch (error) {
            
        }
    } else {
        companyid = req.body.userid;
    }
    console.log(companyid)
    Rolegroup.create({
        name: req.body.name,
        companyid: companyid,
    }).then(rolegroup => {
        let counter = 0;
        for (let i = 0; i < req.body.roles.length; i++) {
            rolegroup.setRoles([req.body.roles[i].id]);
            counter++;
        }
        if (counter === req.body.roles.length) {
            res.status(200).send("Role Group Created Successfully");
        }

    }).catch(error => {
        res.status(500).send({message: error.message});
    })
}
exports.giveRolegroupToUser = (req, res) =>{
    User.findByPk(req.body.personnelid).then(user =>{
        if(user){
            user.setRolegroups([req.body.rolegroupid]).then(() =>{
                res.status(200).send("Role Group Given Successfully")
            })
        }

    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getTasksOfPersonnel = (req, res) =>{
    User.findByPk(req.query.id).then(user =>{
        if(user){
            user.getTasks().then(tasks=>{
                res.status(200).send(tasks);
            })
        }
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getUserGroupsOfPersonnel = (req, res) =>{
    User.findByPk(req.query.id).then(user =>{
        if(user){
            user.getUsergroups().then(usergroups=>{
                res.status(200).send(usergroups);
            })
        }
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.editSelectedTask = (req, res) =>{
    Task.update({
        name: req.body.name,
        deadline: req.body.deadline,
        taskdesc: req.body.taskdesc
    },
        {
            where: {id: req.body.id}
        }).then(() =>{
            res.status(200).send("Task Updated Successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.editSelectedUserGroup = (req, res) =>{
    UserGroup.update({
            name: req.body.name,
        },
        {
            where: {id: req.body.id}
        }).then(() =>{
        res.status(200).send("User Group Updated Successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getSelectedTask = (req, res) =>{
    Task.findByPk(req.query.id).then(task =>{
        if(task){

            res.status(200).send(task);
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.deleteTask = (req, res) =>{
    Task.destroy({
        where:{
            id:req.body.id
        }
    }).then(() =>{
        res.status(200).send("Task Deleted")
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getSelectedRolegroup = (req, res) =>{
    Rolegroup.findByPk(req.query.id).then(rolegroup =>{
        if(rolegroup){
            rolegroup.getRoles().then(roles=>{
                res.status(200).send({
                    rolegroup: rolegroup,
                    roles: roles
                });
            })

        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.deleteRolegroup = (req, res) =>{
    Rolegroup.destroy({
        where:{
            id:req.body.id
        }
    }).then(() =>{
        res.status(200).send("Rolegroup Deleted")
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.deleteUserGroup = (req, res) =>{
    UserGroup.destroy({
        where:{
            id:req.body.id
        }
    }).then(() =>{
        res.status(200).send("User Group Deleted")
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.editSelectedRolegroup = (req, res) =>{
    Rolegroup.update(
        { name: req.body.name },
        { where: { id: req.body.id } }
    )
        .then(() => {
            return Rolegroup.findByPk(req.body.id);
        })
        .then(rolegroup => {
            if (rolegroup) {
                let counter = 0;
                for (let i = 0; i < req.body.roles.length; i++) {
                    rolegroup.setRoles([req.body.roles[i]]);
                    counter++;
                }
                if (counter === req.body.roles.length) {
                    res.status(200).send("Role Group updated Successfully");
                }
            } else {
                res.status(404).send({ message: "Rolegroup not found" });
            }
        })

        .catch(error => {
            res.status(500).send({ message: error.message });
        });
}
exports.removeUserFromTask = (req, res) =>{
   Task.findByPk(req.body.taskid).then(task =>{
       if(task){
           task.removeUser([req.body.userid]).then(()=>{
               res.status(200).send("User Removed Successfully")
           })
       }

   }).catch(error=>{
       res.status(500).send({message: error.message});
   })
}
exports.removeUserGroupFromTask = (req, res) =>{
    Task.findByPk(req.body.taskid).then(task =>{
        if(task){
            task.removeUsergroup([req.body.usergroupid]).then(()=>{
                res.status(200).send("User Group Removed Successfully")
            })

        }

    }).catch(error=>{
        res.status(500).send({message: error.message});
    })
}
exports.removeUserFromUserGroup = (req, res) =>{
    UserGroup.findByPk(req.body.usergroupid).then(usergroup =>{
        if(usergroup){
            usergroup.removeUser([req.body.userid]).then( () =>{
                res.status(200).send("User Removed Successfully")
            }).catch(error =>{
                res.status(500).send({message: error.message})
            })
        }
    }).catch(()=>{
        res.status(404).send("Usergroup Not Found");
    })
}
exports.getUsersOfTask = (req, res) =>{
    Task.findByPk(req.query.id)
        .then(task => {
            if (task) {
                task.getUsers()
                    .then(users => {
                        if (users) {
                            const usersOfTask = [];
                            let counter = 0;

                            for (let i = 0; i < users.length; i++) {
                                Personnel.findOne({ where: { id: users[i].id } })
                                    .then(personnel => {
                                        if (personnel) {
                                            usersOfTask.push({
                                                id: personnel.id,
                                                name: personnel.name,
                                                surname: personnel.surname,
                                                phone: personnel.phone,
                                                email: users[i].email
                                            });
                                        }

                                        counter++;

                                        if (counter === users.length) {
                                            res.status(200).send(usersOfTask);
                                            console.log("asd");
                                            console.log(usersOfTask);
                                        }
                                    })
                                    .catch(error => {
                                        res.status(500).send({ message: error.message });
                                    });
                            }
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ message: error.message });
                    });
            }
            else {
                res.status(404).send({ message: 'Task not found' });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
}
exports.getUserGroupsOfTask = (req, res) =>{
    Task.findByPk(req.query.id)
        .then(task => {
            if (task) {
                task.getUsergroups()
                    .then(users => {
                        if (users) {
                            res.status(200).send(users);
                        }
                    })
                    .catch(error => {
                        res.status(500).send({ message: error.message });
                    });
            }
            else {
                res.status(404).send({ message: 'Task not found' });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
}
exports.getSelectedUserGroup = (req, res) =>{
   UserGroup.findByPk(req.query.id).then(usergroup=>{
       if(usergroup){
           usergroup.getUsers().then(users=>{
               if (users) {
                   const usersOfUserGroup = [];
                   let counter = 0;

                   for (let i = 0; i < users.length; i++) {
                       Personnel.findOne({ where: { id: users[i].id } })
                           .then(personnel => {
                               if (personnel) {
                                   usersOfUserGroup.push({
                                       id: personnel.id,
                                       name: personnel.name,
                                       surname: personnel.surname,
                                       phone: personnel.phone,
                                       email: users[i].email
                                   });
                               }

                               counter++;

                               if (counter === users.length) {
                                   res.status(200).send({
                                       usergroup: usergroup,
                                       users: usersOfUserGroup
                                   });

                               }else if(counter === 0){
                                   res.status(200).send({
                                       usergroup: usergroup,
                                   });
                               }
                           })
                           .catch(error => {
                               res.status(500).send({ message: error.message });
                           });
                   }
               }
           })
       }
   }).catch(error =>{
       res.status(500).send({message: error.message});
   })
}
exports.getSelectedCompanyJobPosting = (req, res) =>{
    JobPosting.findByPk(req.query.id).then(jobposting =>{
        if(jobposting){
            res.status(200).send(jobposting);
        } else {
            res.status(404).send("JobPosting not found");
        }
    }).catch(error=>{
        res.status(500).send({message: error.message})
    })
}

  










