<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

      <div><label class="labelheader">GIVE TASK</label></div>
      <div v-if="currentUser && !message">

          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
            <v-btn-toggle v-model="toggle_exclusive" tile group color="#f0c62f" >
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
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="usergroups" class="usergroups">Select Team</label>
                <select id="usergroups" name="usergroups" v-model="selectedUsergroup" class="mb-3">
                  <option disabled value="">Please Select an User Group</option>
                  <option v-for="usergroups in usergroupsa" :key="usergroups.id" :value="usergroups.id">
                    {{usergroups.name}}
                  </option>
                </select>
                <ErrorMessage name="tasks" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="tasks" class="label">Assign Task</label>
                <select id="tasks" name="tasks" v-model="selectedTask" class="mb-3">
                  <option disabled value="">Please Select a Task</option>
                  <option v-for="task in tasks" :key="task.id" :value="task.id">
                    {{task.name}}
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
        <div v-if="toggle === 2">
          <Form @submit="saveDataForUser" :validation-schema="schema">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="personnels" class="label">Select Personnel</label>
                <div class="form-row">
                  <select id="personnels" name="personnels" v-model="selectedPersonnel" class="form-select">
                    <option disabled value="">Please Select a Personnel</option>
                    <option v-for="personnel in companyPersonnels" :key="personnel.id" :value="personnel.id">
                      {{personnel.name}} {{personnel.surname}}
                    </option>
                  </select>
                  <ErrorMessage name="tasks" class="error-feedback" />
                </div>

              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="tasks" class="label">Assign Task</label>
                <div class="form-row">
                  <select id="tasks" name="tasks" v-model="selectedTask">
                    <option disabled value="">Please Select a Task</option>
                    <option v-for="task in tasks" :key="task.id" :value="task.id">
                      {{task.name}}
                    </option>
                  </select>
                  <ErrorMessage name="tasks" class="error-feedback" />
                </div>

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

import {ErrorMessage, Form} from "vee-validate";
import CompanyService from "@/services/company.service";

export default {
  name: 'Task',
  components: {
    Form,
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
      usergroupsa:[],
      selectedTask: '',
      selectedPersonnel: '',
      selectedUsergroup:'',
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
    CompanyService.getUsergroups(this.currentUser).then(
        (response) => {
          this.usergroupsa = response.data;
          console.log(this.usergroupsa);
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
      saveDataForUserGroup() {
        var selectedTask = JSON.parse(this.selectedTask);
        var selectedUsergroup = JSON.parse(this.selectedUsergroup);
        CompanyService.giveTaskToUsergroup(selectedTask, selectedUsergroup).then(
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
