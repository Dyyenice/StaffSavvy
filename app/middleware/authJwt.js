const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};

pendingPersonnelsAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "pendingPersonnelsAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
companyPersonnelsAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "companyPersonnelsAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
taskAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "taskAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
JobPostingAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "companyJobPostingsAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
EventAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "EventAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
userGroupAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "userGroupAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
roleGroupAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "roleGroupAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};
accessRequestAccess = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRolegroups()
                .then(rolegroup => {
                    rolegroup[0].getRoles()
                        .then(roles => {
                            console.log(roles);
                            let hasAccess = false;
                            for (let i = 0; i < roles.length; i++) {
                                if (roles[i].name === "accessRequestAdmin" || roles[i].name === "admin") {
                                    hasAccess = true;
                                    break;
                                }
                            }
                            if (hasAccess) {
                                next();
                            } else {
                                res.status(403).send({
                                    message: "Page Access is Denied!"
                                });
                            }
                        })
                        .catch(() => {

                            res.status(500).send({
                                message: "An error has occured during retrieving roles"
                            });
                        });
                })
                .catch(() => {

                    res.status(500).send({
                        message: "An error has occured during retrieving rolegroups"
                    });
                });
        })
        .catch(() => {

            res.status(500).send({
                message: "An error has occured during retrieving the user"
            });
        });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    pendingPersonnelsAccess: pendingPersonnelsAccess,
    taskAccess: taskAccess,
    roleGroupAccess: roleGroupAccess,
    userGroupAccess:userGroupAccess,
    companyPersonnelsAccess: companyPersonnelsAccess,
    JobPostingAccess: JobPostingAccess,
    EventAccess: EventAccess,
    AccessRequestAccess: accessRequestAccess,

};
module.exports = authJwt;