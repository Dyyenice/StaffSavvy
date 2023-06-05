<template>
  <div class="container">
    <header class="jumbotron">
      <table>
        <thead>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.email}}</td>
          <td>{{user.name}}</td>
          <td>{{user.surname}}</td>
          <td>{{user.phone}}</td>
          <td><button @click="confirmPersonnel(user)">confirm</button></td>
        </tr>
        </tbody>
      </table>
    </header>
  </div>
</template>

<script>
import CompanyService from "../services/company.service";

export default {
  name: "User",
  data() {
    return {
      users: [],
      data: ""
    };
  },

  mounted()
      {
    CompanyService.getPendingPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.users = JSON.parse(JSON.stringify(response.data));
          console.log(this.$store.state.auth.user)
          console.log(this.users);
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
  methods: {
    confirmPersonnel(user) {
          console.log(user)

      this.$store.dispatch("company/confirmPending", user).then(
          (data) => {
            this.message = data.message;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    }
    }

};
</script>