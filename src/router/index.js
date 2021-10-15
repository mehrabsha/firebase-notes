import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Panel from "../views/Panel.vue";
import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
    redirect: "/panel/notes",
    children: [
      {
        name: "Notes",
        path: "/panel/notes",
        component: Notes
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !router.app.$store?.getters["user/getEmail"]) {
    next({ name: "Login" });
  } else next();
});
export default router;
