module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {

        companyid: {
            type: Sequelize.INTEGER
        },
        deadline: {
            type: Sequelize.DATEONLY
        },
        taskdesc:{
            type: Sequelize.STRING
        },
    });
    return Task;
};