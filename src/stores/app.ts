import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchTasks, getOrCreateUser, completeTask, registerRef } from "../api/api";
import { TasksI, UserI } from "../types/type";
import { usePointStore } from "./score";
import { useTelegram } from "../services/telegram";

const {telegramUser} = useTelegram()

export const useAppStore = defineStore("app", () => {
  const user = ref<UserI | null>(null);
  const tasks = ref<TasksI[]>([]);

  async function init(ref: string) {
    try {
      user.value = await getOrCreateUser();
      const point = usePointStore();
      point.setPoint(user.value.totalPoints);

      if(ref && +ref !== +user.value.id) {
        await registerRef(telegramUser?.first_name  || "Unknown", ref)
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
      console.log(request)
        tasks.value = Object.keys(request).map((id) => ({
          ...request[id as keyof typeof request], id: String(id)
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

  return {
    user,
    tasks,
    init,
    setTasks,
    updateUserTask,
    setUserTasks
  };
});
