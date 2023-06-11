const { authJwt } = require("../middleware");
const controller = require("../controllers/company.controller");

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
        [authJwt.verifyToken],
        controller.pendingPersonnelRequests
    );
    app.post(
        "/api/company/confirmPending", controller.confirmPending);



    app.get(
        "/api/company/getCompanyPersonnels",
        [authJwt.verifyToken, authJwt.isAdmin],
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
    app.post("/api/company/createTask", controller.createTask)
    app.get(
        "/api/company/getTasks", [authJwt.verifyToken], controller.getTasks
    );
    app.post("/api/company/createUserGroup" , controller.createUserGroup)

    app.post("/api/company/giveTaskToUser", controller.giveTaskToUser)
    app.get("/api/company/getRolegroups", [authJwt.verifyToken], controller.getRolegroups)
    app.get("/api/company/getRoles", [authJwt.verifyToken], controller.getUserRoles)
};