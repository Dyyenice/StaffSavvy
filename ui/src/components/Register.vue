<template>
  <div class="col-md-12">
    <div class="card card-container">
      <input type="file" id="profile-image-input" style="display: none" @change="handleImageChange" />
    <label for="profile-image-input">
      <div class="profile-img-wrapper">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
          @mouseover="addShadow"
          @mouseout="removeShadow"
        />
      </div>
    </label>
<<<<<<< HEAD
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <Field id="name" name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group col-md-6">
            <label for="surname">Surname</label>
            <Field id="surname" name="surname" type="text" class="form-control" />
            <ErrorMessage name="surname" class="error-feedback" />
          </div>
         </div>
         <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <Field id="email" name="email" type="text" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
<<<<<<< HEAD
          <div class="form-group col-md-6">
            <label for="password">Password</label>
            <Field id="password" name="password" type="text" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
         </div>
         <div class="form-row">
          <div class="form-group col-md-6">
            <label for="phone">Phone Number</label>
            <input id="phone" type="tel" name="phone" ref="phoneInput" class="form-control" :value="defaultCountryCode" @input="handleInputChange"/>
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="form-group col-md-6">
            <label for="company">Company</label>
            <Field id="company" name="company" type="text" class="form-control" />
            <ErrorMessage name="company" class="error-feedback" />
          </div>

          
         </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
=======
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="phone">Phone Number</label>
               <Field id="phone" type="tel" name="phone"  class="form-control" />
               <ErrorMessage name="phone" class="error-feedback" />
             </div>
          <div class="form-group col-md-6">
            <label for="password">Password</label>
            <Field id="password" name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
         </div>




         </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block"  :disabled="loading">
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

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
<<<<<<< HEAD
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils';
=======
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("name is required!")
<<<<<<< HEAD
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
      surname: yup
          .string()
          .required("surname is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),    
=======
          ,
      surname: yup
          .string()
          .required("surname is required!")
          ,
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
<<<<<<< HEAD
=======
      phone: yup
          .number()
          .required("Phone number is required!")
          ,
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
<<<<<<< HEAD
      phonenumber: yup
          .number("Phone number is required!")
          .required("Phone number is required!")
          //.phonenumber("Phone number is invalid!")
          .max(10, "Must be maximum 10 characters!"),
      company: yup
          .string()
          .required("Company Name is required!")
          .min(2, "Must be at least 2 characters!")
          .max(40, "Must be maximum 40 characters!"),
=======


>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    });
  
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
<<<<<<< HEAD
      phoneInput: null,
      defaultCountryCode: '+90',
=======

      defaultCountryCode: '+90',

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
<<<<<<< HEAD
    const phoneInputField = this.$refs.phoneInput;
    const inputOptions = {
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      separateDialCode: true,
      initialCountry: 'auto',
      preferredCountries: ['us', 'gb', 'de', 'fr'] // Add your preferred countries here
    };
    const phoneInput = intlTelInput(phoneInputField, inputOptions);

    // Store the intlTelInput instance for later use
    this.$data.phoneInput = phoneInput;
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
<<<<<<< HEAD

=======
      console.log("asdasd")
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
      this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
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
          }
      );
    },
<<<<<<< HEAD
    handleInputChange() {
      // Access the selected country code using the `getSelectedCountryData` method
      const selectedCountryData = this.phoneInput.getSelectedCountryData();
      const selectedCountryCode = selectedCountryData.dialCode;
      console.log('Selected Country Code:', selectedCountryCode);
    },
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
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
  },
};

</script>
<style scoped>
 .card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #E3EAF9; 
    position: relative; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    
  }
  
  .card-container {
    width: 80%;
    max-width: 500px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

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
