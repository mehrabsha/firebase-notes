import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Panel from "../views/Panel.vue";
import Notes from "../views/Notes.vue";
import Note from "../views/Note.vue";
import Fav from "../views/Fav.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "Login",
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
      },
      {
        name: "Fav",
        path: "/panel/fav",
        component: Fav
      },
      {
        name: "Note",
        path: "/panel/note/:id",
        component: Note
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
