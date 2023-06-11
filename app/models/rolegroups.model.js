module.exports = (sequelize, Sequelize) => {
    const Rolegroups = sequelize.define("rolegroups", {

        name: {
            type: Sequelize.STRING
        },
    });

    return Rolegroups;
};