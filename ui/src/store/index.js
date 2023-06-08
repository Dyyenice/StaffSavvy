import { createStore } from "vuex";
import { auth } from "./auth.module";
import { company }  from "./company.module"
const store = createStore({
    modules: {
        auth,
        company,
    },
});

export default store;