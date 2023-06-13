<template> 

<div class="container">
  <div v-if="currentUser">
    <div v-if="currentUser.user_type === 0">
      <div class="sidebar">
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/PermissionRequest')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Permission & Request</span>
        </button>
       
      </div>
  </div>
  <div v-if="currentUser.user_type === 1">
      <div class="sidebar">
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/CompanyPersonnels')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Personnels</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/PendingPersonnels')" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Pending Personnels</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/createTask')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create Task</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/createUserGroup')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create Team</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/giveTask')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Give Task</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/companyRolegroups')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Company Role Groups</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/createRolegroup')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create Role Group</span>
        </button>
        <button class="btn btn-primary sidebar-button" :disabled="loading" type="submit" @click="this.$router.push('/giveRolegroup')" >
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Give Role Group</span>
        </button>
       
      </div>
  </div>
  </div>
</div>

    
</template>

<script>
  export default {
 
     computed: {

currentUser() {
  return this.$store.state.auth.user;
}
},
  }
</script>
<style>



.sidebar {
  width: 200px;
  background-color: #000000;
  padding: 10px;
  position: absolute; 
  left: 0; 
  top: 0; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  height: 100vb;
}


.sidebar-button {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 17%;
  border: none;
  
  text-align: left;
  cursor: pointer;

  
  background-color: #f0c62f;
    
}

.sidebar-button:hover {
  background-color: #ccc;
}

</style>