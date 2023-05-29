const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
<<<<<<< HEAD
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
=======
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],

        controller.signup

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    );

    app.post("/api/auth/signin", controller.signin);
};