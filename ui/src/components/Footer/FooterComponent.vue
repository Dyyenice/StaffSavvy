<template>
    <footer class="footer">
        <div class="form-row">
  <div class="col">
        <div class="child">
          <h1>Contact info.</h1>
          <v-icon
              class="fas fa-map-marker-alt" x-large :color="active ? 'white' : '#f0c62f'"
          ></v-icon>
          <br />
          <span class="text-caption">The deepest, and the most beautiful location in your heart.</span>
          <br />
          <v-icon
              class="fas fa-phone-alt" x-large :color="active ? 'white' : '#f0c62f'"
          ></v-icon>
          <br />
          <span class="text-caption">00235 - 6521</span> <br />

          <div>

            <v-icon
                class="fas fa-mail-bulk" x-large :color="active ? 'white' : '#f0c62f'"
            ></v-icon>
          </div>
          <span class="text-caption">staffsavvy@gmail.com</span> <br />

        </div>
      </div>
     <div class="col">
        <h1 class="mt-8">Send your message</h1>
        <v-divider></v-divider>
        <span class="text-caption">
          As StaffSavvy group, we care of your feedbacks.
        </span>
        <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email" class="label" >Email</label>
              <Field id="email" name="email" type="text" class="form-control"/>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group col-md-6">
              <label for="phone" class="label">Phone Number</label>
              <Field id="phone" type="tel" name="phone"  class="form-control"/>
              <ErrorMessage name="phone" class="error-feedback" />
            </div>
          </div>
        
        <div class="form-row">
            <label for="message" class="label">Message</label>
            <textarea class="form-group col-md-12 form-control" label for="message" >
            </textarea>
            
          </div>
       
        <button color="#FBDF7E" class="btn btn-primary btn-block">Send Message</button>
   
   </div>
 
</div>

</footer>
<Copyright></Copyright>

</template>
<script>
import Copyright from './Copyright.vue';
import { Field } from 'vee-validate';

export default {
  
  components: {
    Copyright,
    Field,

  },
}
</script>


<style >

.footer {
background-color: rgba(225, 221, 221, 0.528); 
padding: 3.6rem 1.2rem;
align-items: center;
justify-self: center;
}

</style>
