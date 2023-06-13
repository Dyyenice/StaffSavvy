<template>
  <div class="container">
    <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
    <div v-if="!message"><label class="labelheader">PENDING PERSONNELS</label></div>
    <div>
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
            <button class="btn btn-primary " :disabled="loading" type="submit" @click="confirmPersonnel(user)" >
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Confirm</span>
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
import CompanyService from "../services/company.service";
import "./css/style.css";

export default {
 
 
  name: "User",
  data() {
    return {
      users: [],
      isEditmode:false,
      message: "",
    };
  },
  currentUser() {
      return this.$store.state.auth.user;
    },

  mounted()
      {
    CompanyService.getPendingPersonnels(this.$store.state.auth.user).then(
        (response) => {
          this.users = response.data;
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
    confirmPersonnel(personnel) {
          console.log(personnel)
           CompanyService.confirmPending(personnel).then(
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
      location.reload();
    },
    


    }

};
</script>