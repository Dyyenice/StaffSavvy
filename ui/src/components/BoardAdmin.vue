<template>
  <div class="container">
    <header class="jumbotron">
      <div>{{ message }}</div>
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
  <div class="container">
    <header class="jumbotron">
      <div>{{ message }}</div>
      <table>
        <thead>
        </thead>
        <tbody>
          //personel bilgilerini tabloya yerleştirecek ve edit save butonları koydum
        <tr v-for="user in users" :key="user.id">
          <td>{{user.email}}</td>
          <td>{{user.name}}</td>
          <td>{{user.surname}}</td>
          <td>{{user.phone}}</td>
          
        </tr>
        <div class="form-row">
          <div class="form-group">
            <button class="btn btn-primary " :disabled="loading" type="button" @click="toggleEditMode">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Edit</span>
            </button>
          </div>
          <div class="form-group">
            <button class="btn btn-primary " :disabled="loading" type="submit"  v-if="isEditmode" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Save</span>
            </button>
          </div>
        </div>
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
      message: "",
      isEditmode:false,
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
          console.log(this.$store.state.auth.user)
          console.log(this.users);
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
    CompanyService.getPersonnelDetails(this.$store.state.auth.user).then(
        (response) => {
          this.users = response.data;
          console.log(this.$store.state.auth.user)
          console.log(this.users);
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
  },
  methods: {
    toggleEditMode() {
    this.isEditmode = !this.isEditmode;
    }, 
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
     /* this.$store.dispatch("company/confirmPending", JSON.parse(JSON.stringify(personnel))).then(
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
      );*/
    },
    

  editPersonnelDetails(personnel) {
  this.message = "";
  this.successful = false;
  this.loading = true;

  CompanyService.editPersonnelDetails(personnel)
    .then(() => {
      this.message = "Personnel details updated successfully";
      this.successful = true;
      this.loading = false;
      
    })
    .catch(error => {
      this.message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      this.successful = false;
      this.loading = false;
    });
}
    }

};
</script>