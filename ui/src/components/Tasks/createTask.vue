<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

      <div><label class="labelheader">CREATE TASK</label></div>
      <div v-if="currentUser && !message">


          <Form @submit="saveData" :validation-schema="schema" >
            <div>
              <div class="form-group col-md-6 id">
                <Field id="companyid" name="companyid" type="hidden" class="form-control" v-model="currentUser.id" />
              </div>


                <div class="form-row">
                  <div class="form-group col-md-6 id">
                    <label for="name" class="label">Name</label>
                    <Field id="name" name="name" type="text" class="form-control" />
                    <ErrorMessage name="name" class="error-feedback" />
                  </div>
                  <div class="form-group col-md-6 id">
                    <label for="deadline" class="label">deadline</label>
                    <Field id="deadline" name="deadline" type="date" :min="currentDate" class="form-control"/>
                    <ErrorMessage name="deadline" class="error-feedback" />
                  </div>
                </div>
              <div class="form-group col-md-6 id">
                <label for="desc" class="label">description</label>
                <Field id="desc" name="desc" type="textarea" class="form-control" />
                <ErrorMessage name="desc" class="error-feedback" />
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
import moment from 'moment'

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
    currentDate()
    {
      console.log(moment().format('YYYY-MM-DD'))
      return moment().format('YYYY-MM-DD')
    },

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    CompanyService.getTasks(this.currentUser).then(
        (response) => {
          this.tasks = response.data;

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

    saveData(task) {

      console.log(task);

      CompanyService.createTask(task, this.currentUser).then(
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
