<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAppStore } from "../stores/app";
import { TasksI } from "../types/type";
import { useTelegram } from "../services/telegram";
const app = useAppStore();
const { tg } = useTelegram();

onMounted(() => {
  app.setTasks();
});

const incompleteTasks = computed(() => {
  return app.tasks.filter(task => !app.user?.tasks?.[task.id as any]);
});

function openTask(task: TasksI) {
  app.updateUserTask(task);
  if (tg) {
    if (task.url.includes("t.me")) {
      tg.openTelegramLink(task.url);
    } else {
      tg.openLink(task.url);
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full max-w-[360px] text-white">
    <h1 class="text-2xl font-bold mb-4">Your tasks</h1>
    <h3 class="text-lg mb-4" v-if="app.tasks.length === 0 || incompleteTasks.length === 0">
      Задачи не найдены
    </h3>

    <ul class="flex flex-col gap-2 w-full" v-else>
      <li
        v-for="task in incompleteTasks"
        :key="task.id"
        class="flex justify-between items-center bg-gray-800 w-full px-2 py-2 rounded-2xl"
      >
        {{ task.title }}
        <span
          class="ml-[20px] bg-white hover:bg-white/70 transition-all text-black font-semibold px-2 mr-1 py-0 rounded-2xl cursor-pointer"
          :class="{ 'bg-green-700 hover:bg-green-700': app.user?.tasks?.[task.id as any] }"
          ><a @click.prevent="openTask(task)" target="_blank">{{
            task.amount
          }}</a>
        </span
        >
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
