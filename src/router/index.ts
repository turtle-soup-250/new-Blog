import { createRouter, createWebHistory } from "vue-router";
const Home = () => import("../views/Home.vue");
const NotFound = () => import("../views/Error/NotFound.vue");
const Project = () => import("../views/Project.vue");
const Article = () => import("../views/Article.vue");
const About = () => import("../views/About.vue");
const More = () => import("../views/More.vue");
const Tools = () => import("../views/Tools.vue");
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/project",
      name: "Project",
      component: Project,
    },
    {
      path: "/article",
      name: "Article",
      component: Article,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/more",
      name: "More",
      component: More,
    },
    {
      path: "/tools",
      name: "Tools",
      component: Tools,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});
export default router;
