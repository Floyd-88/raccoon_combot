<script setup lang="ts">
import { ref } from 'vue';
import { push, set, ref as dbRef } from 'firebase/database';
import { database } from '../services/firebase';
import { TasksI } from '../types/type';

// Начальные данные для новой задачи
const task = ref<TasksI>({
  id: '', // ID будет сгенерирован Firebase, поэтому можем оставить 0
  title: '',
  url: '',
  amount: 0,
});

// Функция для создания задачи
const createTask = async () => {
  try {
    const newTaskRef = push(dbRef(database, 'tasks')); // Генерируем новый уникальный ключ
    task.value.id = newTaskRef.key!; // Присваиваем сгенерированный ключ как ID

    // Сохраняем задачу в базе данных
    await set(newTaskRef, task.value);

    // Очищаем форму после создания задачи
    task.value = { id: '', title: '', url: '', amount: 0 };

    console.log('Задача успешно создана!');
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <h1 class="text-2xl font-semibold mb-6">Create New Task</h1>
    <form @submit.prevent="createTask" class="flex flex-col gap-4 w-full">
      <div class="flex flex-col">
        <label for="title" class="mb-2">Title</label>
        <input
          v-model="task.title"
          type="text"
          id="title"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task title"
        />
      </div>
      <div class="flex flex-col">
        <label for="url" class="mb-2">URL</label>
        <input
          v-model="task.url"
          type="url"
          id="url"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task URL"
        />
      </div>
      <div class="flex flex-col">
        <label for="amount" class="mb-2">Amount</label>
        <input
          v-model="task.amount"
          type="number"
          id="amount"
          class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task amount"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
      >
        Create Task
      </button>
    </form>
  </div>
</template>
  
  <style scoped>
  /* Добавьте нужные стили */
  </style>
  