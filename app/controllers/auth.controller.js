const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
<<<<<<< HEAD
=======
const Company = db.company
const Personnel = db.personnel
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
<<<<<<< HEAD
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
=======
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
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
<<<<<<< HEAD
            username: req.body.username
=======
            email: req.body.email
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
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

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
<<<<<<< HEAD
                    username: user.username,
=======
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};