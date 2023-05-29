<template>
<<<<<<< HEAD
    <div class="background-img"></div> 
    <div class="col-md-12">
      <div class="card card-container">
        <label class="labelheader">CHANGE PASSWORD</label>
        <Form @submit="handleChangePassword" :validation-schema="schema">
          <div class="form-group">
            <label for="email" class="label">E-mail</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <Field
                id="email"
                name="email"
                type="text"
                class="form-control"
                placeholder="Enter your E-mail"
              />
            </div>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password" class="label">Password</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fas fa-lock"></i>
                </div>
              </div>
              <Field
                id="password"
                name="password"
                type="password"
                class="form-control"
                placeholder="Enter your password"
              />
            </div>
            <ErrorMessage name="password" class="error-feedback" />
          </div>
  
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Change </span>
            </button>
          </div>
  
  
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
    
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "./css/style.css";
  import axios from "axios";
  export default {
    name: "ChangePassword",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        email: yup.string().required("Email is required!"),
        password: yup.string().required("Password is required!"),
      });
  
      return {
        loading: false,
        message: "",
        schema,
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    created() {
      if (this.loggedIn) {
        this.$router.push("/profile");
      }
    },
    methods: {
        handleChangePassword() {
  
        const { email, password } = this.form;

        axios
        .post("/api/change-password", { email, password })
        .then(() => {
        this.message = "Your password has been changed successfully.";
        this.$router.push("/login");
    })
    .catch((error) => {
      this.message = error.response.data.message || "An error occurred.";
    });
    },
  },
  };


  </script>
  
=======
    <div>
        <text>Selam</text>
    </div>
</template>
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
