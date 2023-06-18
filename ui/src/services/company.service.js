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
    getCompanyPersonnels(user){
        return axios.get(API_URL + 'getCompanyPersonnels',{
            headers: authHeader(),
            params: {
                userid: user.id,
                user_type: user.user_type
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

    
    editSelectedPersonnel(personnel) {
        return axios.post(API_URL + 'editselectedPersonnelCompanyInfo' ,{
            id: personnel.id,
            salary: personnel.salary,
            allowance: personnel.allowance
        },{
            headers: authHeader(),
        }
        );
    }

    createTask(task, currentuser){

        return axios.post(API_URL + 'createTask' , {
                name: task.name,
                description: task.desc,
                deadline: task.deadline,
            userid: currentuser.id,
            user_type: currentuser.user_type

        },{
            headers: authHeader(),
        });
    }
    createJobPostings(jobposting, currentuser){

        return axios.post(API_URL + 'createJobPostings' , {
                jobtitle: jobposting.jobtitle,
                company:jobposting.company,
                location:jobposting.location,
                description: jobposting.description,
                requirements: jobposting.requirements,
                benefits:jobposting.benefits,
            userid: currentuser.id,
            user_type: currentuser.user_type

        },{
            headers: authHeader(),
        });
    }
    createEvent(event, currentuser){

        return axios.post(API_URL + 'createEvent' , {
            companyid: event.companyid,       
            name:event.name,    
            desc: event.desc,
            date_start: event.date_start,
            date_end: event.date_end,
            multimedia: event.multimedia,
            userid: currentuser.id,
            user_type: currentuser.user_type

        },{
            headers: authHeader(),
        });
    }
    getEvents(currentuser){

        return axios.get(API_URL + 'getEvents' , {
            headers: authHeader(),
            params: {
                userid: currentuser.id,
                user_type: currentuser.user_type
            }

        });
    }
    editSelectedEvent(id, event){
        return axios.post(API_URL + 'editSelectedEvent', {
            id:id.id,
            desc: event.desc,
            date_start: event.date_start,
            date_end: event.date_end,
            multimedia: event.multimedia,
        },{
            headers: authHeader(),
        });
    }
    deleteEvent(event){
        return axios.delete(API_URL + 'deleteEvent' , {
            headers: authHeader(),
            data:{
                id: event.id,
            }
        });
    }
    giveTaskToUser(task, personnel){
        return axios.post(API_URL + 'giveTaskToUser' , {
            taskid: task,
            personnelid: personnel,

        },{
            headers: authHeader(),
        });
    }
    giveTaskToUsergroup(task, usergroup){
        return axios.post(API_URL + 'giveTaskToUserGroup' , {
            taskid: task,
            usergroupid: usergroup,

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

    getSelectedCompanyJobPosting(jobposting){

        return axios.get(API_URL + 'getSelectedCompanyJobPosting' , {
            headers: authHeader(),
            params: {
               id: jobposting.id
            }

        });
    }
    getCompanyJobPostings(currentuser){

        return axios.get(API_URL + 'getCompanyJobPostings' , {
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
    getUsergroups(currentuser){

        return axios.get(API_URL + 'getUsergroups' , {
            headers: authHeader(),
            params:{
                userid: currentuser.id,
                user_type: currentuser.user_type
            }
        });
    }
    deletePersonnel(personnel){
        return axios.delete(API_URL + 'deletePersonnel' , {
            headers: authHeader(),
            data:{
                id: personnel.id,
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
            rolegroupid: rolegroup,
            personnelid: personnel,

        },{
            headers: authHeader(),
        });
    }
    getTasksOfPersonnel(user){
        return axios.get(API_URL + 'getTasksOfPersonnel' , {
            headers: authHeader(),
            params:{
                id: user.id,
            }
        });
    }
    getUserGroupsOfPersonnel(user){
        return axios.get(API_URL + 'getUserGroupsOfPersonnel' , {
            headers: authHeader(),
            params:{
                id: user.id,
            }
        });
    }
    editSelectedTask(id, task){
        return axios.post(API_URL + 'editSelectedTask', {
            id:id.id,
            name:task.name,
            deadline: task.deadline,
            taskdesc: task.desc,
        },{
            headers: authHeader(),
        });
    }
    editSelectedCompanyJobPosting(id, jobposting){
        return axios.post(API_URL + 'editSelectedCompanyJobPosting', {
            id:id.id,
            jobtitle: jobposting.jobtitle,
            description: jobposting.description,
            requirements: jobposting.requirements,
            benefits: jobposting.benefits,
            location: jobposting.location
        },{
            headers: authHeader(),
        });
    }

    getSelectedTask(task){
        return axios.get(API_URL + 'getSelectedTask' , {
            headers: authHeader(),
            params:{
                id: task.id,
            }
        });
    }
    getSelectedEvent(event){
        return axios.get(API_URL + 'getSelectedEvent' , {
            headers: authHeader(),
            params:{
                id: event.id,
            }
        });
    }
    getSelectedJobPosting(jobposting){
        return axios.get(API_URL + 'getSelectedJobPosting' , {
            headers: authHeader(),
            params:{
                id: jobposting.id,
            }
        });
    }
    deleteJobPosting(jobposting){

        return axios.delete(API_URL + 'deleteJobPosting' , {
            headers: authHeader(),
            data:{
                id: jobposting.id,
            }
        });
    }
    deleteTask(task){
        return axios.delete(API_URL + 'deleteTask' , {
            headers: authHeader(),
            data:{
                id: task.id,
            }
        });
    }
    getSelectedRolegroup(rolegroup){
        return axios.get(API_URL + 'getSelectedRolegroup' , {
            headers: authHeader(),
            params:{
                id: rolegroup.id,
            }
        });
    }
    deleteRolegroup(rolegroup){
        return axios.delete(API_URL + 'deleteRolegroup' , {
            headers: authHeader(),
            data:{
                id: rolegroup.id,
            }
        });
    }
    deleteUserGroup(usergroup){
        return axios.delete(API_URL + 'deleteUserGroup' , {
            headers: authHeader(),
            data:{
                id: usergroup.id,
            }
        });
    }
    editSelectedRolegroup(rolegroup,name,checkedroles){
        return axios.post(API_URL + 'editSelectedRolegroup', {
            id:rolegroup.id,
            name:name.name,
            roles: checkedroles,

        },{
            headers: authHeader(),
        });
    }
    editSelectedUserGroup(usergroup, name){
        return axios.post(API_URL + 'editSelectedUserGroup', {
            id:usergroup.id,
            name:name.name,

        },{
            headers: authHeader(),
        });
    }
    removeUserFromTask(user, task){
        return axios.post(API_URL + 'removeUserFromTask', {
            userid:user.id,
            taskid: task.id
        },{
            headers: authHeader(),
        });
    }
    removeUserGroupFromTask(usergroup, task){
        return axios.post(API_URL + 'removeUserGroupFromTask', {
            usergroupid:usergroup.id,
            taskid: task.id
        },{
            headers: authHeader(),
        });
    }
    removeUserFromUserGroup(user, usergroup){
        return axios.post(API_URL + 'removeUserFromUserGroup', {
            usergroupid:usergroup.id,
            userid: user.id
        },{
            headers: authHeader(),
        });
    }
    getUsersOfTask(task){
        return axios.get(API_URL + 'getUsersOfTask' , {
            headers: authHeader(),
            params:{
                id: task.id,
            }
        });
    }
    getUserGroupsOfTask(task){
        return axios.get(API_URL + 'getUserGroupsOfTask' , {
            headers: authHeader(),
            params:{
                id: task.id,
            }
        });
    }
    getSelectedUserGroup(usergroup){
        return axios.get(API_URL + 'getSelectedUserGroup' , {
            headers: authHeader(),
            params:{
                id: usergroup.id,
            }
        });
    }


}

export default new CompanyService();