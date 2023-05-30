<template>
  <div id="app">
  <Navbar/>
  <RouterView/>
  
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent/Navbar.vue';


export default {
  name: "Login",
  components: {
    Navbar,
   
  },
};
</script>