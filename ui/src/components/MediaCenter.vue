<template>
    <div class="slider-container media">
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
    
</template>

<script>

export default {
 
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
.media{
    display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
