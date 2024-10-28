<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "../stores/app";
import { TasksI } from "../types/type";
import { useTelegram } from "../services/telegram";
import List from "../components/List.vue";
import Item from "../components/Item.vue";

const app = useAppStore();
const { tg } = useTelegram();
const isLoading = ref(true); 

onMounted(async () => {
 await app.setTasks();
 isLoading.value = false
});

const incompleteTasks = computed(() => {
  return app.tasks.filter(task => !app.user?.tasks?.[task.id as any]);
});

function openTask(task: TasksI) {
  if (tg && task.url) {
    app.updateUserTask(task);
    if (task.url.includes("t.me")) {
      (tg as any).openTelegramLink(task.url);
    } else  {
      (tg as any).openLink(task.url);
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center w-full px-4 pt-6 max-w-[900px] items-center text-white">
    <h2 class="text-4xl font-bold mb-8">Your tasks</h2>
    <h3 class="text-lg mb-2" v-if="!isLoading && (app.tasks.length === 0 || incompleteTasks.length === 0)">
      Задачи не найдены
    </h3>

    <List v-if="!isLoading && incompleteTasks.length > 0">
      <Item
        v-for="task in incompleteTasks"
        :key="task.id"
        :title="task.title"
        :amount="task.amount"
        shadow="tasks"
        @click.prevent="openTask(task)" target="_blank"
        class="cursor-pointer hover:scale-y-105"
      />
    </List>
  </div>
</template>

<style scoped></style>
