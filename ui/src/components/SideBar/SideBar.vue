<template> 

<div class="container">
  <div v-if="currentUser">
    <div v-if="currentUser.roles == 'ROLE_USER'">
      <div class="sidebar">
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/PermissionRequest')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Permission & Request</span>
        </button>
       
      </div>
  </div>
  <div v-if="currentUser.user_type === 1">
      <div class="sidebar">
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/CompanyPersonnels')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Personnels</span>
        </button>
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/PendingPersonnels')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Pending Personnels</span>
        </button>
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/createTask')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create Task</span>
        </button>
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/createUserGroup')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>CreateUserGroup</span>
        </button>
        <button class="sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/giveTask')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Give Task</span>
        </button>
       
      </div>
  </div>
  </div>
</div>

    
</template>

<script>
  export default {
    data: () => ({ 
         selectedItem: 0,
        drawer: null,
        items: [
            {icon: 'fas fa-plus'},
            {icon: 'fas fa-th-large'},
            {icon: 'fas fa-align-center'},
            {icon: 'fab fa-gitter'},
            {icon: 'fas fa-chart-line'},
        ],
     }),
     computed: {

currentUser() {
  return this.$store.state.auth.user;
}
},
  }
</script>
<style>
.border  {
   margin-left: 12px;
   margin-right: 12px;
    background: #49D9A0 ;
    border-radius: 50%;
    text-decoration: none;
    
}
.v-list-item-group .v-list-item--active {
    color: white !important;
}
.sidebar {
  width: 200px;
  background-color: #f2f2f2;
  padding: 10px;
  height: 100%;
  position: absolute;
}

.sidebar-button {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 50%;
  border: none;
  background-color: #e0e0e0;
  text-align: left;
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: #ccc;
}

</style>