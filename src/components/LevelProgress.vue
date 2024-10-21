<script setup lang="ts">
import { usePointStore } from '../stores/score';
const point = usePointStore()
</script>

<template>
  <div class="relative w-full mb-4">
    <h4 class="flex justify-between align-middle text-white">
      <span>{{point.level_progress + '/' + point.top_level_progress }}</span>
      <span>{{ point.level + 1 }}</span>
    </h4>
    <div class="relative w-full h-[6px] bg-[#4b402e] overflow-hidden rounded-lg">
      <div class="absolute bg-[#fff] left-0 top-0 bottom-0 transition-all duration-200 ease-linear" :style="`width: ${point.interest_level_progress}%`"></div>
    </div>
  </div>
</template>

<style scoped></style>
