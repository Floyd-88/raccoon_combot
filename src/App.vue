<script setup lang="ts">
import { ref } from 'vue';
import HomePage from './components/HomePage.vue';
import { LevelImagesI } from './types/type';
import raccoon_1 from '@/assets/img/raccoon_1.jpg';
import raccoon_2 from '@/assets/img/raccoon_2.jpg';

const countMoney = ref<number>(0)
const levelImage: LevelImagesI = {
    level_1: raccoon_1,
    level_2: raccoon_2,
}

function incrementMoney() {
  countMoney.value += 1;
}
</script>

<template>
    <div class="flex flex-col w-full justify-center items-center gap-3 h-[100vh]">
        <HomePage :levelImage="levelImage" :countMoney="countMoney" @addOne="incrementMoney"/>
    </div>
</template>

<style scoped>
</style>
