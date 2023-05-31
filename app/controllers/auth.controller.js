const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Company = db.company
const Personnel = db.personnel
const Role = db.role;
var token;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    console.log("you reached here!")
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
                company: 1,
            })
        } else {
            Company.create({
                id: user.id,
                name: req.body.name,
            })
        }
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({message: "User was registered successfully!"});
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({message: "User was registered successfully!"});
            })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });

        }

    });
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
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                if(user.user_type === 0){
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
};

/*exports.editProfile = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
                if(user.user_type === 0){
                    Personnel.update({
                        name: req.body.name,
                        surname: req.body.surname,
                        phone: req.body.phone
                    },
                        { where: {id: user.id } }).then(personnel =>{
                        res.status(200).send({

                            name: personnel.name,
                            surname: personnel.surname,
                            phone: personnel.phone,

                        });
                    })
}

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};*/
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
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
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
