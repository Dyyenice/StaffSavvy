<template>
  <div class="container">


    <div><label class="labelheader">MY TEAMS</label></div>
    <div v-if="currentUser && !message">
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
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.taskdesc }}</td>
          <td>{{ task.deadline }}</td>
          <td v-if="task.status === 1">Finished</td>
          <td v-if="task.status === 0">Active</td>
        </tr>
        </tbody>
      </table>
    </div>

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
    CompanyService.getTasksOfPersonnel(this.currentUser).then(
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
};
</script>