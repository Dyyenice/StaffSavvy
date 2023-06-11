<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
      <div v-if="!message"><label class="labelheader">GIVE TASK</label></div>
      <div v-if="currentUser">

          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
            <v-btn-toggle v-model="toggle_exclusive" tile group color="#49D9A0" >
              <v-btn @click="setToggle(1)">
                <span>User Groups</span>
              </v-btn>
              <v-btn @click="setToggle(2)">
                <span>User</span>
              </v-btn>
            </v-btn-toggle>
          </v-toolbar>

        <div v-if="toggle === 1">
          <Form @submit="saveDataForUserGroup" :validation-schema="schema" >
            <div>
              <div class="form-group col-md-6 id">
                <Field id="companyid" name="companyid" type="hidden" class="form-control" v-model="currentUser.id" />
              </div>
              <div>
                <div class="form-group col-md-6 id">
                  <label for="desc" class="label">description</label>
                  <Field id="desc" name="desc" type="text" class="form-control" />
                  <ErrorMessage name="desc" class="error-feedback" />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="deadline" class="label">deadline</label>
                    <Field id="deadline" name="deadline" type="date" class="form-control"/>
                    <ErrorMessage name="deadline" class="error-feedback" />
                  </div>
                </div>
              </div>

            </div>
            <button class="btn btn-primary" type="submit">
              <span>Save</span>
            </button>
          </Form>
        </div>
        <div v-if="toggle === 2">
          <Form @submit="saveDataForUser">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="personnels" class="personnels">Assign Task</label>
                <select id="personnels" name="personnels" v-model="selectedPersonnel">
                  <option v-for="personnel in companyPersonnels" :key="personnel.id">
                    {{personnel}}
                  </option>
                </select>
                <ErrorMessage name="tasks" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="tasks" class="label">Assign Task</label>
                <select id="tasks" name="tasks" v-model="selectedTask">
                  <option v-for="task in tasks" :key="task.id">
                    {{task}}
                  </option>
                </select>
                <ErrorMessage name="tasks" class="error-feedback" />
              </div>
            </div>
            <button class="btn btn-primary" type="submit">
              <span>Save</span>
            </button>
          </Form>






        </div>





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
  name: 'Task',
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
      toggle_exclusive: 1,
      toggle: 2,
      companyPersonnels: [],
      tasks: [],
      selectedTask: '',
      selectedPersonnel: '',
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },


  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getCompanyPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.companyPersonnels = response.data;
          console.log(this.companyPersonnels);

        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    CompanyService.getTasks(this.currentUser).then(
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


  },
    methods: {
      setToggle(num) {
        this.toggle = num;
      },


      saveDataForUser() {
        var selectedTask = JSON.parse(this.selectedTask);
        var selectedPersonnel = JSON.parse(this.selectedPersonnel);
        CompanyService.giveTaskToUser(selectedTask, selectedPersonnel).then(
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
            }

        );

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
