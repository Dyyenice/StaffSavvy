module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {

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
            type: Sequelize.BLOB('long')
        },
        
    });
    return Event;
};