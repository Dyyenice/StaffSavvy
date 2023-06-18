<template>
  <div class="col-md-12">
    <div class="card card-container-register">
      <label class="labelheader">PERSONNEL SIGN UP</label>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name" class="label">Name</label>
            <Field id="name" name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group col-md-6">
            <label for="surname" class="label">Surname</label>
            <Field id="surname" name="surname" type="text" class="form-control" />
            <ErrorMessage name="surname" class="error-feedback" />
          </div>
         </div>
         <div class="form-row">
          <div class="form-group col-md-12">
            <label for="email" class="label" >Email</label>
            <Field id="email" name="email" type="text" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
         </div>
          <div class="form-row">
              <div class="form-group col-md-12">
              <label for="password" class="label">Password</label>
              <Field id="password" name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
          </div>
           <div class="form-row">
             <div class="form-group col-md-6">
               <label for="phone" class="label">Phone Number</label>
               <Field id="phone" type="tel" name="phone"  class="form-control" />
               <ErrorMessage name="phone" class="error-feedback" />
             </div>
             <div class="form-group col-md-6">
               <label for="date_of_birth" class="label">Date of Birth</label>
               <Field id="date_of_birth" type="date" name="date_of_birth" :max="maxDate"  class="form-control" />
               <ErrorMessage name="date_of_birth" class="error-feedback" />
             </div>
         </div>
           <div class="form-row">
             <div class="form-group col-md-12">
               <label for="identification" class="label">Identification</label>
               <Field id="identification" type="text" name="identification"  class="form-control" />
               <ErrorMessage name="identification" class="error-feedback" />
             </div>
           </div>


       <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Sign Up</span>
          </button>
        </div>
        </div>
        <div class="form-group text-align" >
        <router-link to="/login" >Already have an account? Sign in. </router-link>
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
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
import moment from 'moment'

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
          ,
      surname: yup
          .string()
          .required("surname is required!")
          ,
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      phone: yup
          .number().test('len', 'Must be exactly 10 characters without starting with 0', val => val && val.toString().length === 10 )
          .required("Phone number is required!")
          ,
      date_of_birth: yup
          .date()
          .required("Date of Birth is required!")
      ,
      identification: yup
          .number().test('len', 'Must be exactly 11 characters', val => val && val.toString().length === 11 )
          .required("Identification is required!")

      ,
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),


    });
  
    return {
      successful: false,
      loading: false,
      message: "",
      schema,

      defaultCountryCode: '+90',

    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    maxDate()
    {
      console.log(moment().format('YYYY-MM-DD'))
      return moment().subtract(18, 'years').format('YYYY-MM-DD')
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }

  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log("asdasd")
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
            this.$router.go("/register")
          }
      );
    },

  },
};

</script>
<style scoped>
 .card {
    background-color: #fff;
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


</style>
