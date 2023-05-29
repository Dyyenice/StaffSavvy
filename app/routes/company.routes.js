const { verifySignUp } = require("../middleware");
const controller = require("../controllers/company.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signupcompany",
        [
            verifySignUp.checkDuplicateCompany,

        ],
        controller.signup
    );

    app.post("/api/auth/signincompany", controller.signin);
};