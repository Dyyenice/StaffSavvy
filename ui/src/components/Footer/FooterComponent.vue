<template>
    <footer class="footer">
        <div class="form-row">
  <div class="col">
        <div class="child">
          <h1>Contact info.</h1>
          <v-btn
            icon="fas fa-map-marker-alt"
            color=""
            class="mt-10"
            variant="outlined"
          ></v-btn>
          <br />
          <span class="text-caption">Your Street SYO,yourArea Dream</span>
          <br />
          <v-btn
            icon="fas fa-phone-alt"
            color=""
            class="mt-10"
            variant="outlined"
          ></v-btn>
          <br />
          <span class="text-caption">00235 - 6521</span> <br />
          <span class="text-caption">00235 - 6521</span> <br />
          <div>
            <FontAwesomeIcon class="fas fa-phone-alt"/>
            <v-btn
                color=""
                class="mt-10"
                variant="outlined"
            ></v-btn>
          </div>

          <br />
          <span class="text-caption">staffsavvy@gmail.com</span> <br />
          <span class="text-caption">staffsavvy@gmail.com</span> <br />
        </div>
      </div>
     <div class="col">
        <h1 class="mt-8">Send your message</h1>
        <v-divider></v-divider>
        <span class="text-caption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt fugiat
          officia, odio eaque exercitationem libero nesciunt placeat, repellat
          obcaecati sed tenetur! Est labore aliquam amet consequatur
          necessitatibus fugit obcaecati facilis!
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
import {FontAwesomeIcon} from "@/plugins/font-awesome";
export default {
  
  components: {
    Copyright,
    Field,
    FontAwesomeIcon,
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
