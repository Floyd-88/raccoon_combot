import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import HomePage from "../views/HomePage.vue";
import UsersPage from "../views/FriendsPage.vue";
import TasksPage from "../views/TasksPage.vue";
import AdminPage from "../views/AdminPage.vue";

import { useTelegram } from '../services/telegram';
import SettingsPage from "../admin/SettingsPage.vue";
import CreateTasks from "../admin/createTasks.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
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

  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children: [
      {
        path: 'createTasks',
        name: 'createTasks',
        component: CreateTasks,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
      }
    ],
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const { telegramUser } = useTelegram();
      const adminID = 123; // Ваш личный Telegram ID
      const id = telegramUser?.id ?? 123
      if (id === adminID) {
        next();
      } else {
        next('/'); // Если пользователь не админ, перенаправляем на главную страницу
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
