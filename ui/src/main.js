import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
import { FontAwesomeIcon } from './plugins/font-awesome'

createApp(App)
    .use(router)
    .use(store)
<<<<<<< HEAD
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");

