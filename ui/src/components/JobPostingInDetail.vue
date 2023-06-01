
<template>
<head>
  <title>Job Posting Detail</title>

</head>

  <div class="container">
    <h1>Job Posting Detail</h1>
    <div class="job-info">
      <p class="label">Job Title:</p>
      <p>Software Engineer</p>
    </div>
    <div class="job-info">
      <p class="label">Company:</p>
      <p>ABC Company</p>
    </div>
    <div class="job-info">
      <p class="label">Location:</p>
      <p>New York, NY</p>
    </div>
    <div class="job-info">
      <p class="label">Description:</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam tellus id fringilla luctus. Fusce vitae bibendum leo. Morbi interdum, mauris eget lobortis sagittis, arcu mi posuere velit, eget faucibus risus purus ac lorem.</p>
    </div>
    <div class="job-info">
      <p class="label">Requirements:</p>
      <ul>
        <li>Bachelor's degree in Computer Science or related field</li>
        <li>2+ years of experience in software development</li>
        <li>Strong knowledge of HTML, CSS, and JavaScript</li>
      </ul>
    </div>
    <div class="job-info">
      <p class="label">Benefits:</p>
      <ul>
        <li>Competitive salary</li>
        <li>Health insurance</li>
        <li>Flexible working hours</li>
      </ul>
    </div>
    <div class="job-info">
      <p class="label">Apply for this role:</p>
      <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Apply with my profile</span>
          </button>
    </div>
  </div>

   <FooterComponent></FooterComponent>
</template>

<script>
import FooterComponent from './Footer/FooterComponent.vue';

export default{
    name:'jobpostingdetail',
  components:{
    FooterComponent,
   },

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
      text-align: center;
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