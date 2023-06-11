const config = require("../config/auth.config");
const db = require("../models");
const {where} = require("sequelize");
const e = require("express");
const Company = db.company;
const User = db.user;
const Personnel = db.personnel;
const PersonnelCompanyInfo = db.personneldetails
const Task = db.task
const UserGroup = db.usergroups;
const Rolegroup = db.rolegroups;
const Role = db.role;
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
    PersonnelCompanyInfo.findByPk(req.query.id).then(personnel => {
       if(personnel){
           res.status(200).send({
               date_start: personnel.date_start,
               salary: personnel.salary,
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

           },
               {where: {id: req.body.id}}

           ).then(() =>{
               if(req.body.taskid){
                   User.findByPk(personnel.id).then(user =>{
                       if(user){
                           user.setRolegroups([req.body.rolegroupid]).then(() =>{
                               res.status(200).send("updated successfully")

                           })
                       }

                   })

               }

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
    if (req.body.user_type === '0') {
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
    if (req.body.user_type === '0') {
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
            user.setTasks([req.body.taskid]).then(() =>{
                res.status(200).send("Task Given Successfully")
            })
        }

    }).catch(error =>{
        res.status(500).send({message: error.message})
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
            // Call a function or continue the logic here that depends on companyid
        } catch (error) {
            // Handle any errors that occurred during the query
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
    if (req.body.user_type === '0') {
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
  










