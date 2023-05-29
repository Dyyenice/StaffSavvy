const db = require("../models");
const config = require("../config/auth.config");
const Company = db.company;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    Company.create({
        name: req.body.name,
        username: req.body.surname,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    Company.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(company => {
            if (!company) {
                return res.status(404).send({ message: "Company Not found." });
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


        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};