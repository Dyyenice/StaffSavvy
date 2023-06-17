<template>

  <div class="col-md-12">
    <div class="card card-container-profile">
      <div v-if="currentUser && selectedEvent && !message">
        <Form @submit="saveData" :validation-schema="schema" >
          
            <div class="form-row">
             <!-- <div class="form-group col-md-6 id">
                <img :src="event.image" :alt="slide.caption" class="slide-image">
                <Field id="event" name="event" type="text" class="form-control" v-model="selectedEvent.multimedia" />
                <ErrorMessage name="event" class="error-feedback" />
              </div>-->
              <div class="form-group col-md-6 id">
                <label for="name" class="label">Name</label>
                <Field id="name" name="name" type="text" class="form-control" v-model="selectedEvent.name" :disabled="!isEditMode"/>
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group col-md-6 id">
                <label for="date_start" class="label">Start Date</label>
                <Field id="date_start" name="date_start" type="date" :min="currentDate" class="form-control" v-model="selectedEvent.date_start"/>
                <ErrorMessage name="date_start" class="error-feedback" />
              </div>
              <div class="form-group col-md-6 id">
                <label for="date_end" class="label">End Date</label>
                <Field id="date_end" name="date_end" type="date" :min="currentDate" class="form-control" v-model="selectedEvent.date_end"/>
                <ErrorMessage name="date_end" class="error-feedback" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6 id">
                <label for="desc" class="label">description</label>
                <textarea id="desc" name="desc" type="textarea" class="form-control" v-model="selectedEvent.desc"></textarea>
                <ErrorMessage name="desc" class="error-feedback" />
              </div>
            </div>

           <div class="form-row">
            <button class="btn btn-primary" type="submit" @click="toggleEditMode">
            <span>Edit</span>
            </button>
            <button class="btn btn-danger" type="button" @click="deleteEvent">
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
import moment from 'moment'
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
    };



  },
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedEvent(){
      return JSON.parse(localStorage.getItem("selectedEvent"))
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
    CompanyService.getSelectedEvent(this.selectedEvent).then(
        (response) =>{
          this.event = response.data

        },
    (error) => {
      this.message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
      error.message ||
      error.toString();
    }
    )
  },
  methods: {

    saveData(event) {
      CompanyService.editSelectedEvent(this.selectedEvent, event).then(
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
    deleteEvent(){
      CompanyService.deleteEvent(this.selectedEvent).then(
          (response) =>{
            this.message = response.data
            this.successful = true
            localStorage.removeItem("selectedEvent");
            this.$router.push("/Events")
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
    EventDetails(event){
        localStorage.setItem("selectedEvent", JSON.stringify(event));
        console.log(JSON.parse(localStorage.getItem("selectedEvent")));
        this.$router.push("/EventsDetail");
      },
      toggleEditMode() {
    this.isEditMode = !this.isEditMode;
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
