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

    <div class="head">
    <v-container style="position:relative" >
      <h2 class="labelheader text">About Us</h2>
      <p class="label text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim tellus eu lacus ultrices, vel auctor dui iaculis. Sed semper massa ut ultrices malesuada. Aenean ac orci ac ipsum congue lobortis. Sed tincidunt ligula ut scelerisque cursus. Nam eget nisl semper, ullamcorper lectus vitae, fringilla est. Proin dignissim, urna sed ullamcorper interdum, mi lectus blandit velit, vitae tincidunt lectus lectus a nulla. Duis varius tortor ut sapien tempus eleifend. Sed nec ligula ut nunc gravida lobortis vitae sit amet nunc. Nam hendrerit urna sit amet sem lacinia, id malesuada erat ultrices.</p>
      <p class="label text">Etiam id neque ligula. Suspendisse et mauris id augue convallis semper. Integer sed sagittis dolor, at condimentum odio. Fusce a purus eget felis consectetur dapibus. Nam id ultrices enim. Sed porttitor, lacus ut facilisis malesuada, leo risus varius turpis, in feugiat quam nulla id nulla. Pellentesque quis eros eros. Ut eu fringilla arcu. Sed a ex nec risus iaculis dignissim.</p>
    </v-container>
    </div>
  </div>
  
  
  
  <div class="container container--full category">
    <h2 class="category__title">What you can do with StaffSavvy</h2>
     <div class="form-row">
     <StepsListComponent></StepsListComponent>
     </div>
    
     
    
  </div>
  <FooterComponent></FooterComponent>

</template>


<script>
import UserService from "../services/user.service";
import FooterComponent from "./Footer/FooterComponent.vue";
import './css/home.css';
import StepsListComponent from "./Steps/StepsListComponent.vue";

export default {
  name: "Home",
  components: {
    StepsListComponent,
    FooterComponent,

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
      
        this.nextSlide();
      
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
.v-container {
  padding: 16px 0 16px 0;
 
}
.head {
  position: relative;
  text-align: center;
  padding: 12px;
  margin-bottom: 6px;
  height: 400px;
  width: 100%;
  color: white;
 
  
}
.head:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 120%;
  width: 50%;
  background: black;
  transform: skew(0deg, 6deg);
}
.head:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 120%;
  width: 50%;
  background: black;
  transform: skew(0deg, -6deg);
  
  
}
.egg {
  display: block;
  margin-left: 100px;
  margin-top: 50px;
  width: 356px;
  height: 300px;
  background-color: #fbdf7e;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;

}
.text{
  position: relative;
  z-index: 9999;
  top: 0;
  right: 0;
  padding: 20px;
}
</style>