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
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";


export default {
  name: "RegisterCompany",
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
      username: yup
          .string()
          .required("surname is required!")
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
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }

  },
  methods: {
    handleRegister(company) {

      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/registercompany", company).then(
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
