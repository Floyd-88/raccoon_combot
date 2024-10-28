<script setup lang="ts">
import { ref } from "vue";
import { TasksI } from "../types/type";
import { useAppStore } from "../stores/app";

const props = defineProps<{ task: TasksI }>();
const emit = defineEmits(["back"]);
const app = useAppStore();

const localTask = ref({ ...props.task });

const editTask = async () => {
  try {
    if (localTask.value.id) {
      app.editStorageTask(localTask.value);
      emit("back");
    }
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
  }
};

const removeTask = async () => {
  try {
    if (localTask.value.id) {
      app.removeStorageTask(localTask.value);
      emit("back");
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
};

function backClick() {
  emit("back");
}
</script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <h1 class="text-2xl font-semibold mb-6">Create New Task</h1>
    <form class="flex flex-col gap-4 w-full">
      <div class="flex flex-col">
        <label for="title" class="mb-2">Title</label>
        <input
          v-model="localTask.title"
          type="text"
          id="title"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>
      <div class="flex flex-col">
        <label for="url" class="mb-2">URL</label>
        <input
          v-model="localTask.url"
          type="url"
          id="url"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task URL"
        />
      </div>
      <div class="flex flex-col">
        <label for="amount" class="mb-2">Amount</label>
        <input
          v-model="localTask.amount"
          type="number"
          id="amount"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task amount"
        />
      </div>
      <button
        @click.prevent="editTask"
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
      >
        Edit Task
      </button>

      <button
        @click.prevent="removeTask"
        type="submit"
        class="bg-red-400 hover:bg-red-500 w-full text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
      >
        Remove Task
      </button>
      <button
        @click.prevent="backClick"
        type="submit"
        class="border border-gray-600 hover:bg-gray-900 w-full text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
      >
        Back Tasks
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Добавьте нужные стили */
</style>
