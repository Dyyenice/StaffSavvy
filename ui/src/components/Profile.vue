<template>

<div class="col-md-12">
  <div class="card card-container-profile">
    <div v-if="currentUser">
      <Form @submit="saveData" :validation-schema="schema" >
        <label class="labelheader">{{currentUser.name}} {{ currentUser.surname }} </label>
        <div >
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="label">Name</label>
              <Field id="name" name="name" type="text" class="form-control" v-model="currentUser.name" :disabled="!isEditMode"/>
              <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group col-md-6">
              <label for="surname" class="label">Surname</label>
              <Field id="surname" name="surname" type="text" class="form-control" v-model="currentUser.surname" :disabled="!isEditMode"/>
              <ErrorMessage name="surname" class="error-feedback" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email" class="label" >Email</label>
              <Field id="email" name="email" type="text" class="form-control" v-model="currentUser.email" disabled/>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group col-md-6">
              <label for="phone" class="label">Phone Number</label>
              <Field id="phone" type="tel" name="phone"  class="form-control" v-model="currentUser.phone" :disabled="!isEditMode"/>
              <ErrorMessage name="phone" class="error-feedback" />
            </div>
          </div>

          <div class="form-row">

            <div class="form-group col-md-6">
              <label for="dateofbirth" class="label">Date Of Birth</label>
              <Field id="dateofbirth" name="dateofbirth" type="date" class="form-control" v-model="currentUser.date_of_birth"  disabled/>
              <ErrorMessage name="dateofbirth" class="error-feedback" />
            </div>
            <div class="form-group col-md-6">
              <label for="personnelid" class="label">Personnel ID</label>
              <Field id="personnelid" name="personnelid" type="text" class="form-control" v-model="currentUser.identification" disabled/>
              <ErrorMessage name="personnelid" class="error-feedback" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="company" class="label">Company</label>
              <Field id="company" type="text" name="company"  class="form-control" v-model="currentUser.company" disabled/>
              <ErrorMessage name="company" class="error-feedback" />
            </div>
            <div class="form-group col-md-6">
              <label for="role" class="label">Role</label>
              <Field id="role" name="role" type="text" class="form-control" v-model="currentUser.roles" disabled/>
              <ErrorMessage name="role" class="error-feedback" />
            </div>

          </div>


        </div>
        <div class="form-row">
          <div class="form-group">
            <button class="btn btn-primary " :disabled="loading" type="button" @click="toggleEditMode">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Edit</span>
            </button>
          </div>
          <div class="form-group">
            <button class="btn btn-primary " :disabled="loading" type="submit"  v-if="isEditMode" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Save</span>
            </button>
          </div>
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
import * as yup from "yup";

export default {
  name: 'Profile',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {

      const schema = yup.object().shape({
        email: yup
            .string()
            .required("name is required!")
        ,
        name: yup
            .string()
            .required("name is required!")
        ,
        surname: yup
            .string()
            .required("surname is required!")
        ,

        phone: yup
            .number()
            .required("Phone number is required!")
        ,

      });
  return {
    schema,
    isEditMode: false,
    successful: false,
    loading: false,
    message: "",

    };



},
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
   
    handleImageChange(event) {
      const file = event.target.files[0];
      // Seçilen dosyayı işleme devam ettirin
      console.log('Seçilen dosya:', file);
    },
    addShadow(event) {
      event.target.classList.add('hover-shadow');
    },
    removeShadow(event) {
      event.target.classList.remove('hover-shadow');
    },
    toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    }, 

  saveData(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log('Veriler kaydedildi');
      this.$store.dispatch("auth/saveProfile", user).then(
          () => {
            this.$router.go("/profile");
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          },
          this.$router.go(0)

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

</style>
