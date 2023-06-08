const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Personnel = db.personnel;
const Company = db.company;

checkDuplicateEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });

        }
if(req.user_type === 0){
    Personnel.findOne({
        where: {
            identification: req.body.identification
        }
    }).then(personnel => {
        if (personnel) {
            res.status(400).send({
                message: "Failed! Identification is already in use!"
            });

        }
    });
}

    });
    next();
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



const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted,

};

module.exports = verifySignUp;