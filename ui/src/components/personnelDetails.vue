<template>
 
  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedPersonnel && !message">
        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <label class="labelheader">{{selectedPersonnel.name}} {{ selectedPersonnel.surname }} </label>
            <div>
              <div class="form-group col-md-6 id">
                <label for="id" class="label">id</label>
                <Field id="id" name="id" type="text" class="form-control" v-model="selectedPersonnel.id" disabled/>
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="name" class="label">Name</label>
                  <Field id="name" name="name" type="text" class="form-control" v-model="selectedPersonnel.name" disabled/>
                  <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group col-md-6">
                  <label for="surname" class="label">Surname</label>
                  <Field id="surname" name="surname" type="text" class="form-control" v-model="selectedPersonnel.surname" disabled/>
                  <ErrorMessage name="surname" class="error-feedback" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="email" class="label" >Email</label>
                  <Field id="email" name="email" type="text" class="form-control" v-model="selectedPersonnel.email" disabled/>
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group col-md-6">
                  <label for="phone" class="label">Phone Number</label>
                  <Field id="phone" type="tel" name="phone"  class="form-control" v-model="selectedPersonnel.phone" disabled/>
                  <ErrorMessage name="phone" class="error-feedback" />
                </div>
              </div>

              <div class="form-row">

                <div class="form-group col-md-6">
                  <label for="datestart" class="label">Date Start</label>
                  <Field id="datestart" name="datestart" type="date" class="form-control" v-model="selectedPersonnelCompanyInfo.date_start"  disabled/>
                  <ErrorMessage name="dateofbirth" class="error-feedback" />
                </div>
                <div class="form-group col-md-6">
                  <label for="salary" class="label">Salary</label>
                  <Field id="salary" name="salary" type="number" class="form-control" v-model="selectedPersonnelCompanyInfo.salary" />
                  <ErrorMessage name="salary" class="error-feedback" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="allowance" class="label">Off Day Allowance</label>
                  <Field id="allowance" name="allowance" type="number" class="form-control" v-model="selectedPersonnelCompanyInfo.allowance" />
                  <ErrorMessage name="allowance" class="error-feedback" />
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">
            <span>Save</span>
          </button>
          <button class="btn btn-primary" type="button" @click="deletePersonnel">
            <span>Delete Personnel</span>
          </button>

        </Form>
        <label class="labelheader">Teams that Personnel in</label>
        <table class="table">
          <thead>
          <tr>
            <th>Team Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="usergroup in usergroups" :key="usergroup.id">
            <td>{{ usergroup.name }}</td>

          </tr>
          </tbody>
        </table>

        <label class="labelheader">Personnel's Tasks</label>
        <table class="table">
          <thead>
          <tr>
            <th>Description</th>
            <th>Deadline</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.taskdesc }}</td>
            <td>{{ task.deadline}}</td>
            <td>
            </td>
          </tr>
          </tbody>
        </table>
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
      selectedPersonnelCompanyInfo: [],
      tasks:[],
      usergroups:[],
      selected: '',
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedPersonnel(){
      return JSON.parse(localStorage.getItem("selectedPersonnel"))
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getSelectedPersonnel(this.selectedPersonnel).then(
        (response) => {
          this.selectedPersonnelCompanyInfo = response.data;
        },
        (error) => {
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
        }
    );

    CompanyService.getTasksOfPersonnel(this.selectedPersonnel).then(
        (response) => {
          this.tasks = response.data;
          console.log(this.tasks);
        },
        (error) => {
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
        }
    );
    CompanyService.getUserGroupsOfPersonnel(this.selectedPersonnel).then(
        (response) => {
          this.usergroups = response.data;
          console.log(this.usergroups);
        },
        (error) => {
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
        }
    );

  },
  methods: {

    saveData(user) {

      CompanyService.editSelectedPersonnel(user).then(
          (response) => {
            this.message = response.data;
            this.successful  = true;
          },
          (error) => {
            this.message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
          });

    },
    deletePersonnel() {

      CompanyService.deletePersonnel(this.selectedPersonnel).then(
          (response) => {
            this.message = response.data;
            this.successful  = true;
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
