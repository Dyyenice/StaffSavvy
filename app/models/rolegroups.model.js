module.exports = (sequelize, Sequelize) => {
    const Rolegroups = sequelize.define("rolegroups", {
        companyid: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
    });

    return Rolegroups;
};