<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="message">  <label class="labelheader">{{ message }}</label></div>
      <div v-if="!message"><label class="labelheader">CREATE TASK</label></div>
      <div v-if="currentUser">


          <Form @submit="saveData" :validation-schema="schema" >
            <div>
              <div class="form-group col-md-6 id">
                <Field id="companyid" name="companyid" type="hidden" class="form-control" v-model="currentUser.id" />
              </div>


                <div class="form-row">
                  <div class="form-group col-md-6 id">
                    <label for="desc" class="label">description</label>
                    <Field id="desc" name="desc" type="text" class="form-control" />
                    <ErrorMessage name="desc" class="error-feedback" />
                  </div>
                  <div class="form-group col-md-6 id">
                    <label for="deadline" class="label">deadline</label>
                    <Field id="deadline" name="deadline" type="date" class="form-control"/>
                    <ErrorMessage name="deadline" class="error-feedback" />
                  </div>
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
  name: 'Task',
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
  },
  methods: {

    saveData(task) {

      console.log(task);

      CompanyService.createTask(task, this.currentUser).then(
          () => {

          },
           (error) => {
            this.message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
          });
      location.reload();
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
