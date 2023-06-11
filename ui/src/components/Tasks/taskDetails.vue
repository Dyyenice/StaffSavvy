<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedTask">
        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <div>
              <div class="form-row">
                <div class="form-group col-md-6 id">
                  <label for="description" class="label">description</label>
                  <Field id="description" name="description" type="text" class="form-control" v-model="selectedTask.taskdesc" disabled/>
                  <ErrorMessage name="description" class="error-feedback" />
                </div>
                <div class="form-group col-md-6 id">
                  <label for="deadline" class="label">deadline</label>
                  <Field id="deadline" name="deadline" type="date" class="form-control" v-model="selectedTask.deadline" disabled/>
                  <ErrorMessage name="name" class="error-feedback" />
                </div>

              </div>
          </div>
          </div>
          <button class="btn btn-primary" type="submit" disabled>
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
      selectedPersonnelCompanyInfo: [],
      rolegroups: [],
      selected: '',
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedTask(){
      return JSON.parse(localStorage.getItem("selectedTask"))
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }


  },
  methods: {

    saveData(user) {
      var selectedRolegroup =JSON.parse(this.selected)
      console.log(selectedRolegroup.id)
      console.log(user);

      CompanyService.editSelectedPersonnel(user, selectedRolegroup).then(
          () => {

          },
          (error) => {
            (error.response &&
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
