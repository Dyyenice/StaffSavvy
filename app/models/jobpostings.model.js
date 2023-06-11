module.exports = (sequelize, Sequelize) => {
    const JobPosting = sequelize.define("jobposting", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        jobtitle: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        requirements: {
            type: Sequelize.STRING
        },
        benefits: {
            type: Sequelize.STRING
        },

    });

    return JobPosting;
};