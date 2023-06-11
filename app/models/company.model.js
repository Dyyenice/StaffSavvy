module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companies", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },

        token: {
            type: Sequelize.STRING
        },


    });

    return Company;
};