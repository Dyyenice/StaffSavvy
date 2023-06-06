module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        deadline: {
            type: Sequelize.DATEONLY
        },
        companyid: {
            type: Sequelize.INTEGER
        },
        taskdesc:{
            type: Sequelize.STRING
        },
    });
    return Task;
};