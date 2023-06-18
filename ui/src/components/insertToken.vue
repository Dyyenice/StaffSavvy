<template>
  <div class="background-img"></div>
  <div class="col-md-12">
    <div class="card card-container">
      <label class="labelheader">COMPANY TOKEN</label>
      <Form @submit="handleToken" :validation-schema="schema" v-if="!message">
        <div class="form-group">
          <label for="token" class="label">Company Token</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <Field
                id="token"
                name="token"
                type="text"
                class="form-control"
                placeholder="Enter Company Token"
            />
          </div>
          <ErrorMessage name="token" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Register To Company</span>
          </button>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/style.css";
import AuthService from "@/services/auth.service";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      token: yup.string().required("Token is required!"),
    });

    return {
      successful: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    handleToken(data) {
      if(this.currentUser.company === null){
        AuthService.insertToken(data, this.currentUser).then(
            (response) =>{
              this.successful = true
              this.message = response.data;

            },
            (error) =>{
              this.message =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.successful = false;
            }
        )
      }else{
        this.message = "You are already registered to a company"
      }

    },
  },
};
</script>
