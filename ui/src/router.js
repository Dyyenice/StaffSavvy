import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import RegisterChoose from "./components/registerChoose.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import CompanyRegister from "./components/CompanyRegister.vue";
import UserGuide from "./components/UserGuide.vue";
import AboutUs from "./components/AboutUs.vue";
import MediaCenter from "./components/MediaCenter.vue";
import InsertToken from "./components/insertToken.vue"

// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const PendingPersonnels = () => import("./components/PendingPersonnels.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const LoggedHome = () => import("./components/LoggedHome.vue")
const CompanyPersonnels = () => import("./components/CompanyPersonnels.vue")
const PersonnelDetails = () => import("./components/personnelDetails.vue")
const PermissionRequest = () => import("./components/Permission&Request.vue")
const CreateTask = () => import("./components/Tasks/createTask.vue")
const CreateUserGroup = () => import("./components/UserGroups/createUserGroup.vue")
const GiveTask = () => import("./components/Tasks/giveTask.vue")
const TaskDetails = () => import("./components/Tasks/taskDetails.vue")
const CompletedTasks = () => import("./components/Tasks/CompletedTasks.vue")
const CreateRolegroup = () => import("./components/Rolegroups/createRolegroup.vue")
const GiveRolegroup = () => import("./components/Rolegroups/giveRolegroup.vue")
const UserTasks = () => import("./components/Tasks/CompanyTasks.vue")
const UserGroups=()=> import("./components/UserGroups/CompanyUserGroups.vue")
const UserGroupDetails=()=> import("./components/UserGroups/UserGroupDetails.vue")
const CompanyRolegroups =()=> import("./components/Rolegroups/companyRolegroups.vue")
const RolegroupDetails =()=> import("./components/Rolegroups/RolegroupDetails.vue")
const CompanyJobPostings = ()=> import("./components/jobPostings/companyJobPostings.vue")
const JobPostingInDetail=()=> import("./components/jobPostings/JobPostingInDetail.vue")
const UserGroupsOfPersonnel=()=> import("./components/UserGroups/UserGroupsOfPersonnel.vue")
const TasksOfPersonnel=()=> import("./components/Tasks/TasksOfPersonnel.vue")
const CreateJobPostings=()=> import("./components/jobPostings/createJobPostings.vue")
const CreateEvent=()=> import("./components/CreateEvent.vue")
const Events=()=> import("./components/Events.vue")
const EventsDetail =()=> import("./components/EventsDetail.vue")
const JobPostings =() => import("./components/jobPostings/jobPostings.vue")
const CompanyJobPostingDetails =() => import("./components/jobPostings/selectedJobPostingDetailsForAdmin.vue")


const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: '/home',
        name: 'Home',
      beforeEnter: (to, from, next) => {
      const isLoggedIn =  JSON.parse(localStorage.getItem('user'));
      if (isLoggedIn) {
        next('/loggedhome');
      } else {
        next();
      }
    },
    component: Home
  
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
        path: "/insertToken",
        component: InsertToken,
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
        path: "/aboutus",
        component: AboutUs,
    },
    {
        path: "/UserGuide",
        component: UserGuide,
    },
    {
        path: "/forgotpassword",
        component: ForgotPassword,
    },
    {
        path: "/jobpostingdetail",
        name:"jobpostingindetail",
        component: JobPostingInDetail,
    },
    {
        path: "/companyJobPostings",
        name:"CompanyJobPostings",
        component: CompanyJobPostings,
    },
    {
        path: "/jobPostings",
        name:"JobPostings",
        component: JobPostings,
    },
    {
        path: "/mediacenter",
        component: MediaCenter,
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
    {
        path: "/PermissionRequest",
        name: "PermissionRequest",
        // lazy-loaded
        component: PermissionRequest,
    },
    {
        path: "/createTask",
        name: "CreateTask",
        // lazy-loaded
        component: CreateTask,
    },
    {
        path: "/createUserGroup",
        name: "CreateUserGroup",
        // lazy-loaded
        component: CreateUserGroup,
    },
    {
        path: "/giveTask",
        name: "GiveTask",
        // lazy-loaded
        component: GiveTask,
    },
    {
        path: "/createRolegroup",
        name: "CreateRolegroup",
        // lazy-loaded
        component: CreateRolegroup,
    },
    {
        path: "/CompletedTasks",
        name: "CompletedTasks",
        // lazy-loaded
        component: CompletedTasks,
    },
    {
        path: "/TaskDetails",
        name: "TaskDetails",
        // lazy-loaded
        component: TaskDetails,
    },
    {
        path: "/giveRolegroup",
        name: "GiveRolegroup",
        // lazy-loaded
        component: GiveRolegroup,
    },
    {
        path: "/companyRolegroups",
        name: "CompanyRolegroups",
        // lazy-loaded
        component: CompanyRolegroups,
    },
    {
        path: "/companyTasks",
        name: "UserTasks",
        // lazy-loaded
        component: UserTasks,
    },
    {
        path: "/UserGroupDetails",
        name: "UserGroupDetails",
        // lazy-loaded
        component: UserGroupDetails,
    },
    {
        path: "/rolegroupdetails",
        name: "RoleGroupDetails",
        // lazy-loaded
        component: RolegroupDetails,
    },
    {
        path: "/companyUserGroups",
        name: "UserGroups",
        // lazy-loaded
        component: UserGroups,
    },
    {
        path: "/Events",
        name: "Events",
        // lazy-loaded
        component: Events,
    },
    {
        path: "/MyTeams",
        name: "UserGroupsOfPersonnel",
        // lazy-loaded
        component: UserGroupsOfPersonnel,
    },
    {
        path: "/MyTasks",
        name: "TasksOfPersonnel",
        // lazy-loaded
        component: TasksOfPersonnel,
    },
    {
        path: "/createJobPostings",
        name: "CreateJobPostings",
        // lazy-loaded
        component: CreateJobPostings,
    },
    {
        path: "/CreateEvent",
        name: "CreateEvent",
        // lazy-loaded
        component: CreateEvent,
    },
    {
        path: "/Events",
        name: "Events",
        // lazy-loaded
        component: Events,
    },
    {
        path: "/companyJobPostingDetails",
        name: "CompanyJobPostingDetails",
        // lazy-loaded
        component: CompanyJobPostingDetails,
    },
    {
        path: "/EventsDetail",
        name: "EventsDetail",
        // lazy-loaded
        component: EventsDetail,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register','/registerChoose','/companyRegister', '/home','/forgotpassword','/aboutus','/jobPostings','/jobpostingdetail','/mediacenter','/companyregister','/UserGuide',];
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