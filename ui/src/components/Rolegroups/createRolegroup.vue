<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div><label class="labelheader">CREATE ROLE GROUP</label></div>
      <div v-if="currentUser">
        <Form @submit="saveData" :validation-schema="schema" >
          <div class="form-group col-md-4">
            <label for="rolegroupname" class="label" >Name</label>
            <Field id="rolegroupname" name="rolegroupname" type="text" class="form-control"/>
            <ErrorMessage name="rolegroupname" class="error-feedback" />
          </div>
          <div class="form-row" v-for="role in roles" :key="role.id">
            <div class="form-group col-md-4">
              <input type="checkbox" :id="role.id"  :value="role" v-model="checkedRoles">
              <label :for="role.id">{{role.name}}</label>
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
  name: 'CreateRolegroup',
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
      roles: [],
      checkedRoles: [],
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
    CompanyService.getRoles().then(
        (response) => {
          this.roles = response.data;
          console.log(this.roles);
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
    addToSelected(role){
      if(this.checkedRoles.includes(role)){
        this.checkedRoles.splice(role);

      }else{
        this.checkedRoles.push(role);
        console.log(this.checkedRoles);

      }


    },

    saveData(name) {
      CompanyService.createRolegroup(name, this.checkedRoles, this.currentUser).then(
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
