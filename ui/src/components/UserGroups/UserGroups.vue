<template>
    <div class="container">
  
      <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
      <div v-if="!message"><label class="labelheader">TEAMS</label></div>
      <table class="table">
               <thead>
                 <tr>
                   <th>Name</th>
                   <th></th>
                 </tr>
               </thead>
             <tbody>
                <tr v-for="usergroup in usergroups" :key="usergroup.id">
                 <td>{{ usergroup.name }}</td>
                <td>
                    <button class="btn btn-primary form-group col-md-2" :disabled="loading" type="submit"  @click="teamDetails(usergroup)"  >
                      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                      <span>Details</span>
                    </button>
               </td>
               </tr>
              </tbody>
             </table>
    </div>
  
  </template>
  
  <script>
  import CompanyService from "../../services/company.service";

  export default {
    name: "UserGroup",
    components: {
     
    },
    data() {
      return {
        tasks: [],
        isEditmode:false,
        message: "",
      };
    },
  
    computed: {
  
      currentUser() {
        return this.$store.state.auth.user;
      }
  
    },
    mounted()
    {
      CompanyService.getUsergroups(this.currentUser).then(
          (response) => {
            this.usergroups = response.data;
  
          },
          (error) => {
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
  
    },
    methods: {
      teamDetails(task){
        localStorage.setItem("selectedTeam", JSON.stringify(task));
        console.log(JSON.parse(localStorage.getItem("selectedTeam")));
        this.$router.push("/UserGroupDetails");
      }
  
  
  
    }
  
  };
  </script>