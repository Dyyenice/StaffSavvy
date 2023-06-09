import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/company/';

class CompanyService {

    getPendingPersonnels(user){
        return axios.get(API_URL + 'pendingPersonnels',{
            headers: authHeader(),
            params: {
                id: user.id
            }
             })

    }
    getCompanyPersonnels(user){
        return axios.get(API_URL + 'getCompanyPersonnels',{
            headers: authHeader(),
            params: {
                id: user.id
            }
        })

    }

    getSelectedPersonnel(user){
        return axios.get(API_URL + 'getSelectedPersonnelCompanyInfo',{
            headers: authHeader(),
            params: {
                id: user.id
            }
        })

    }
    confirmPending(personnel){
            console.log(personnel);
        return axios.post(API_URL + 'confirmPending',{
            id: personnel.id
        });
    }

    
    editSelectedPersonnel(personnel) {
        return axios.post(API_URL + 'editselectedPersonnelCompanyInfo' ,{
            id: personnel.id,
            salary: personnel.salary
        });
    }
}

export default new CompanyService();