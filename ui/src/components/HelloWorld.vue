<template>
    <div class="hello">
      <h1>Happy counting!</h1>
      <p style="font-size:40px">{{count}} </p>
    </div>
  </template>

  <script>
  import axios from 'axios'
  export default {
    data: ()=> {
     return{ count:0
     }
    },
    mounted:  async function () {
      await this.loadCount();
    },
    methods:{
      loadCount:  async function () {
        let result= await axios.post(`${process.env.VUE_APP_APIURL}/count`);
        this.count=result.data.changed;
        setTimeout(this.loadCount,3000);
      }
    }
  }
  </script>
