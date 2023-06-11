module.exports = (sequelize, Sequelize) => {
    const Usergroups = sequelize.define("usergroups", {
        companyid: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },


    });

    return Usergroups;
};