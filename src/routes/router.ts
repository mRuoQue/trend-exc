import { createRouter, createWebHashHistory } from "vue-router";

import trendAnimationVue from "../components/trendAnimation.vue";
import dingtolkAnimate from "../components/dingtolkAnimate.vue";
import home from "../pages/home.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: home,
    },
    {
      path: "/trendPage",
      component: trendAnimationVue,
    },
    {
      path: "/dingPage",
      component: dingtolkAnimate,
    },
  ],
});

export default router;
