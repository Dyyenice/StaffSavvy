<template>
  <div class="container">
    <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
    <div v-if="!message"><label class="labelheader">COMPANY PERSONNELS</label></div>
    <div class="form-group search">
      <input type="text" class="form-control" v-model="searchText" placeholder="Search">
    </div>
  
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
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button class="btn btn-primary" :disabled="loading" @click="personnelDetails(user)">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Details</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CompanyService from "../services/company.service";
import "./css/style.css";

export default {
  data() {
    return {
      users: [], 
      loading: false,
      searchText: ''
    };
  },
  
  mounted(){
    CompanyService.getCompanyPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.users = response.data;
          console.log(this.$store.state.auth.user)
          console.log(this.users);
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
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const search = this.searchText.toLowerCase();
        return (
          user.email.toLowerCase().includes(search) ||
          user.name.toLowerCase().includes(search) ||
          user.surname.toLowerCase().includes(search) ||
          user.phone.toLowerCase().includes(search)
        );
      });
    }
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

