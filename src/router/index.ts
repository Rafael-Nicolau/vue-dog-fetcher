import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import IndexView from "@/views/IndexView.vue";

//lazy loading
const AllBreedsView = () => import("@/views/AllBreedsView.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexView,
  },
  {
    path: "/breeds",
    name: "AllBreeds",
    component: AllBreedsView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
