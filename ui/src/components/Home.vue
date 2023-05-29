<template>
<<<<<<< HEAD
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item active">
      <img src="la.jpg" alt="Los Angeles">
    </div>

    <div class="item">
      <img src="chicago.jpg" alt="Chicago">
    </div>

    <div class="item">
      <img src="ny.jpg" alt="New York">
    </div>
  </div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<FooterComponent></FooterComponent>
=======
  <div>
    <h1>Başvuran Şirketler</h1>
    <table>
      <thead>
        <tr>
          <th>Şirket Adı</th>
          <th>İletişim</th>
          <th>Ülke</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(company, index) in companies" :key="index">
          <td>{{ company.name }}</td>
          <td>{{ company.contact }}</td>
          <td>{{ company.country }}</td>
        </tr>
      </tbody>
    </table>
  </div>
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
</template>


<script>
import UserService from "../services/user.service";
<<<<<<< HEAD
import FooterComponent from "./Footer/FooterComponent.vue";

export default {
  components: {
    FooterComponent,
  },
  name: "Home",
  data() {
    return {
      
=======

export default {
  name: "Home",
  data() {
    return {
      companies: [
        { name: 'Şirket 1', contact: 'info@company1.com', country: 'Türkiye' },
        { name: 'Şirket 2', contact: 'info@company2.com', country: 'ABD' },
        { name: 'Şirket 3', contact: 'info@company3.com', country: 'İngiltere' },
        // Diğer şirketler
      ]
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    };
  },
  mounted() {
    UserService.getPublicContent().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
};
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
