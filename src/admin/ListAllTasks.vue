<script setup lang="ts">
import List from "../components/List.vue";
import Item from "../components/Item.vue";
import { useAppStore } from "../stores/app";
import { onMounted } from "vue";
import { ref } from "vue";
import EditTask from "./EditTask.vue";
import { TasksI } from "../types/type";

const app = useAppStore();
const edit = ref(false);
const task = ref<TasksI | null>(null)

onMounted(() => {
  app.setTasks();
});

function editClick(id: string) {
  edit.value = true;
  task.value = app.tasks.find((t) => t.id === id) || null; // Используем find для одного объекта
}
</script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <div class="w-full" v-if="!edit">
      <h1 class="text-2xl font-semibold mb-6">List Tasks</h1>
      <List>
        <Item
          v-for="task in app.tasks"
          :key="task.id"
          :title="task.title"
          :amount="task.amount"
          @click="editClick(task.id)" 
          class="cursor-pointer hover:scale-y-105"
        />
      </List>
    </div>
    <div class="w-full" v-else>
      <EditTask v-if="task !== null" :task="task" @back="edit = false"/>
  
    </div>
  </div>
</template>
