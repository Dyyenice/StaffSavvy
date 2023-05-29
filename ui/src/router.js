import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
<<<<<<< HEAD
import Profile from "./components/Profile.vue";
// lazy-loaded

=======
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/forgotpassword",
        component: ForgotPassword,
    },
    {
        path: "/profile",
<<<<<<< HEAD
        
=======
        name: "profile",
        // lazy-loaded
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
        component: Profile,
    },
    {
        path: "/admin",
        name: "admin",
        // lazy-loaded
        component: BoardAdmin,
    },
    {
        path: "/mod",
        name: "moderator",
        // lazy-loaded
        component: BoardModerator,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
    const publicPages = ['/login', '/register', '/home','/forgotpassword','/profile'];
=======
    const publicPages = ['/login', '/register', '/home','/forgotpassword'];
>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;