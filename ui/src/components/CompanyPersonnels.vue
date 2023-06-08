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
          <td><button @click="personnelDetails(user)">details</button></td>
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
      isEditmode:false,
    };
  },
  currentUser() {
    return this.$store.state.auth.user;
  },

  mounted()
  {
    CompanyService.getCompanyPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.users = response.data;
          console.log(this.$store.state.auth.user)
          console.log(this.users);
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
  personnelDetails(personnel){
    localStorage.setItem("selectedPersonnel", JSON.stringify(personnel));
    console.log(JSON.parse(localStorage.getItem("selectedPersonnel")));
    this.$router.push("/personnelDetails");
  }



  }

};
</script>