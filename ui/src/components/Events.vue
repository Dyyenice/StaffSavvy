<template>
    <v-app id="inspire"  >
      <div class="col-md-12">
          <div ><label class="labelheader">EVENTS</label></div>
        <v-row>
          <v-col cols="8" md="10">
           <v-item-group mandatory class="form-group">
            <v-item v-for="event in events" :key="event.id" v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#49D9A0' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="400"
                @click="toggle, EventsDetails(event)"
              >
                <v-list-item three-line class="mt-n4">
                  <v-list-item-content>
                    
                    <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'"></v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                    <h2>{{ event.name }}</h2>
                      <img src="../assets/img/indir.png" alt="Image"/>
                    </v-list-item-title>
                    
                    
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-item>
          </v-item-group>
        </v-col>
      </v-row>
    </div>
      </v-app>
    </template>
  
  <script>
    import CompanyService from "@/services/company.service";


 export default {
  
   name: 'Event',
   components: {
  },
 data: () => ({
   toggle_exclusive: 1,
   message: "",
   events: [],
 }),
 computed:{
  currentUser() {
      return this.$store.state.auth.user;
    },

 },

  mounted(){
    CompanyService.getEvents(this.currentUser).then(
        (response) => {
          this.events = response.data;
          console.log(this.events);
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
    EventsDetails(event){
    localStorage.setItem("selectedEvent", JSON.stringify(event));
    console.log(JSON.parse(localStorage.getItem("selectedEvent")));
    this.$router.push("/EventsDetail");
  },
    displayImage(data){
      const byteArray = new Uint8Array(data);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    }

  }
   
 }
</script>
  
  <style scoped>
  .event-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f1f1f1;
  }
  
  .event-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .event-card {
    width: 300px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .event-photo {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .event-details {
    padding: 16px;
  }
  
  .event-title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  
  .event-description {
    margin-top: 8px;
  }
  
  .save-button {
    display: block;
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #4285f4;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  