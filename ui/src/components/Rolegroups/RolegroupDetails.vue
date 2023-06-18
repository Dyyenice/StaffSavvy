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
            <div class="checkbox-form">
              <div class="roles">
                <label v-for="role in roles" :key="role.id" class="item">
                  <span :for="role.id">{{ role.name }}</span>

                  <input
                      :id="role.id"
                      v-model="checkedRoles"
                      type="checkbox"
                      :value="role"

                      @change="onChange"
                  >
                  <span class="checkmark" />
                </label>
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
          this.oldRoles = response.data.roles;
          console.log(this.oldRoles);

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
              console.log(this.roles)
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

    onChange() {
      this.$emit('input', this.checked);
    },
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
.checkbox-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkbox-form .answers {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
}



.checkbox-form .item {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1em;
  height: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
}

.checkbox-form .item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-form .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #c2c2c2;
}

.checkbox-form .item:hover input ~ .checkmark {
  background-color: #949494;
}

.checkbox-form .item input:checked ~ .checkmark {
  background-color: #D8A22E;
}

.checkbox-form .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-form .item input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-form .item .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
