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

    
    editSelectedPersonnel(personnel, selectedRolegroup) {
        return axios.post(API_URL + 'editselectedPersonnelCompanyInfo' ,{
            id: personnel.id,
            salary: personnel.salary,
            Rolegroupid: selectedRolegroup.id,
        });
    }

    createTask(task){

        return axios.post(API_URL + 'createTask' , {
                description: task.desc,
                deadline: task.deadline,
                companyid: task.companyid,

        });
    }

    giveTaskToUser(task, personnel){
        return axios.post(API_URL + 'giveTaskToUser' , {
            taskid: task.id,
            personnelid: personnel.id,

        });
    }
    createUserGroup(name, selectedPersonnels){

        return axios.post(API_URL + 'createUserGroup' , {
            groupname: name,
           selectedPersonnels: selectedPersonnels,

        });
    }

    getTasks(company){

        return axios.get(API_URL + 'getTasks' , {
            headers: authHeader(),
            params: {
                id: company.id
            }

        });
    }
    getRoles(){

        return axios.get(API_URL + 'getRoles' , {
            headers: authHeader(),


        });
    }
    getRolegroups(){

        return axios.get(API_URL + 'getRolegroups' , {
            headers: authHeader(),
        });
    }
}

export default new CompanyService();