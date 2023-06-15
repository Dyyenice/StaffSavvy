<template>
    <div class="container">
  

      <div ><label class="labelheader">COMPANY TASKS</label></div>
      <div v-if="currentUser && !message">
        <div class="form-row" v-for="task in tasks" :key="task.id">
          <div class="form-group col-md-4">
            <label for="desc" class="label" >Description</label>
            <Field id="desc" name="desc" type="text" class="form-control" v-model="task.taskdesc" disabled/>
            <ErrorMessage name="desc" class="error-feedback" />
          </div>
          <div class="form-group col-md-3">
            <label for="deadline" class="label" >Deadline</label>
            <Field id="deadline" name="deadline" type="date" class="form-control" v-model="task.deadline" disabled/>
            <ErrorMessage name="deadline" class="error-feedback" />
          </div>
          <button class="btn btn-primary form-group col-md-2" :disabled="loading" type="submit"  @click="taskDetails(task)"  >
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Details</span>
          </button>
        </div>
      </div>

    </div>
  
  </template>
  
  <script>
  import CompanyService from "../../services/company.service";
  import {ErrorMessage, Field,} from "vee-validate";
  export default {
    name: "CompanyTask",
    components: {
      Field,
      ErrorMessage,
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
      CompanyService.getCompletedTasks(this.currentUser).then(
          (response) => {
            this.tasks = response.data;
  
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
      taskDetails(task){
        localStorage.setItem("selectedTask", JSON.stringify(task));
        console.log(JSON.parse(localStorage.getItem("selectedTask")));
        this.$router.push("/taskDetails");
      }
  
  
  
    }
  
  };
  </script>