<template>
  <div id="app" class="app" >
  <Navbar/>
  <RouterView/>
  
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent/Navbar.vue';
import '@fortawesome/fontawesome-free/css/all.css'


export default {
  name: "Login",
  components: {
    Navbar,

   
  },
};
</script>
<style>
.app{
  background-color: #ffffff;
}
</style>