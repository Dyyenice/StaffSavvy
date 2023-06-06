const config = require("../config/auth.config");
const db = require("../models");
const Company = db.company;
const User = db.user;
const Personnel = db.personnel;
const PersonnelDetails = db.personneldetails;

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
                res.status(200).send("user confirmed");
            })
        }
    });
};
exports.editPersonnelDetails = (req, res) => {
    PersonnelDetails.findByPk(req.query.id)
      .then(personnelDetails => {
        if (!personnelDetails) {
          return res.status(404).send("Personnel information not found");
        }
  
        personnelDetails.update({
          date_start: req.body.date_start,
          usergroupid: req.body.usergroupid,
          salary: req.body.salary,
          task: req.body.task
        })
          .then(updatedPersonnelDetails => {
            res.status(200).json(updatedPersonnelDetails);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  };
  










