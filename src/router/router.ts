import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import HomePage from "../views/HomePage.vue";
import UsersPage from "../views/FriendsPage.vue";
import TasksPage from "../views/TasksPage.vue";
import AdminPage from "../views/AdminPage.vue";

// import { useTelegram } from '../services/telegram';
import SettingsPage from "../admin/SettingsPage.vue";
import CreateTasks from "../admin/CreateTasks.vue";
import { useAppStore } from "../stores/app";
import ListAllTasks from "../admin/ListAllTasks.vue";

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
        path: 'listAllTasks',
        name: 'listAllTasks',
        component: ListAllTasks,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
      }
    ],
    beforeEnter: (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // const { telegramUser } = useTelegram();
      // const id = telegramUser?.id
      const app = useAppStore();
      const adminID = import.meta.env.VITE_ADMIN_TELEGRAM_ID; // Ваш личный Telegram ID
      if (app.user?.id === +adminID) {
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
