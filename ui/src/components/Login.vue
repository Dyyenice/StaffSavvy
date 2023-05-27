<template>
  <div class="background-img"></div> 
  <div class="col-md-12">
    <div class="card card-container">
      <label class="labelLogin">LOGIN</label>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username" class="label">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <Field
              id="username"
              name="username"
              type="text"
              class="form-control"
              placeholder="Enter your username"
            />
          </div>
          <ErrorMessage name="username" class="error-feedback" />
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
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
        <router-link to="/forgotpassword" >Forgot Password? </router-link>
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

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
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
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.card-container {
  position: relative; 
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 360px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #E3EAF9; 
  height: 400px;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient( #4165f14d, #4165f14d),
      url("https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  z-index: -1;
}


.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  color: #065F9F;
}
.labelLogin {
  font-weight: bold;
  font-size: 2rem;
  color: #065F9F;
  margin-block-end: 5%;
}

.input-group-text {
  background-color: transparent;
  border: none;
}

.input-group-text i {
  color: #ccc;
}

.btn-block {
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-block-start: 20%;
  margin-left: 25%;
  background-color: #065F9F;
  
}

.error-feedback {
  color: red;
  font-size: 0.8em;
}

.alert {
  margin-bottom: 0;
}

</style>
