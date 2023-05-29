const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
<<<<<<< HEAD

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
=======
const Personnel = db.personnel;
const Company = db.company;

checkDuplicateEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            email: req.body.email
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
<<<<<<< HEAD
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
=======
                message: "Failed! Email is already in use!"
            });

        }


    });
    next();
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

<<<<<<< HEAD
const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
=======


const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted,

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
};

module.exports = verifySignUp;