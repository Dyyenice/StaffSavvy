const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.rolegroups = require("./rolegroups.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.personnel = require("./personnel.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.permissions = require("./permissions.model.js")(sequelize, Sequelize);
db.personneldetails = require("./personneldetails.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.usergroups = require("./usergroups.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.jobpostings = require("./jobpostings.model.js")(sequelize,Sequelize);
db.event = require("./event.model.js")(sequelize,Sequelize);



db.rolegroups.belongsToMany(db.user, {
    through: "user_rolegroups",
    foreignKey: "rolegroupsId",
    otherKey: "userId"
});
db.user.belongsToMany(db.rolegroups, {
    through: "user_rolegroups",
    foreignKey: "userId",
    otherKey: "rolegroupsId"
});


db.role.belongsToMany(db.rolegroups, {
    through: "rolegroups_roles",
    foreignKey: "roleId",
    otherKey: "rolegroupsId"
});
db.rolegroups.belongsToMany(db.role, {
    through: "rolegroups_roles",
    foreignKey: "rolegroupsId",
    otherKey: "roleId"
});
db.task.belongsToMany(db.user, {
    through: "user_task",
    foreignKey: "taskId",
    otherKey: "userId"
});
db.user.belongsToMany(db.task, {
    through: "user_task",
    foreignKey: "userId",
    otherKey: "taskId"
});
db.usergroups.belongsToMany(db.user, {
    through: "user_usergroups",
    foreignKey: "usergroupID",
    otherKey: "userId"
});
db.user.belongsToMany(db.usergroups, {
    through: "user_usergroups",
    foreignKey: "userId",
    otherKey: "usergroupID"
});
db.task.belongsToMany(db.usergroups, {
    through: "usergroup_tasks",
    foreignKey: "taskId",
    otherKey: "usergroupId"
});
db.usergroups.belongsToMany(db.task, {
    through: "usergroup_tasks",
    foreignKey: "usergroupId",
    otherKey: "taskId"
});



db.ROLES = ["user", "admin", "moderator","pending"];

module.exports = db;