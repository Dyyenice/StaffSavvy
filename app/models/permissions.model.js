module.exports = (sequelize, Sequelize) => {
    const Permissions = sequelize.define("permissions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date_start: {
            type: Sequelize.DATEONLY
        },
        date_end: {
            type: Sequelize.DATEONLY
        },
    });

    return Permissions;
};