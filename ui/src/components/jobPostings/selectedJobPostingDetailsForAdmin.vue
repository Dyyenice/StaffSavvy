<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

      <div><label class="labelheader">CREATE JOB POSTING</label></div>
      <div v-if="currentUser && !message">


        <Form @submit="saveData" :validation-schema="schema" >
          <div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="jobtitle" class="label">Job Title</label>
                <Field id="jobtitle" name="jobtitle" type="text" class="form-control" v-model="jobPosting.jobtitle" />
                <ErrorMessage name="jobtitle" class="error-feedback" />
              </div>
              <div class="form-group col-md-6 id">
                <label for="description" class="label">description</label>
                <Field id="description" name="description" type="textarea" class="form-control" v-model="jobPosting.description"/>
                <ErrorMessage name="description" class="error-feedback" />
              </div>
            </div>
            <div class="form-group col-md-6 id">
              <label for="requirements" class="label">Requirements</label>
              <Field id="requirements" name="requirements" type="textarea" class="form-control" v-model="jobPosting.requirements"/>
              <ErrorMessage name="requirements" class="error-feedback" />
            </div>
            <div class="form-group col-md-6 id">
              <label for="benefits" class="label">Benefits</label>
              <Field id="benefits" name="benefits" type="textarea" class="form-control" v-model="jobPosting.benefits"/>
              <ErrorMessage name="benefits" class="error-feedback" />
            </div>
            <div class="form-group col-md-6 id">
              <label for="location" class="label">Location</label>
              <Field id="location" name="location" type="textarea" class="form-control" v-model="jobPosting.location"/>
              <ErrorMessage name="location" class="error-feedback" />
            </div>

          </div>

          <button class="btn btn-primary" type="submit">
            <span>Save</span>
          </button>
          <button class="btn btn-danger" type="button" @click="deleteJobPosting">
            <span>Delete</span>
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
  name: 'jobposting',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      successful: false,
      message: "",
      jobPosting: []

    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedJobPosting(){
      return JSON.parse(localStorage.getItem("selectedCompanyJobPosting"))
    }

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    console.log(this.selectedJobPosting)
    CompanyService.getSelectedCompanyJobPosting(this.selectedJobPosting).then(
        (response) => {
          this.jobPosting = response.data;
          console.log(this.jobPosting)
        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        });
  },
  methods: {

    saveData(jobposting) {

      console.log(jobposting);

      CompanyService.editSelectedCompanyJobPosting(this.selectedJobPosting, jobposting).then(
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
    deleteJobPosting(){
      CompanyService.deleteJobPosting(this.selectedJobPosting).then(
          (response) =>{
            this.message = response.data
            this.successful = true
            localStorage.removeItem("selectedCompanyJobPosting");
            this.$router.push("/companyJobPostings")
          },
          (error) =>{
            this.message = (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      )
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
  