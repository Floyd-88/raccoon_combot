<script setup lang="ts">
import { usePointStore } from '../stores/score';
import LevelProgress from "./LevelProgress.vue";

// defineProps<{ countMoney: Number }>();

const point = usePointStore();
</script>

<template>
  <header class="flex flex-col items-center">
    <LevelProgress />
    <div class="flex items-center gap-2 mb-4">
      <div class="w-12 h-12">
        <img src="../assets/img/coin.png" alt="coin" />
      </div>
      <h2 class="text-[30px] text-white font-bold select-none font-roboto">
        {{ point.totalPoints }}
      </h2>
    </div>
  </header>
</template>

<style scoped></style>
