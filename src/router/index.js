import { createRouter, createWebHistory } from "vue-router";

import mainPage from "../views/mainPage"
import recomendView from "../views/recomendView"
import Login from "../components/Login";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/homepage",
    component: () => import("../views/homePage"),
    children: [
      {
        path: "/myarticle",
        component: () => import("../views/mine/myArticle"),
      },
      {
        path: "/edit",
        component: () => import("../views/mine/edit"),
      },
    ]
  },

  {
    path: "/main",
    name: "mainPage",
    component: mainPage,
    children: [

      {
        path: '/recomend',
        component: () => import("../views/recomendView"),
      },
      {
        path: '/detail',
        component: () => import("../views/dynamicDetail"),

      },
      {
        path: "/hotlist",
        name: "HotList",
        component: () => import("../views/hotList"),
      },
      {
        path: "/profile",
        component: () => import("../views/modifyProfile"),
      },
      {
        path: "/note",
        component: () => import("../views/userNote"),
      },

      {
        path: "/activity",
        component: () => import("../views/activity"),
      },

      {
        path: '/publish',
        component: () => import("../views/publishView"),

      }
    ]
  },


  {
    path: "/setting",
    component: () => import("../views/settingView"),
  },
  {
    path: "/message",
    component: () => import("../views/messageView"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register"),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
