import Vue from "vue";
import VueRouter from "vue-router";
import businessData from "../views/page/business-data/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "graphicStatistics",
    component: () =>
      import("../views/page/graphic-statistics/index.vue")
  },
  {
    path: "/graphicStatistics",
    name: "graphicStatistics",
    component: () =>
      import("../views/page/graphic-statistics/index.vue")
  },
  {
    path: "/businessData",
    name: "businessData",
    component: businessData
  },
  {
    path: "/maintennaceData",
    name: "maintennaceData",
    component: () =>
      import("../views/page/maintenance-data/index.vue")
  },
  {
    path: "/404",
    name: "Login",
    component: () =>
      import("../views/page/404.vue")
  }
];

const router = new VueRouter({
  /*mode: "history",*/
  base: process.env.BASE_URL,
  routes
});

export default router;
