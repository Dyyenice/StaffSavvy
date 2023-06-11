import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/company/';

class CompanyService {

    getPendingPersonnels(user){
        return axios.get(API_URL + 'pendingPersonnels',{
            headers: authHeader(),
            params: {
                userid: user.id,
                user_type: user.user_type
            }
             })

    }
    getCompanyPersonnels(currentuser){
        return axios.get(API_URL + 'getCompanyPersonnels',{
            headers: authHeader(),
            params: {
                userid: currentuser.id,
                user_type: currentuser.user_type
            }
        })

    }

    getSelectedPersonnel(currentuser){
        return axios.get(API_URL + 'getSelectedPersonnelCompanyInfo',{
            headers: authHeader(),
            params: {
                userid: currentuser.id,
                user_type: currentuser.user_type
            }
        })

    }
    confirmPending(personnel){
            console.log(personnel);
        return axios.post(API_URL + 'confirmPending',{
            id: personnel.id
        },{
            headers: authHeader(),
        });
    }

    
    editSelectedPersonnel(personnel, selectedRolegroup) {
        return axios.post(API_URL + 'editselectedPersonnelCompanyInfo' ,{
            id: personnel.id,
            Rolegroupid: selectedRolegroup.id,
        },{
            headers: authHeader(),
        }
        );
    }

    createTask(task, currentuser){

        return axios.post(API_URL + 'createTask' , {
                description: task.desc,
                deadline: task.deadline,
            userid: currentuser.id,
            user_type: currentuser.user_type

        },{
            headers: authHeader(),
        });
    }

    giveTaskToUser(task, personnel){
        return axios.post(API_URL + 'giveTaskToUser' , {
            taskid: task.id,
            personnelid: personnel.id,

        },{
            headers: authHeader(),
        });
    }
    createUserGroup(name, selectedPersonnels, currentuser){

        return axios.post(API_URL + 'createUserGroup' , {
            groupname: name,
           selectedPersonnels: selectedPersonnels,
            userid: currentuser.id,
            user_type: currentuser.user_type
        },{
            headers: authHeader(),
        });
    }

    getTasks(currentuser){

        return axios.get(API_URL + 'getTasks' , {
            headers: authHeader(),
            params: {
                userid: currentuser.id,
                user_type: currentuser.user_type
            }

        });
    }
    getRoles(){

        return axios.get(API_URL + 'getRoles' , {
            headers: authHeader(),


        });
    }
    getRolegroups(currentuser){

        return axios.get(API_URL + 'getRolegroups' , {
            headers: authHeader(),
            params:{
                userid: currentuser.id,
                user_type: currentuser.user_type
            }
        });
    }

    createRolegroup(name,roles, currentuser){
        return axios.post(API_URL + 'createRoleGroup', {
            name:name.rolegroupname,
            roles:roles,
            userid: currentuser.id,
            user_type: currentuser.user_type
        },{
            headers: authHeader(),
        })
    }

    giveRolegroupToUser(rolegroup, personnel){
        return axios.post(API_URL + 'giveRolegroupToUser' , {
            rolegroupid: rolegroup.id,
            personnelid: personnel.id,

        },{
            headers: authHeader(),
        });
    }
}

export default new CompanyService();