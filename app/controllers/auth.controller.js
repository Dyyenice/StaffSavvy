const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Company = db.company
const Personnel = db.personnel
const PersonnelCompanyInfo = db.personneldetails
const Role = db.role;
var token;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {DATEONLY} = require("sequelize");



function generate_token(length){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
exports.getToken = () =>{
    return token;
}
exports.signup = (req, res) => {
    User.create({
        email: req.body.email,
        user_type: req.body.user_type,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.user_type === 0) {
            Personnel.create({
                id: user.id,
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                date_of_birth:  req.body.date_of_birth,
                identification: req.body.identification,
                status: 0
            });
            PersonnelCompanyInfo.create({
                id: user.id,
                date_start: new DATEONLY()
            });

            user.setRolegroups([2]).then(() =>{
                res.send({message: "User was registered successfully!"});
            })
        } else {
            Company.create({
                id: user.id,
                name: req.body.name,
                token: generate_token(16)
            })
            user.setRolegroups([3]).then(() =>{
                res.send({message: "User was registered successfully!"});
            })
        }


    });
};
exports.signupToCompany = (req, res) => {
    console.log(req.body)
    Company.findOne({
        where: {
            token: req.body.token
        }
    }).then(company =>{
        if(company){
            Personnel.update({
                company: company.id,
                status: 1
            }, {
                where: {
                    id: req.body.id
                }
            }).then(()=>{
                res.status(200).send("Signup To Company Successfull. Please login again to access the user panel.");
            })
                .catch(error =>{
                    res.status(500).send({message: error.message})
                })
        }else{
            res.status(404).send("Token is incorrect")
        }
    }).catch(() =>{
        res.status(404).send("Token is incorrect")
    })
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRolegroups().then(rolegroup => {
                if(rolegroup){
                    console.log(rolegroup)
                    rolegroup[0].getRoles().then(roles =>{
                        for (let i = 0; i < roles.length; i++) {
                            authorities.push(roles[i].name);
                        }
                    });
                }
                if(user.user_type === 0){
                    Personnel.findOne({
                        where: {
                            id : user.id,
                        }
                    }).then(personnel =>{
                        PersonnelCompanyInfo.findOne({
                            where: {
                                id : personnel.id,
                            }
                        }).then(personnelcompanyinfo =>{
                            Company.findOne({
                                where: {
                                    id: personnel.company
                                }
                            }).then(company =>{
                                if(company){
                                    res.status(200).send({
                                        id: user.id,
                                        email: user.email,
                                        name: personnel.name,
                                        surname: personnel.surname,
                                        phone: personnel.phone,
                                        company: company.name,
                                        date_of_birth: personnel.date_of_birth,
                                        identification: personnel.identification,
                                        user_type: user.user_type,
                                        salary: personnelcompanyinfo.salary,
                                        allowance: personnelcompanyinfo.allowance,
                                        roles: authorities,
                                        accessToken: token
                                    });
                                }
                                else{
                                    res.status(200).send({
                                        id: user.id,
                                        email: user.email,
                                        name: personnel.name,
                                        surname: personnel.surname,
                                        phone: personnel.phone,
                                        company: null,
                                        salary: personnelcompanyinfo.salary,
                                        allowance: personnelcompanyinfo.allowance,
                                        date_of_birth: personnel.date_of_birth,
                                        identification: personnel.identification,
                                        user_type: user.user_type,
                                        roles: authorities,
                                        accessToken: token
                                    });
                                }

                            })

                        })
                    })

                }else{
                    Company.findOne({
                        where: {
                            id: user.id
                        }
                    }).then(company =>{
                        res.status(200).send({
                            id: user.id,
                            email: user.email,
                            name: company.name,
                            token: company.token,
                            user_type: user.user_type,
                            accessToken: token
                        });
                    })
                }


            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.editProfile = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var authorities = [];
            user.getRolegroups.then(rolegroup => {
                rolegroup[0].getRoles().then(roles=>{
                    for (let i = 0; i < roles.length; i++) {
                        authorities.push(roles[i].name);
                    }
                });
                if(user.user_type === 0){
                    Personnel.update({
                            name: req.body.name,
                            surname: req.body.surname,
                            phone: req.body.phone
                        },
                        { where: {id: user.id } });
                    Personnel.findOne({
                        where: {
                            id : user.id,
                        }
                    }).then(personnel =>{
                        res.status(200).send({
                            id: user.id,
                            email: user.email,
                            name: personnel.name,
                            surname: personnel.surname,
                            phone: personnel.phone,
                            company: personnel.company,
                            date_of_birth: personnel.date_of_birth,
                            identification: personnel.identification,
                            roles: authorities,
                            accessToken: token
                        });
                    })

                }

            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
exports.changePassword = (req, res) => {
   User.update({
       password: bcrypt.hashSync(req.body.password, 8)
   }, {where: {email: req.body.email}}).then(()=>{
       res.status(200).send("Your password is changed")
   }).catch(error =>{
       res.status(500).send({message: error.message});
   })
}
