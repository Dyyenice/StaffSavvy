module.exports = (sequelize, Sequelize) => {
    const Usergroups = sequelize.define("usergroups", {

        name: {
            type: Sequelize.STRING
        },


    });

    return Usergroups;
};