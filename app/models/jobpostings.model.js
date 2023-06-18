module.exports = (sequelize, Sequelize) => {
    const JobPosting = sequelize.define("jobposting", {

        
        jobtitle: {
            type: Sequelize.STRING
        },
        companyid: {
            type: Sequelize.INTEGER
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