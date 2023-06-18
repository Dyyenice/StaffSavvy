<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

      <div ><label class="labelheader">GIVE ROLE GROUP</label></div>
      <div v-if="currentUser">
        <div>
          <Form @submit="saveDataForUser">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="personnels" class="personnels">Select Personnel</label>
                <select id="personnels" name="personnels" v-model="selectedPersonnel">
                  <option disabled value="">Please Select a Personnel</option>
                  <option v-for="personnel in companyPersonnels" :key="personnel.id" :value="personnel.id">
                    {{personnel.name}}  {{personnel.surname}}
                  </option>
                </select>
                <ErrorMessage name="personnels" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="rolegroups" class="label">Select Role Group</label>
                <select id="rolegroups" name="rolegroups" v-model="selectedRoleGroup">
                  <option disabled value="">Please Select a Role Group</option>
                  <option v-for="rolegroup in roleGroups" :key="rolegroup.id" :value="rolegroup.id" >
                    {{rolegroup.name}}
                  </option>
                </select>
                <ErrorMessage name="rolegroups" class="error-feedback" />
              </div>
            </div>
            <button class="btn btn-primary" type="submit">
              <span>Save</span>
            </button>
          </Form>






        </div>





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

import {ErrorMessage,  Form} from "vee-validate";
import CompanyService from "@/services/company.service";

export default {
  name: 'Task',
  components: {
    Form,

    ErrorMessage,

  },

  data() {
    return {
      isEditMode: false,
      successful: false,
      loading: false,
      message: "",
      companyPersonnels: [],
      roleGroups: [],
      selectedRoleGroup: '',
      selectedPersonnel: '',
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
          this.companyPersonnels = response.data;
          console.log(this.companyPersonnels);

        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    CompanyService.getRolegroups(this.currentUser).then(
        (response) => {
          this.roleGroups = response.data;
        },
        (error) => {
        this.message =  (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
        }
    );


  },
  methods: {
    setToggle(num) {
      this.toggle = num;
    },


    saveDataForUser() {
      console.log(this.selectedRoleGroup);
      var selectedRolegroup = JSON.parse(this.selectedRoleGroup);
      var selectedPersonnel = JSON.parse(this.selectedPersonnel);

      CompanyService.giveRolegroupToUser(selectedRolegroup, selectedPersonnel).then(
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
          }

      );

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
