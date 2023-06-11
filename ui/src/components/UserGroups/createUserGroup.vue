<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
      <div v-if="!message"><label class="labelheader">COMPANY PERSONNELS</label></div>
      <div v-if="currentUser">
        <Form @submit="saveData" :validation-schema="schema" >
          <div class="form-row" v-for="user in users" :key="user.id">
            <div class="form-group col-md-4">
              <label for="name" class="label" >E-mail</label>
              <Field id="email" name="email" type="text" class="form-control" v-model="user.email" disabled/>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group col-md-3">
              <label for="name" class="label" >Name</label>
              <Field id="name" name="name" type="text" class="form-control" v-model="user.name" disabled/>
              <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group col-md-2">
              <label for="surname" class="label" >Surname</label>
              <Field id="surname" name="surname" type="text" class="form-control" v-model="user.surname" disabled/>
              <ErrorMessage name="surname" class="error-feedback" />
            </div>
            <div class="form-group col-md-3">
              <label for="phone" class="label" >Phone Number</label>
              <Field id="phone" name="phone" type="text" class="form-control" v-model="user.phone" disabled />
              <ErrorMessage name="phone" class="error-feedback" />
            </div>

              <button class="btn btn-primary form-group col-md-2" type="button"  @click="addToSelected(user)">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span v-if="!selectedPersonnels.includes(user)">Add</span>
                <span v-if="selectedPersonnels.includes(user)">Remove</span>
              </button>

          </div>
          <div class="form-row">
            <div class="form-group col-md-2">
              <label for="groupname" class="label" >groupname</label>
              <Field id="groupname" name="groupname" type="text" class="form-control" />
              <ErrorMessage name="groupname" class="error-feedback" />
            </div>
          </div>


          <button class="btn btn-primary" type="submit">
            <span>Save</span>
          </button>
        </Form>

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
  name: 'CreateUserGroup',
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
      users: [],
      selectedPersonnels: [],
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
          this.users = response.data;
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
  methods: {
    addToSelected(user){
      if(this.selectedPersonnels.includes(user)){
        this.selectedPersonnels.splice(user);

      }else{
        this.selectedPersonnels.push(user);
        console.log(this.selectedPersonnels);

      }


    },
    saveData(name) {



      CompanyService.createUserGroup(name.groupname, this.selectedPersonnels,  this.currentUser).then(
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
          });

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
