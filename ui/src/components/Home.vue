<template>
  <div>
    <div class="slider-container">
      <transition-group name="fade" tag="div" class="slider" mode="out-in">
        <div v-for="(slide, index) in slides" :key="index" v-show="currentSlideIndex === index">
          <img :src="slide.image" :alt="slide.caption" class="slide-image">
          <div class="text-caption">{{ slide.caption }}</div>
          <div class="slider-controls">
      <button class="slider-arrow" @click="previousSlide"><i class="fa fa-chevron-left"></i></button>
      <div class="slider-dots">
        <button v-for="(image, index) in images" :key="index" @click="changeSlide(index)" :class="{ 'active': currentSlide === index }" class="slider-dot"></button>
      </div>
      <button class="slider-arrow" @click="nextSlide"><i class="fa fa-chevron-right"></i></button>
    </div>
        </div>
      </transition-group>
    </div>

    <div class="dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: currentSlideIndex === index }"
        @click="changeSlide(index)"
      ></span>
    </div>

    <!-- Hakkımızda bölümü -->
    <v-container>
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim tellus eu lacus ultrices, vel auctor dui iaculis. Sed semper massa ut ultrices malesuada. Aenean ac orci ac ipsum congue lobortis. Sed tincidunt ligula ut scelerisque cursus. Nam eget nisl semper, ullamcorper lectus vitae, fringilla est. Proin dignissim, urna sed ullamcorper interdum, mi lectus blandit velit, vitae tincidunt lectus lectus a nulla. Duis varius tortor ut sapien tempus eleifend. Sed nec ligula ut nunc gravida lobortis vitae sit amet nunc. Nam hendrerit urna sit amet sem lacinia, id malesuada erat ultrices.</p>
      <p>Etiam id neque ligula. Suspendisse et mauris id augue convallis semper. Integer sed sagittis dolor, at condimentum odio. Fusce a purus eget felis consectetur dapibus. Nam id ultrices enim. Sed porttitor, lacus ut facilisis malesuada, leo risus varius turpis, in feugiat quam nulla id nulla. Pellentesque quis eros eros. Ut eu fringilla arcu. Sed a ex nec risus iaculis dignissim.</p>
    </v-container>
  </div>
  <div class="container container--full category">
    <h2 class="category__title">What you can <span>do</span> with <span>StaffSavvy</span></h2>
     <div class="form-row">
     <StepsListComponent></StepsListComponent>
     <StepsListComponent></StepsListComponent>
     <StepsListComponent></StepsListComponent>
     </div>

  </div>
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
          <v-btn
            icon="fas fa-envelope"
            color=""
            class="mt-10"
            variant="outlined"
          ></v-btn>
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
            <textarea class="form-group col-md-12" label for="message" >
            </textarea>
            
          </div>
       
        <button color="#FBDF7E" class="mt-2">Submit Now</button>
   
   </div>
 
</div>

</template>


<script>
import UserService from "../services/user.service";
import { Field } from "vee-validate";
import './css/home.css';
import StepsListComponent from "./Steps/StepsListComponent.vue";

export default {
  name: "Home",
  components: {
    StepsListComponent,
    Field,

  },
  data() {
    return {
      slides: [
        {
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          caption: 'Slide 1',
        },
        {
          image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
          caption: 'Slide 2',
        },
        {
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
          caption: 'Slide 3',
        },
      ],
      currentSlideIndex: 0,
    };
  },
  mounted() {
    this.startSlideShow();
    UserService.getPublicContent().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
  methods: {
    startSlideShow() {
      setInterval(() => {
        this.nextSlide();
      }, 6000);
    },
    previousSlide() {
      if (this.currentSlideIndex === 0) {
        this.currentSlideIndex = this.slides.length - 1;
      } else {
        this.currentSlideIndex--;
      }
    },
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    },
    changeSlide(index) {
      this.currentSlideIndex = index;
    },
  },
};
</script>

<style>
.col{
  position: relative; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px;
  padding: 30px;
}
</style>