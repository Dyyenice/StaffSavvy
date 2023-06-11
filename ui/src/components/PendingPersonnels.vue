<template>
  <div class="container">
    <label class="labelheader">PENDING PERSONNELS</label>

      <div class="form-row" v-for="user in users" :key="user.id">
      <div class="form-group col-md-4">
        <label for="name" class="label" >E-mail</label>
        <Field id="email" name="email" type="text" class="form-control" v-model="user.email" disabled/>
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group col-md-3 ">
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
      <button class="btn btn-primary form-group col-md-2" :disabled="loading" type="submit" @click="confirmPersonnel(user)" >
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Confirm</span>
      </button>
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
import {ErrorMessage, Field, } from "vee-validate";

export default {
  components: {
    Field,
    ErrorMessage,
  },
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