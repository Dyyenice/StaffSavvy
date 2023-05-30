<template>

<div class="col-md-12">
  <div class="card card-container-profile"> 
     <Form @submit="saveData" >
        <label class="labelheader">{{currentUser.email}} </label>
        <div v-if="!successful">
          <div class="form-row">
           <div class="form-group col-md-6">
            <label for="name" class="label">Name</label>
            <Field id="name" name="name" type="text" class="form-control" v-model="currentUser.id" />
            <ErrorMessage name="name" class="error-feedback" />
           </div>
           <div class="form-group col-md-6">
            <label for="surname" class="label">Surname</label>
            <Field id="surname" name="surname" type="text" class="form-control" v-model="currentUser.id"/>
            <ErrorMessage name="surname" class="error-feedback" />
           </div>
         </div>
         <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email" class="label" >Email</label>
            <Field id="email" name="email" type="text" class="form-control" v-model="currentUser.email" :disabled="!isEditMode"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group col-md-6">
               <label for="phone" class="label">Phone Number</label>
               <Field id="phone" type="tel" name="phone"  class="form-control" v-model="currentUser.id" :disabled="!isEditMode"/>
               <ErrorMessage name="phone" class="error-feedback" />
          </div>
         </div>
           
         <div class="form-row">
             
          <div class="form-group col-md-6">
            <label for="dateofbirth" class="label">Date Of Birth</label>
            <Field id="dateofbirth" name="dateofbirth" type="text" class="form-control" v-model="currentUser.id"/>
            <ErrorMessage name="dateofbirth" class="error-feedback" />
          </div>
          <div class="form-group col-md-6">
            <label for="personnelid" class="label">Personnel ID</label>
            <Field id="personnelid" name="personnelid" type="text" class="form-control" v-model="currentUser.id" />
            <ErrorMessage name="personnelid" class="error-feedback" />
          </div>
         </div>
         <div class="form-row">
             <div class="form-group col-md-6">
               <label for="company" class="label">Company</label>
               <Field id="company" type="text" name="company"  class="form-control" v-model="currentUser.id" />
               <ErrorMessage name="company" class="error-feedback" />
             </div>
          <div class="form-group col-md-6">
            <label for="role" class="label">Role</label>
            <Field id="role" name="role" type="text" class="form-control" v-model="currentUser.id" />
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
             <button class="btn btn-primary " :disabled="loading" type="submit"  v-if="isEditMode">
             <span v-show="loading" class="spinner-border spinner-border-sm"></span>
             <span>Save</span>
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

export default {
  name: 'Profile',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    
  return {
    form: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      dateofbirth:'',
      personnelid:'',
      company:'',
      role:'',
    
    },
    isEditMode: false
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
      this.isEditMode = false;
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
      this.$store.dispatch("auth/profile", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          this.isEditMode = false,
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
