<template>
<<<<<<< HEAD
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
}
</script>
=======
  <div id="app">
    <nav class="navbar navbar-expand ">
      <a href="/" class="navbar-brand nav-link">StaffSavvy</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link">
            <font-awesome-icon  /> About Us
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <font-awesome-icon  /> User Guide
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    
    <div class="container container--full">
      <div class="copyright">
        <p>
          Copyright © 2023. All Rights Represented by <span>StaffSavvy</span>.
        </p>
      </div>
      <router-view />
    </div>
  </div>
  
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.navbar-expand{
  background-color: #E3EAF9;
}
.nav-link{
  color: #065F9F;
}
.container--full .copyright {
  background-color:#065F9F;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: #E3EAF9;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: 1rem;
}
</style>
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
