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
        allowance: {
            type:Sequelize.INTEGER
        }


    });
    return personnelDetails;
};