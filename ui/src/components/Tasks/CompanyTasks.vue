<template>

    <div class="container">


      <div ><label class="labelheader">COMPANY TASKS</label></div>
      <div v-if="currentUser && !message">
        <div  class="form-group search">
          <input type="text" class="form-control" v-model="searchText" placeholder="Search">
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            <th></th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td>{{ task.taskdesc }}</td>
            <td>{{ task.deadline }}</td>
            <td v-if="task.status === 1">Finished</td>
            <td v-if="task.status === 0">Active</td>
            <td>
              <button class="btn btn-primary" :disabled="loading" @click="taskDetails(task)">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Details</span>
              </button>
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
  
  </template>
  
  <script>
  import CompanyService from "../../services/company.service";


  export default {
    name: "CompanyTask",
    components: {

    },
    data() {
      return {
        tasks: [],
        isEditmode:false,
        message: "",
        requestmessage: "",
        searchText: ''
      };
    },
  
    computed: {
  
      currentUser() {
        return this.$store.state.auth.user;
      },
      filteredTasks() {
        return this.tasks.filter(task => {
          const search = this.searchText.toLowerCase();
          return (
              task.name.toLowerCase().includes(search) ||
              task.taskdesc.toLowerCase().includes(search) ||
              task.deadline.toLowerCase().includes(search)
          );
        });
      },


  
    },
    mounted()
    {
      CompanyService.getTasks(this.currentUser).then(
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
      },

  
  
  
    }
  
  };
  </script>