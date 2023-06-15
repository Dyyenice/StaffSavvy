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
        name:{
            type: Sequelize.STRING
        },
        status:{
            type:Sequelize.INTEGER
        }
    });
    return Task;
};