<template>
  <div class="container">

    <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
    <div v-if="!message"><label class="labelheader">COMPANY PERSONNELS</label></div>
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
            <button class="btn btn-primary form-group col-md-2" :disabled="loading" type="submit"  @click="personnelDetails(user)"  >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Details</span>
            </button>
      </div>
  </div>

</template>

<script>
import CompanyService from "../services/company.service";
import {ErrorMessage, Field,} from "vee-validate";
export default {
  name: "User",
  components: {
    Field,
    ErrorMessage,
  },
  data() {
    return {
      users: [],
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
  methods: {
  personnelDetails(personnel){
    localStorage.setItem("selectedPersonnel", JSON.stringify(personnel));
    console.log(JSON.parse(localStorage.getItem("selectedPersonnel")));
    this.$router.push("/personnelDetails");
  }



  }

};
</script>