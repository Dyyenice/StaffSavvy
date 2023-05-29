<template>
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
</template>


<script>
import UserService from "../services/user.service";

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
</script>