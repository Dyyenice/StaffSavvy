module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companies", {
        name: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

    });

    return Company;
};