import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import RegisterChoose from "./components/registerChoose.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import CompanyRegister from "./components/CompanyRegister.vue";
import JobPostingInDetail from "./components/JobPostingInDetail.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const PendingPersonnels = () => import("./components/PendingPersonnels.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const LoggedHome = () => import("./components/LoggedHome.vue")
const CompanyPersonnels = () => import("./components/CompanyPersonnels.vue")
const PersonnelDetails = () => import("./components/personnelDetails.vue")

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
        path: "/registerChoose",
        component: RegisterChoose,
    },
    {
        path: "/companyRegister",
        component: CompanyRegister,
    },
    {
        path: "/forgotpassword",
        component: ForgotPassword,
    },
    {
        path: "/jobpostingdetail",
        component: JobPostingInDetail,
    },
    {
        path: "/profile",
        name:"profile",
        component: Profile,
    },
    {
        path: "/pendingPersonnels",
        name: "pendingPersonnels",
        // lazy-loaded
        component: PendingPersonnels,
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile,
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
    {
        path: "/loggedhome",
        name: "loggedhome",
        // lazy-loaded
        component: LoggedHome,
    },
    {
        path: "/companyPersonnels",
        name: "companyPersonnels",
        // lazy-loaded
        component: CompanyPersonnels,
    },
    {
        path: "/personnelDetails",
        name: "personnelDetails",
        // lazy-loaded
        component: PersonnelDetails,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register','/registerChoose','/companyRegister', '/home','/forgotpassword','/companyregister','/jobpostingdetail'];
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