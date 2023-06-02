const config = require("../config/auth.config");
const db = require("../models");
const Company = db.company;
const User = db.user;
const Personnel = db.personnel;

/*exports.pendingPersonnelRequests = (req, res) => {

    var pendingPersonnels = [];
    Company.findOne({
        where: {
            id: 1
        }
    }).then(company =>{
        Personnel.findAll({
            where: {
                company: company.id
            }
        }).then(personnel =>{
            for (let i = 0; i < personnel.length; i++) {
                User.findOne({
                    where: {
                        id: personnel[i].id
                    }
            }).then(user =>{
                pendingPersonnels.push({
                    email: user.email,
                    name: personnel[i].name,
                    surname: personnel[i].surname,
                    phone: personnel[i].phone
                })
                })
                }
            })
        })
    res.status(200).send(pendingPersonnels);
    };*/










