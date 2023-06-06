module.exports = (sequelize, Sequelize) => {
    const Usergroups = sequelize.define("usergroups", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        personnel: {
            type: Sequelize.INTEGER
        },
        task: {
            type: Sequelize.INTEGER
        },

    });

    return Usergroups;
};