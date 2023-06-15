<template>
    <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}" >
      <div class="form-row">
        <div class="col-md-3">
      <SideBar />
     
    </div>
    <div class="col-md-9">
      <v-container>
       <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
          <v-btn-toggle v-model="toggle_exclusive" tile group color="#f0c62f" >
            <v-btn text>
              <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
            <v-btn text>
              <v-icon>fas fa-arrow-right</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn color="#f0c62f" rounded dark>
              finish sprint
          </v-btn>
       </v-toolbar>
       <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
          <v-toolbar-title>Sprint overview</v-toolbar-title>
          <v-btn color="#f0c62f" text  class="ml-5">
              last sprint
          </v-btn>
       </v-toolbar>
       <v-item-group mandatory class="mt-n4">
        <v-container>
          <v-row justify="center" class="space">
            <v-col
              cols="12"
              md="2"
            >

            </v-col>
             <v-col
              cols="12"
              md="2"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, $router.push('/MyTasks')"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line  class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                           
                            
                              <v-icon class="fas fa-suitcase" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">My Tasks</v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ tasks.length }}</strong>
                          </v-list-item-title>
                          
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  
                </v-card>
              </v-item>
            </v-col>
             <v-col
              cols="12"
              md="2"
            >
              <v-item v-slot="{ active, toggle }">
               <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle, $router.push('/MyTeams')"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line  class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                           
                            <v-icon class="far fa-user" x-large :color="active ? 'white' : '#f0c62f'"></v-icon>

                           
                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">My Teams</v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ tasks.length }}</strong>
                          </v-list-item-title>
                          
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  
                </v-card>
              </v-item>
            </v-col>
             
            
          </v-row>
         
        </v-container>
      </v-item-group>
      <v-row  >
  <v-col cols="12" sm="7" >
    <v-chart class="chart mt-2" :option="option" />
  </v-col>
  <v-col cols="12" md="5" sm="12">
    <v-toolbar color="rgba(0,0,0,0)">
      <v-toolbar-title>Sprint stories</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn rounded small @click="toggle, $router.push('/UserGroups')">
        See All
      </v-btn>
    </v-toolbar>
    <v-simple-table class="table">
      <template v-slot:default>
        <tbody>
          <tr
            v-for="item in orders"
            :key="item.name"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.count }}</td>
            <td><v-icon small>{{ item.icon }}</v-icon></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</v-row>


      </v-container>
    </div>
  </div>
    </v-app>
      
    </template>
    
    <script>
     
      import SideBar from "./SideBar/SideBar.vue";
      import companyService from "@/services/company.service";
      import { use } from "echarts/core";
      import { CanvasRenderer } from "echarts/renderers";
      import { PieChart } from "echarts/charts";
 

    import {
      TitleComponent,
      TooltipComponent,
      LegendComponent
    } from "echarts/components";
    import VChart, { THEME_KEY } from "vue-echarts";
    use([
      CanvasRenderer,
      PieChart,
      TitleComponent,
      TooltipComponent,
      LegendComponent
    ]);
      export default {
        name: 'Home',
      data: () => ({
        toggle_exclusive: 1,
        tasks: [],
        completedTasks: 1,
        activeTasks: 1,
         orders: [
              {
                id: 'Sprint1',
                title: 'Onboarding',
                state: 'Delivered',
                count: 3,
                icon: 'fas fa-ellipsis-h'
              },
               {
                id: 'Sprint2',
                title: 'User profile',
                state: 'Delivered',
                count: 8,
                icon: 'fas fa-ellipsis-h'
              },
              {
                id: 'Sprint3',
                title: 'Landing page',
                state: 'Approved',
                count: 12,
                icon: 'fas fa-ellipsis-h'
              },
              {
                id: 'Sprint4',
                title: 'Settings',
                state: 'Approved',
                count: 9,
                icon: 'fas fa-ellipsis-h'
              },
             
            ],
           
    option: {
            title: {
              text: "Task Report chart",
              left: "left"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
          
            series: [
              {
                name: "My Tasks",
                type: "pie",
                radius: "55%",
                center: ["45%", "50%"],
                data: [
                  { value: 1 , name:"Completed"
                  }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0)"
                  }
                }
              }
            ]
    }
      }),
      computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },

  },
      mounted(){
        companyService.getTasksOfPersonnel(this.currentUser).then(
        (response) => {
          this.tasks = response.data;
          var completed = 0
          var active = 0
          var data = []
          for (let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].status === 1){
             completed++;
            }else{
              active++
            }
          }
          data.push({
            name: "Completed",
            value: completed
          });
          data.push({
            name: "Active",
            value: active
          })
          console.log(this.option.series.data)
          console.log(data)
          this.option.series.data = data
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
        components: {
          SideBar,
          
       VChart
          
        },
        provide: {
        [THEME_KEY]: "yellow"
      },  
      methods: {
   
  },
      }
    </script>
   