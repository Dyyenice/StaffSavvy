import CompanyService from '../services/company.service';

export const company = {
    namespaced: true,
    actions: {
        confirmPending(user) {
            return CompanyService.confirmPending(user).then(
                user => {
                    return Promise.resolve(user);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }


    },

};