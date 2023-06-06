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
        "/api/company/PersonnelDetails",
        [authJwt.verifyToken],
        controller.editPersonnelDetails
    );
    app.post(
        "/api/company/editPersonnelDetails", controller.editPersonnelDetails);

};