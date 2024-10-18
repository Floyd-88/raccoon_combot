<script setup lang="ts">
defineProps<{ countMoney: Number }>()
</script>

<template>
  <header class="flex items-center gap-2">
    <div class="w-12 h-12">
        <img src="../assets/img/coin.png" alt="coin" />
    </div>
    <h2 class="text-[30px] text-white font-bold select-none">{{ countMoney }}</h2>
  </header>
</template>

<style scoped></style>
