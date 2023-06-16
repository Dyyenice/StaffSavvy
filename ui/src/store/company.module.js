import CompanyService from '../services/company.service';

export const company = {
    namespaced: true,
   
    actions: {
        confirmPending(personnel) {
            return CompanyService.confirmPending(personnel).then(
                personnel => {
                    return Promise.resolve(personnel);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        editPersonnelDetails(personnel) {
            return CompanyService.editPersonnelDetails(personnel).then(
              updatedPersonnel => {
                return Promise.resolve(updatedPersonnel);
              },
              error => {
                return Promise.reject(error);
              }
            );
          },
          editJobPostings(jobposting) {
            return CompanyService.editJobPostings(jobposting).then(
              updatedJobPosting => {
                return Promise.resolve(updatedJobPosting);
              },
              error => {
                return Promise.reject(error);
              }
            );
          }


    },

};