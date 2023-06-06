import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/company/';

class CompanyService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader()});
    }
    getPendingPersonnels(user){
        return axios.get(API_URL + 'pendingPersonnels',{
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
    getPersonnelDetails(personneldetails) {
        return axios.get(API_URL + 'personnelDetails', {
          headers: authHeader(),
          params: {
            id: personneldetails.id
          }
        });
      }
    
    editPersonnelDetails(personneldetails) {
        return axios.put(API_URL + 'personnelDetails/' + personneldetails.id, personneldetails);
    }
}

export default new CompanyService();