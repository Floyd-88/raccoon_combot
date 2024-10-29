import { defineStore } from "pinia";
import { ref } from "vue";
import {
  fetchTasks,
  getOrCreateUser,
  completeTask,
  registerRef,
  removeTask,
  editTask
} from "../api/api";
import { TasksI, UserI } from "../types/type";
import { usePointStore } from "./score";
import { useTelegram } from "../services/telegram";
import { authenticateBot } from "../services/firebase";

export const useAppStore = defineStore("app", () => {
  const user = ref<UserI | null>(null);
  const tasks = ref<TasksI[]>([]);

  async function init(ref: string) {

    try {
      const {telegramUser} = useTelegram()
      // const telegramUser = {id: 2711198824, first_name: 'rrr'} test data
      if(!telegramUser) return
      await authenticateBot(telegramUser.id)
      user.value = await getOrCreateUser();
      const point = usePointStore();
      point.setPoint(user.value.totalPoints);

      if (ref && +ref !== +user.value.id) {
        await registerRef(telegramUser?.first_name || "Raccoon", ref);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function updateUserTask(task: TasksI) {
    if (user.value) {
      try {
        // Отмечаем задачу как выполненную в базе данных
        await completeTask(user.value.id, task);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  }

  async function setTasks() {
    try {
      const request = await fetchTasks();
      tasks.value = Object.keys(request).map((id) => ({
        ...request[id as keyof typeof request],
        id: String(id),
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function setUserTasks(tasks: any) {
    if (user.value) {
      user.value.tasks = tasks;
    }
  }

  async function editStorageTask(localTask: TasksI) {
    try {
      await editTask(localTask)
      tasks.value = tasks.value.map((task) => 
        task.id === localTask.id ? localTask : task
      );
    } catch (error) {
      console.error("Error edit tasks:", error);
    }
  }

  async function removeStorageTask(localTask: TasksI) {
    try {
      await removeTask(localTask)
      tasks.value = tasks.value.filter((task) => task.id !== localTask.id);
    } catch (error) {
      console.error("Error remove tasks:", error);
    }
  }

  return {
    user,
    tasks,
    init,
    setTasks,
    updateUserTask,
    setUserTasks,
    editStorageTask,
    removeStorageTask,
  };
});
