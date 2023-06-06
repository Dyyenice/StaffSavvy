module.exports = (sequelize, Sequelize) => {
    const personneldetails = sequelize.define("personneldetails", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date_start: {
            type: Sequelize.DATEONLY
        },
        usergroupid: {
            type: Sequelize.INTEGER
        },
        salary: {
            type: Sequelize.INTEGER
        },
        task:{
            type: Sequelize.STRING
        },
        
    });
    return personneldetails;
};