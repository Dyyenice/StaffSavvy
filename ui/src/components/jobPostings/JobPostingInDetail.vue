
<template>
<head>
  <title>Job Posting Detail</title>

</head>

  <div class="container">
    <h1>Job Posting Detail</h1>
    <div class="job-info">
      <p class="label">Job Title:</p>
      <p>{{ selectedJobPosting.jobposting.jobtitle }}</p>
    </div>
    <div class="job-info">
      <p class="label">Company:</p>
      <p>{{ selectedJobPosting.companyname }}</p>
    </div>
    <div class="job-info">
      <p class="label">Location:</p>
      <p>{{ selectedJobPosting.jobposting.location }}</p>
    </div>
    <div class="job-info">
      <p class="label">Description:</p>
      <p>{{ selectedJobPosting.jobposting.description }}</p>
    </div>
    <div class="job-info">
      <p class="label">Requirements:</p>
      <ul>
        <li>{{ selectedJobPosting.jobposting.requirements }}</li>

      </ul>
    </div>
    <div class="job-info">
      <p class="label">Benefits:</p>
      <ul>
        <li>{{ selectedJobPosting.jobposting.benefits }}</li>

      </ul>
    </div>
    <div class="job-info">
      <p class="label">Apply for this role:</p>
      <p>{{ selectedJobPosting.email }}</p>
    </div>
  </div>

   <FooterComponent></FooterComponent>
</template>

<script>
import FooterComponent from '../Footer/FooterComponent.vue';

export default{
    name:'jobpostingdetail',
  components:{
    FooterComponent,
   },



  computed: {
    selectedJobPosting(){
      return JSON.parse(localStorage.getItem("selectedJobPosting"))
    }
  }




};
</script>
<style>

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 10px;

    }
    p {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .job-info {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
    }

</style>