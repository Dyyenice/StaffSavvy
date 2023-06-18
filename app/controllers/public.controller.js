
const db = require("../models");
const JobPostings = db.jobpostings
const Company = db.company
const User = db.user
exports.getJobPostings =(req,res) =>{
    JobPostings.findAll().then(jobpostings => {
        const jobPostingsResult = [];
        const companyPromises = [];

        for (let i = 0; i < jobpostings.length; i++) {
            const companyPromise = Company.findByPk(jobpostings[i].companyid).then(company => {
                if (company) {
                    return User.findByPk(company.id).then(user => {
                        if (user) {
                            jobPostingsResult.push({
                                jobposting: jobpostings[i],
                                companyname: company.name,
                                email: user.email
                            });
                        }
                    });
                }
            });
            companyPromises.push(companyPromise);
        }

        Promise.all(companyPromises).then(() => {
            res.status(200).send(jobPostingsResult);
            console.log("lllll");
        }).catch(error => {
            res.status(500).send({
                message: error.message
            });
        });
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
}