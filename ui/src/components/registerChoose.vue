<template>

  <div class="col-md-12">
    <div class="card card-container-profile">

            <div class="form-group">
              <button class="btn btn-primary " @click="goToCompany" :disabled="loading" type="submit">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Company</span>
              </button>
            </div>
      <div class="form-group">
        <button class="btn btn-primary " @click="goToPersonnel" :disabled="loading" type="button">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Personnel</span>
        </button>
      </div>

      </div>

    </div>


</template>

<script>
export default {
  name: "registerChoose",
  methods: {
    goToCompany(){
      this.$router.push("/companyRegister")
    },
    goToPersonnel(){
      this.$router.push("/register")
    }
  }
}


</script>

<style scoped>

</style>