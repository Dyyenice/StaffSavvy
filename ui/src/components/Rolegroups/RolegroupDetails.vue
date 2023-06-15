<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedRolegroup && !message">
        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="name" class="label">Name</label>
                <Field id="name" name="name" type="text" class="form-control" v-model="rolegroup.name" />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
          </div>
            <div class="form-row" v-for="role in roles" :key="role.id">
              <div class="form-group col-md-4">
                <input type="checkbox" :id="role.id" :checked="checkedRoles.includes(role)" :value="role.id" v-model="checkedRoles">
                <label :for="role.id">{{role.name}}</label>
              </div>
            </div>

          <button class="btn btn-primary" type="submit">
            <span>Edit</span>
          </button>
          <button class="btn btn-danger" type="button" @click="deleteRolegroup">
            <span>Delete</span>
          </button>

          </div>
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
  name: 'Profile',
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
      rolegroup :[],
      roles: [],
      checkedRoles: [],
      oldRoles: [],
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedRolegroup(){
      return JSON.parse(localStorage.getItem("selectedRolegroup"))
    },

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getSelectedRolegroup(this.selectedRolegroup).then(
        (response) =>{
          this.rolegroup = response.data.rolegroup
          this.oldRoles = JSON.parse(JSON.stringify(response.data.roles))

          console.log(this.checkedRoles);
        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
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


    saveData(name) {
      console.log(this.checkedRoles);
      CompanyService.editSelectedRolegroup(this.selectedRolegroup, name,this.checkedRoles).then(
          (response) => {
            this.message = response.data
            this.successful = true
          },
          (error) => {
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          });

    },
    deleteRolegroup(){
      CompanyService.deleteRolegroup(this.selectedRolegroup).then(
          (response) =>{
            this.message = response.data
            this.successful = true
            localStorage.removeItem("selectedRolegroup");
            this.$router.push("/companyRolegroups")
          },
          (error) =>{
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
    }

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
