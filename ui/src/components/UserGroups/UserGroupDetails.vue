<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedUserGroup && !message">
        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="name" class="label">Name</label>
                <Field id="name" name="name" type="text" class="form-control" v-model="usergroup.name" />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
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
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.email }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.surname }}</td>
                  <td>{{ user.phone }}</td>
                  <td>
                    <button class="btn btn-primary" :disabled="loading" type="button" @click="removeUserFromUserGroup(user)">
                      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                      <span>Remove</span>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <button class="btn btn-primary" type="submit">
              <span>Edit</span>
            </button>
            <button class="btn btn-danger" type="button" @click="deleteUserGroup">
              <span>Delete</span>
            </button>

          </div>
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
  name: 'Profile',
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
      usergroup :[],
      users:[],
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedUserGroup(){
      return JSON.parse(localStorage.getItem("selectedUserGroup"))
    },

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getSelectedUserGroup(this.selectedUserGroup).then(
        (response) =>{
          this.usergroup = response.data.usergroup;
          this.users = response.data.users;
          console.log(this.usergroup);
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


    saveData(name) {
      CompanyService.editSelectedUserGroup(this.selectedUserGroup, name).then(
          (response) => {
            this.message = response.data
            this.successful = true
          },
          (error) => {
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          });

    },
    deleteUserGroup(){
      CompanyService.deleteUserGroup(this.selectedUserGroup).then(
          (response) =>{
            this.message = response.data
            this.successful = true
            localStorage.removeItem("selectedUserGroup");
            this.$router.push("/companyUserGroups")
          },
          (error) =>{
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    },
    removeUserFromUserGroup(user){
      CompanyService.removeUserFromUserGroup(user, this.selectedUserGroup).then(
          (response) =>{
            this.message = response.data;
            this.successful = true
          },
          (error) =>{
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    }

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
