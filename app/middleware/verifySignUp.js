const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Personnel = db.personnel;
const Company = db.company;

checkDuplicateEmail = async (req, res, next) => {
    // Username
    try {
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.status(403).send({
                message: "Failed! Email is already in use!"
            });
        }

        if (req.user_type === 0) {
            const existingPersonnel = await Personnel.findOne({
                where: {
                    identification: req.body.identification
                }
            });

            if (existingPersonnel) {
                return res.status(400).send({
                    message: "Failed! Identification is already in use!"
                });
            }
        }

        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
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