<template>
<v-app id="inspire"  >
  <div class="col-md-12">
      <div ><label class="labelheader">CHOOSE REGISTER TYPE</label></div>
      <div class="form-row">
    <v-row>
      <v-col cols="6" sm="6">
       <v-item-group mandatory class="form-group">
        <v-item v-slot="{ active, toggle }">
          <v-card
            :color="active ? '#49D9A0' : 'white'"
            class="d-flex align-center rounded-xl"
            dark
            height="200"
            @click="toggle, $router.push('/companyRegister')"
          >
            <v-list-item three-line class="mt-10">
              <v-list-item-content>
                <div class="mb-4">
                  <v-icon class="fa fa-user-plus" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>
                </div>
                <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Company Register</v-list-item-subtitle>
                <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-item>
      </v-item-group>
    </v-col>

    <v-col cols="6" sm="6">
      <v-item-group mandatory class="form-group">
        <v-item v-slot="{ active, toggle }">
          <v-card
            :color="active ? '#49D9A0' : 'white'"
            class="d-flex align-center rounded-xl"
            dark
            height="200"
            @click="toggle, $router.push('/register')"
          >
            <v-list-item three-line class="mt-10">
              <v-list-item-content>
                <div class="mb-4">
                  <v-icon class="fa fa-user-plus" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>
                </div>
                <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Personnel Register</v-list-item-subtitle>
                <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-item>
      </v-item-group>
    </v-col>
  </v-row>
</div>
</div>


  </v-app>
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