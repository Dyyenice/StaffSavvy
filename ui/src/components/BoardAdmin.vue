<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import CompanyService from "../services/company.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },

  mounted()
      {
    CompanyService.getPendingPersonnels(this.$store.state.auth.user).then(
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
  }
};
</script>