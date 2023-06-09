module.exports = (sequelize, Sequelize) => {
    const personnelDetails = sequelize.define("personneldetails", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date_start: {
            type: Sequelize.DATEONLY
        },
        salary: {
            type: Sequelize.INTEGER
        },
        task:{
            type: Sequelize.STRING
        },

    });
    return personnelDetails;
};