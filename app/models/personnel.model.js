module.exports = (sequelize, Sequelize) => {
    const Personnel = sequelize.define("personnels", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.INTEGER
        },

    });

    return Personnel;
};