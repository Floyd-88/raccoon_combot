<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ title?: string; amount?: number, shadow?:string }>();
</script>

<template>
  <li
    class="flex justify-between items-center w-full bg-gray-800 px-4 py-4 rounded-2xl shadow-lg"
    :class="{'shadow-indigo': shadow === 'friends', 'shadow-green': shadow === 'tasks'}"
    >
    {{ title }}
    <span class="bg-green-600 px-2 mr-1 ml-4 py-0 rounded-2xl">{{ amount }}</span>
  </li>
</template>

<style scoped>
.shadow-green {
    box-shadow: 2px 0px 10px rgba(0, 255, 255, 0.2), 0 3px 16px rgba(0, 255, 255, 0.15), 0 10px 30px rgba(0, 255, 255, 0.1);
}
.shadow-indigo {
    box-shadow: 2px 0px 10px rgba(0, 255, 72, 0.2), 0 3px 16px rgba(55, 255, 0, 0.15), 0 10px 30px rgba(55, 255, 0, 0.1);
}
</style>
