import Vue from "vue";
import Router from "vue-router";
import Preview from "../views/Preview.vue";
import Cube from "../views/Cube.vue";
import HuntedHouse from "../views/HuntedHouse.vue";
import GalaxyGenerator from "../views/GalaxyGenerator.vue";
import Vue3dLoader from "../views/Vue3dLoader.vue";
import ScrollBasedAnimation from "../views/ScrollBasedAnimation.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "preview",
      component: Preview,
    },
    {
      path: "/cube",
      name: "cube",
      component: Cube,
    },
    {
      path: "/vue-3d-loader",
      name: "Vue-3d-loader",
      component: Vue3dLoader,
    },
    {
      path: "/hunted-house",
      name: "huntedHouse",
      component: HuntedHouse,
    },
    {
      path: "/galaxy-generator",
      name: "GalaxyGenerator",
      component: GalaxyGenerator,
    },
    {
      path: "/scroll-based-animation",
      name: "Scroll Based Animation",
      component: ScrollBasedAnimation,
    },
    { path: "*", component: HuntedHouse },
  ],
});
export default router;
