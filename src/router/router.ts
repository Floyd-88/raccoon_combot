import { createRouter, createWebHistory, RouteLocationNormalized  } from "vue-router";
import HomePage from "../views/HomePage.vue";
import UsersPage from "../views/FriendsPage.vue";
import TasksPage from "../views/TasksPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    props: (route: RouteLocationNormalized ) => ({
      levelImage: route.query.levelImage,
      countMoney: route.query.countMoney,
    }), // Пример передачи пропсов через query
  },
  {
    path: "/friends",
    name: "Friends",
    component: UsersPage,
  },

  {
    path: "/tasks",
    name: "Tasks",
    component: TasksPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
