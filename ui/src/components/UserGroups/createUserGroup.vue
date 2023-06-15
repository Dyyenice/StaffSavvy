<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

      <div ><label class="labelheader">CREATE TEAM</label></div>
      <div v-if="currentUser">
        <label  class="label" >Personnels</label>
        <Form @submit="saveData" :validation-schema="schema" >
           <div>
            <div class="form-group search">
             <input type="text" class="form-control" v-model="searchText" placeholder="Search">
            </div>
            <table class="table">
            <thead>
              <tr>
              <th>E-mail</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone Number</th>
              <th></th>
              </tr>
            </thead>
        <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button class="btn btn-primary" type="button"  @click="addToSelected(user)">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span v-if="!selectedPersonnels.includes(user)">Add</span>
                <span v-if="selectedPersonnels.includes(user)">Remove</span>
            </button>
          </td>
        </tr>
       </tbody>
      </table>
      
          </div>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="groupname" class="label" >groupname</label>
              <Field id="groupname" name="groupname" type="text" class="form-control" />
              <ErrorMessage name="groupname" class="error-feedback" />
            </div>
          </div>


          <button class="btn btn-primary" type="submit">
            <span>Save</span>
          </button>
        </Form>

      </div>

      <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>

</template>

<script>

import {ErrorMessage, Field, Form} from "vee-validate";
import CompanyService from "@/services/company.service";

export default {
  name: 'CreateUserGroup',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isEditMode: false,
      successful: false,
      loading: false,
      message: "",
      users: [],
      selectedPersonnels: [],
      searchText: '',
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredUsers() {
      return this.users.filter(user => {
        const search = this.searchText.toLowerCase();
        return (
          user.email.toLowerCase().includes(search) ||
          user.name.toLowerCase().includes(search) ||
          user.surname.toLowerCase().includes(search) ||
          user.phone.toLowerCase().includes(search)
        );
      });
    }

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getCompanyPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.users = response.data;
          console.log(this.users);
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
    addToSelected(user){
      if(this.selectedPersonnels.includes(user)){
        this.selectedPersonnels.splice(user);

      }else{
        this.selectedPersonnels.push(user);
        console.log(this.selectedPersonnels);

      }


    },
    saveData(name) {



      CompanyService.createUserGroup(name.groupname, this.selectedPersonnels,  this.currentUser).then(
          (response) => {
            this.message = response.data;
            this.successful = true;
          },
          (error) => {
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          });

    },

  },

};
</script>

<style scoped>
.profile-img-card {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  transition: box-shadow 0.3s ease-in-out;
}

.hover-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.id{
  margin: auto;
}
</style>
