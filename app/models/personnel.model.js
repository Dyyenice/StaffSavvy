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
        date_of_birth: {
            type: Sequelize.DATEONLY
        },
        identification: {
            type: Sequelize.BIGINT
        },
        company: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },

    });

    return Personnel;
};