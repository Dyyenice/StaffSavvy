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
    app.post("/api/company/editSelectedTask",[authJwt.verifyToken, authJwt.taskAccess], controller.editSelectedTask)
    app.post("/api/company/editSelectedUserGroup",[authJwt.verifyToken, authJwt.userGroupAccess], controller.editSelectedUserGroup)
    app.get("/api/company/getSelectedTask", [authJwt.verifyToken, authJwt.taskAccess], controller.getSelectedTask)
    app.post("/api/company/giveTaskToUserGroup",[authJwt.verifyToken, authJwt.taskAccess], controller.giveTaskToUsergroup)
    app.post("/api/company/giveRolegroupToUser",[authJwt.verifyToken, authJwt.roleGroupAccess], controller.giveRolegroupToUser)
    app.get("/api/company/getRolegroups", [authJwt.verifyToken, authJwt.roleGroupAccess], controller.getRolegroups)
    app.get("/api/company/getRoles", [authJwt.verifyToken, authJwt.userGroupAccess], controller.getUserRoles)
    app.get("/api/company/getSelectedRolegroup", [authJwt.verifyToken], controller.getSelectedRolegroup)
    app.get("/api/company/getTasksOfPersonnel", [authJwt.verifyToken], controller.getTasksOfPersonnel)
    app.get("/api/company/getUserGroupsOfPersonnel", [authJwt.verifyToken], controller.getUserGroupsOfPersonnel)
    app.get("/api/company/getUserGroups", [authJwt.verifyToken,authJwt.userGroupAccess], controller.getUsergroups)
    app.get("/api/company/getUsersOfTask", [authJwt.verifyToken,authJwt.taskAccess], controller.getUsersOfTask)
    app.get("/api/company/getUserGroupsOfTask", [authJwt.verifyToken,authJwt.taskAccess], controller.getUserGroupsOfTask)
    app.delete("/api/company/deleteTask", [authJwt.verifyToken,authJwt.taskAccess], controller.deleteTask)
    app.delete("/api/company/deleteRolegroup", [authJwt.verifyToken,authJwt.roleGroupAccess], controller.deleteRolegroup)
    app.delete("/api/company/deleteUserGroup", [authJwt.verifyToken,authJwt.userGroupAccess], controller.deleteUserGroup)
    app.post("/api/company/editSelectedRolegroup",[authJwt.verifyToken, authJwt.roleGroupAccess], controller.editSelectedRolegroup)
    app.post("/api/company/removeUserFromTask",[authJwt.verifyToken, authJwt.taskAccess], controller.removeUserFromTask)
    app.post("/api/company/removeUserGroupFromTask",[authJwt.verifyToken, authJwt.taskAccess], controller.removeUserGroupFromTask)
    app.post("/api/company/removeUserFromUserGroup",[authJwt.verifyToken, authJwt.userGroupAccess], controller.removeUserFromUserGroup)
    app.get("/api/company/getSelectedUserGroup", [authJwt.verifyToken,authJwt.userGroupAccess], controller.getSelectedUserGroup)
    app.get( "/api/company/getCompanyJobPostings",[authJwt.verifyToken, authJwt.JobPostingAccess],controller.getJobPostings)
    app.post("/api/company/createJobPostings",[authJwt.verifyToken, authJwt.JobPostingAccess], controller.createJobPostings)
    app.delete("/api/company/deleteJobPosting", [authJwt.verifyToken,authJwt.JobPostingAccess], controller.deleteJobPosting)
    app.post("/api/company/editSelectedCompanyJobPosting",[authJwt.verifyToken, authJwt.JobPostingAccess], controller.editSelectedCompanyJobPosting)
    app.get( "/api/company/getEvents",[authJwt.verifyToken, authJwt.EventAccess],controller.getEvents)
    app.post("/api/company/createEvent",[authJwt.verifyToken, authJwt.EventAccess], controller.createEvent)
    app.delete("/api/company/deleteEvent", [authJwt.verifyToken,authJwt.EventAccess], controller.deleteEvent)
    app.post("/api/company/editSelectedEvent",[authJwt.verifyToken, authJwt.EventAccess], controller.editSelectedEvent)
    app.get("/api/company/getSelectedJobPosting", [authJwt.verifyToken, authJwt.JobPostingAccess], controller.getSelectedJobPosting)
    app.get("/api/company/getSelectedEvent", [authJwt.verifyToken, authJwt.EventAccess], controller.getSelectedEvent)
    app.get("/api/company/getSelectedCompanyJobPosting", [authJwt.verifyToken, authJwt.JobPostingAccess], controller.getSelectedCompanyJobPosting)


};