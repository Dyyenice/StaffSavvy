const { authJwt } = require("../middleware");
const controller = require("../controllers/company.controller");
const {pendingPersonnelRequests} = require("../controllers/company.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/company/pendingPersonnels",
        [authJwt.verifyToken, authJwt.pendingPersonnelsAccess],
        controller.pendingPersonnelRequests
    );
    app.post(
        "/api/company/confirmPending",[authJwt.verifyToken, authJwt.pendingPersonnelsAccess], controller.confirmPending);



    app.get(
        "/api/company/getCompanyPersonnels",
        [authJwt.verifyToken, authJwt.companyPersonnelsAccess],
        controller.getCompanyPersonnels
    );

    app.get(
        "/api/company/getSelectedPersonnelCompanyInfo",
        [authJwt.verifyToken],
        controller.selectedPersonnelCompanyInfo
    );
    app.post(
        "/api/company/editselectedPersonnelCompanyInfo",
        controller.editselectedPersonnelCompanyInfo
    );
    app.post("/api/company/createTask",[authJwt.verifyToken, authJwt.taskAccess], controller.createTask)
    app.get(
        "/api/company/getTasks", [authJwt.verifyToken, authJwt.taskAccess], controller.getTasks
    );
    app.post("/api/company/createUserGroup",[authJwt.verifyToken, authJwt.userGroupAccess] , controller.createUserGroup)
    app.post("/api/company/createRoleGroup",[authJwt.verifyToken, authJwt.roleGroupAccess] , controller.createRolegroup)
    app.post("/api/company/giveTaskToUser",[authJwt.verifyToken, authJwt.taskAccess], controller.giveTaskToUser)
    app.post("/api/company/giveRolegroupToUser",[authJwt.verifyToken, authJwt.roleGroupAccess], controller.giveRolegroupToUser)
    app.get("/api/company/getRolegroups", [authJwt.verifyToken, authJwt.roleGroupAccess], controller.getRolegroups)
    app.get("/api/company/getRoles", [authJwt.verifyToken, authJwt.userGroupAccess], controller.getUserRoles)
};