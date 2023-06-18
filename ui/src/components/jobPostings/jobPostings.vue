<template>
  <v-app id="inspire"  >


    <div><label class="labelheader">JOB POSTINGS</label></div>


    <div v-if="!message" class="form-row">
      <v-container>
        <v-item-group mandatory class="form-group">

          <v-col
              cols="12"
              sm="12"
              v-for="jobposting in jobpostings" :key="jobposting.id"
          >

            <v-item  v-slot="{ active, toggle }" >
              <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, JobPostingInDetails(jobposting)"

              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line  class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">

                          <v-icon class="fas fa-suitcase" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                        </div>
                        <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'"></v-list-item-subtitle>
                        <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'" >
                          <h2>{{ jobposting.jobposting.jobtitle }}</h2>


                        </v-list-item-title>
                        <h2>{{ jobposting.companyname }}</h2>

                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>

              </v-card>
            </v-item>
          </v-col>

        </v-item-group>
      </v-container>


    </div>

  </v-app>
</template>

<script>
import UserService from "@/services/public.service";


export default {

  name: 'JobPosting',
  components: {
  },
  data: () => ({
    toggle_exclusive: 1,
    message: "",
    jobpostings: [],
  }),
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },

  },

  mounted(){
    UserService.getJobPotsings().then(
        (response) => {
          this.jobpostings = response.data;
          console.log(this.jobpostings)
        },
        (error) => {
          this.message = (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );

  },
  methods: {
    JobPostingInDetails(jobposting){
      localStorage.setItem("selectedJobPosting", JSON.stringify(jobposting));
      console.log(JSON.parse(localStorage.getItem("selectedJobPosting")));
      this.$router.push("/jobpostingdetail");
    }
  }

}
</script>
<style>


.egg {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  width: 356px;
  height: 300px;
  background-color: #fbdf7e;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.egg-content {
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #333;
}
.userguide{
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  color: #fbdf7e;
  padding: 5%;
}
</style>
