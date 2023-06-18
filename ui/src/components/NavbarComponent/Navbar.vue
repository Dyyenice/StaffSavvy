<template>

      <nav class="navbar navbar-expand ">
      <a href="/home" class="navbar-brand nav-link">StaffSavvy</a>
      <div class="navbar-nav mr-auto" >
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon  /> Home
          </router-link>
        </li>

        <div v-if="!currentUser">
        <li class="nav-item">
            <router-link to="/aboutus" class="nav-link">
            <font-awesome-icon  /> About Us
          </router-link>
        </li>
        </div>
        <div v-if="!currentUser">
        <li class="nav-item">
            <router-link to="/jobPostings" class="nav-link">
            <font-awesome-icon  /> Job Postings
          </router-link>
        </li>
        </div>
        <li class="nav-item">
            <router-link to="/mediacenter" class="nav-link">
            <font-awesome-icon  /> Media Center
            </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/UserGuide" class="nav-link">
            <font-awesome-icon  /> User Guide
            </router-link>
        </li>
        <li class="nav-item" v-if="currentUser">
            <router-link to="/Events" class="nav-link">
            <font-awesome-icon  /> Events
            </router-link>
        </li>
        <li class="nav-item" v-if="currentUser">
          <router-link to="/insertToken" class="nav-link">
            <font-awesome-icon  /> Insert Token
          </router-link>
        </li>

        
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        
        <li class="nav-item">
          <router-link to="/registerChoose" class="nav-link">
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
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

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
  background-color: black;
}
.nav-link{
  color: #fbdf7e;
}
.mr-auto{
  margin: auto;
}

</style>