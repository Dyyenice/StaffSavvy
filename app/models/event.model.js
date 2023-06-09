module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        companyid: {
            type: Sequelize.INTEGER
        },
        desc: {
            type: Sequelize.STRING
        },
        date_start: {
            type: Sequelize.DATEONLY
        },
        date_end: {
            type: Sequelize.DATEONLY
        },
        multimedia:{
            type: Sequelize.BLOB
        },
        
    });
    return Event;
};