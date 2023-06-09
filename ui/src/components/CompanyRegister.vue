<template>
  <div class="col-md-12">
    <div class="card card-container-register">
      <label class="labelheader">COMPANY SIGN UP</label>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">

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
            <div class="form-group col-md-12">
              <label for="name" class="label">Company Name</label>
              <Field id="name" type="text" name="name"  class="form-control" />
              <ErrorMessage name="name" class="error-feedback" />
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


export default {
  name: "CompanyRegister",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),

      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),

      name: yup
          .string()

    });

    return {
      successful: false,
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
      this.$store.dispatch("auth/registerCompany", user).then(
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
