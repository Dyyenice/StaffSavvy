<template>
     <v-app id="inspire"  >
      
       
      <h1 class="userguide">StaffSavvy User Guide</h1>
    
    <div class="form-row">
      <v-container>
       <v-item-group mandatory class="form-group">
       
            <v-col
              cols="12"
              sm="12"
            >
              <v-item v-slot="{ active, toggle }" > 
               <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, $router.push('/registerChoose')"
                
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line  class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                           
                            <v-icon class="fa fa-user-plus" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>
                           
                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Sign Up</v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'" >
                           
                            
                           
                          </v-list-item-title>
                           <h2>In order to use StaffSavvy, you must first register. Select 'Company' if you are going to register as a company, or 'Personnel' if you are registering as an Employee.</h2>
                         
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  
                </v-card>
              </v-item>
            </v-col>



             <v-col
              cols="12"
              md="12"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, $router.push('/login')"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line  class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                           
                            
                              <v-icon class="fa fa-sign-in" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Sign In</v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong></strong>
                          </v-list-item-title>
                          <h2>Log in to your account to use StaffSavvy.</h2>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  
                </v-card>
              </v-item>
            </v-col>
             <v-col
              cols="12"
              md="12"
            >
              <v-item v-slot="{ active, toggle }">
               <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, $router.push('/login')"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line  class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                           
                            <v-icon class="far fa-user" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                           
                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Your Profile</v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong></strong>
                          </v-list-item-title>
                          <h2>After logging in, you will access your Profile page. You can view and edit your personal information on this page.</h2>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  
                </v-card>
              </v-item>
            </v-col>
             
            
         
       
       </v-item-group>


       <v-item-group mandatory class="form-group">
       
       <v-col
         cols="12"
         sm="12"
       >
         <v-item v-slot="{ active, toggle }" > 
          <v-card
             :color="active ? '#49D9A0' : 'white'"
             class="d-flex align-center rounded-xl"
             dark
             height="200"
             @click="toggle, $router.push('/home')"
           
           >
             <v-row>
               <v-col cols="12" sm="12">
                 <v-list-item three-line  class="mt-10">
                   <v-list-item-content>
                     <div class="mb-4">
                      
                       <v-icon class="fas fa-home" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>
                      
                     </div>
                     <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Your Home Page</v-list-item-subtitle>
                     <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'" >
                      
                     </v-list-item-title>
                     <h2 >If you are not logged in, you can access the guides on how to use our website and the Contacts section on the homepage. If you are logged in, you can view your current tasks, completed tasks and teams on the cards in the middle of your homepage. At the bottom, there are the task completion percentages and notes. You can use the other features you want with the Bar on the left.</h2>
                   </v-list-item-content>
                 </v-list-item>
               </v-col>
             </v-row>
             
           </v-card>
         </v-item>
       </v-col>



        <v-col
         cols="12"
         md="12"
       >
         <v-item v-slot="{ active, toggle }">
           <v-card
             :color="active ? '#49D9A0' : 'white'"
             class="d-flex align-center rounded-xl"
             dark
             height="200"
             @click="toggle, $router.push('/home')"
           >
             <v-row>
               <v-col cols="12" sm="12">
                 <v-list-item three-line  class="mt-10">
                   <v-list-item-content>
                     <div class="mb-4">
                      
                       
                         <v-icon class="fas fa-suitcase" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                     </div>
                     <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Admin Guide</v-list-item-subtitle>
                     <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                      
                     </v-list-item-title>
                     <h2> For admins; Admins can access task creation, assignment, team creation, personnel approval and viewing processes from the buttons in this bar. When a staff member working in your company becomes a new member, they will fall into the 'PendingPersonnels' section and you can confirm the membership of your employees from this page. Admins can create and join multiple teams. As an admin, you can add, delete and edit job postings from the job postings page from the bar at the top. You can add, delete and edit event news in the same way from the Event page.</h2>
                   </v-list-item-content>
                 </v-list-item>
               </v-col>
             </v-row>
             
           </v-card>
         </v-item>
       </v-col>
        <v-col
         cols="12"
         md="12"
       >
         <v-item v-slot="{ active, toggle }">
          <v-card
             :color="active ? '#49D9A0' : 'white'"
             class="d-flex align-center rounded-xl"
             dark
             height="200"
             @click="toggle, $router.push('/home')"
           >
             <v-row>
               <v-col cols="12" sm="12">
                 <v-list-item three-line  class="mt-10">
                   <v-list-item-content>
                     <div class="mb-4">
                      
                       <v-icon class="far fa-user" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                      
                     </div>
                     <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">User Guide</v-list-item-subtitle>
                     <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                       
                     </v-list-item-title>
                     <h2>For Users; Viewing their tasks, viewing reports, viewing job postings and events, and requesting leave requests can be accessed from the homepage. You can access the 'Permission&Requests' page from the bar on the left and forward your request to the person you want. As a user, you can follow the job postings on the job postings page from the bar above, and the event news on the Event page.</h2>
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
     


  export default {
    name: 'Home',
  data: () => ({
    toggle_exclusive: 1,
  
    
       

  }),
  
  
    
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
  