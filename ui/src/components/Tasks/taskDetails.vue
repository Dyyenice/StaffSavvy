<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedTask && !message">
        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="name" class="label">Name</label>
                <Field id="name" name="name" type="text" class="form-control" v-model="task.name" />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group col-md-6 id">
                <label for="deadline" class="label">deadline</label>
                <Field id="deadline" name="deadline" type="date" :min="currentDate" class="form-control" v-model="task.deadline"/>
                <ErrorMessage name="deadline" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="desc" class="label">description</label>
                <Field id="desc" name="desc" type="textarea" class="form-control" v-model="task.taskdesc"/>
                <ErrorMessage name="desc" class="error-feedback" />
              </div>
            </div>
           <div class="form-row"></div>
            <label>USERS ASSIGNED TO TASK</label>
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
                  <button class="btn btn-primary" :disabled="loading" @click="removeUserFromTask(user)">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Remove</span>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <label>TEAMS ASSIGNED TO TASK</label>
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
                  <button class="btn btn-primary" :disabled="loading" @click="removeUserGroupFromTask(usergroup)">
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
          <button class="btn btn-danger" type="button" @click="deleteTask">
            <span>Delete</span>
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
import moment from 'moment'
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
      task :[],
      users: [],
      usergroups:[],
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedTask(){
      return JSON.parse(localStorage.getItem("selectedTask"))
    },
    currentDate()
    {
      console.log(moment().format('YYYY-MM-DD'))
      return moment().format('YYYY-MM-DD')
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getSelectedTask(this.selectedTask).then(
        (response) =>{
          this.task = response.data

        },
    (error) => {
      this.message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
      error.message ||
      error.toString();
    }
    )
    CompanyService.getUsersOfTask(this.selectedTask).then(
        (response) =>{
          this.users = response.data
          console.log(this.users);
        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    )
    CompanyService.getUserGroupsOfTask(this.selectedTask).then(
        (response) =>{
          this.usergroups = response.data

        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    )


  },
  methods: {

    saveData(task) {



      CompanyService.editSelectedTask(this.selectedTask, task).then(
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
    deleteTask(){
      CompanyService.deleteTask(this.selectedTask).then(
          (response) =>{
            this.message = response.data
            this.successful = true
            localStorage.removeItem("selectedTask");
            this.$router.push("/companyTasks")
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
    removeUserFromTask(user) {
      CompanyService.removeUserFromTask(user, this.selectedTask).then(
          (response) =>{
            this.message = response.data;
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
    removeUserGroupFromTask(user) {
      CompanyService.removeUserGroupFromTask(user, this.selectedTask).then(
          (response) =>{
            this.message = response.data;
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
