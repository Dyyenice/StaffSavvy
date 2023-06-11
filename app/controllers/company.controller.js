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

exports.pendingPersonnelRequests = (req, res) => {
    Company.findByPk(req.query.id)
        .then(company => {
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
                            user.getRoles().then(roles => {
                                for (let j = 0; j < roles.length; j++) {
                                   if(roles[j].name === "pending"){
                                       pendingPersonnels.push({
                                           id: user.id,
                                           email: user.email,
                                           name: personnel[i].name,
                                           surname: personnel[i].surname,
                                           phone: personnel[i].phone
                                       });
                                }

                                }

                                counter++; // Increment the counter

                                if (counter === personnel.length) {
                                    console.log(pendingPersonnels);
                                    res.status(200).send(pendingPersonnels); // Send data here
                                }
                            });
                        }
                    }).catch(error => {
                        // Handle any errors in retrieving users
                        console.error(error);
                    });
                }
            });
        }).catch(error => {
        // Handle any errors in retrieving the company
        console.error(error);
        // return res.status(500).send("Internal Server Error");
    });

};

exports.getCompanyPersonnels = (req, res) =>{
    Company.findByPk(req.query.id)
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
                            user.getRoles().then(roles => {
                                for (let j = 0; j < roles.length; j++) {
                                    if(roles[j].name !== "pending"){
                                        pendingPersonnels.push({
                                            id: user.id,
                                            email: user.email,
                                            name: personnel[i].name,
                                            surname: personnel[i].surname,
                                            phone: personnel[i].phone
                                        });
                                    }

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
            user.setRoles([1]).then(roles =>{
                console.log(roles)
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
exports.createTask = (req, res) => {
    console.log(req.body)
    Task.create({
        companyid: req.body.companyid,
        deadline: req.body.deadline,
        taskdesc: req.body.description,
    }).then(() => {
        res.status(200).send("task created successfully");
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.getTasks = (req, res) => {
    Task.findAll({
        where: {
            companyid: req.query.id
        }
    }).then(tasks =>{
        if(tasks){
            res.status(200).send(tasks)
        }
    }).catch(error =>{
        res.status(500).send({message: error.message});
    })
}
exports.createUserGroup = (req, res) => {
    console.log(req.body)
    UserGroup.create({
        name: req.body.groupname
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
exports.getRolegroups = (req, res) =>{
    Rolegroup.findAll().then(rolegroups =>{
        res.status(200).send(rolegroups)
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
exports.getUserRoles = (req, res) =>{
    Role.findAll().then(roles =>{
        res.status(200).send(roles)
    }).catch(error =>{
        res.status(500).send({message: error.message})
    })
}
  










