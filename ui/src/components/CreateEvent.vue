<template>

    <div class="col-md-12">
      <div class="card card-container-profile">
  
        <div><label class="labelheader">CREATE EVENT</label></div>
        <div v-if="currentUser && !message">
  
  
            <Form @submit="saveData" :validation-schema="schema" >
              <div>
                <div class="form-group col-md-6 id">
                  <Field id="companyid" name="companyid" type="hidden" class="form-control" v-model="currentUser.id" />
                </div>
  
  
                  <div class="form-row">
                    <div class="form-group col-md-6 id">
                      <label for="name" class="label">Event Name</label>
                      <Field id="name" name="name" type="text" class="form-control" />
                      <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group col-md-6 id">
                      <label for="desc" class="label">Event Description</label>
                      <Field id="desc" name="desc" type="textarea" class="form-control"/>
                      <ErrorMessage name="desc" class="error-feedback" />
                    </div>
                  </div>
                <div class="form-group col-md-6 id">
                  <label for="date_start" class="label">Event Start Date</label>
                  <Field id="date_start" name="date_start" type="date" class="form-control" />
                  <ErrorMessage name="date_start" class="error-feedback" />
                </div>
                <div class="form-group col-md-6 id">
                  <label for="date_end" class="label">Event End Date</label>
                  <Field id="date_end" name="date_end" type="date" class="form-control" />
                  <ErrorMessage name="date_end" class="error-feedback" />
                </div>
                <div class="form-group col-md-6 id">
                  <label for="multimedia" class="label">Add Multimedia</label>
                  <Field id="multimedia" name="multimedia" type="file" class="form-control" accept="image/png, image/gif, image/jpeg"/>
                  <ErrorMessage name="multimedia" class="error-feedback" />
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
    name: 'event',
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        successful: false,
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
  
      saveData(event) {
  
        console.log(event);
  
        CompanyService.createEvent(event, this.currentUser).then(
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
  