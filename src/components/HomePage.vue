<script setup lang="ts">

import { ref } from "vue";
import { clickImage } from "../clickImage";
import Header from "./Header.vue";
import { LevelImagesI } from "../types/type";
const props = defineProps<{countMoney: number, levelImage: LevelImagesI}>()
const emit = defineEmits<{(e: 'addOne'): void}>()
const { tiltDirection, handleImageClick } = clickImage();
const floatingText = ref<{ x: number; y: number; visible: boolean }[]>([]);
const img = ref<string>(props.levelImage.level_1)
function handleClick(event: MouseEvent) {
  emit('addOne')

  if(props.countMoney >= 49) {
    img.value = props.levelImage.level_2
  }
  handleImageClick(event)

  const { clientX, clientY } = event;
  floatingText.value.push({ x: clientX, y: clientY, visible: true });

  setTimeout(() => {
    floatingText.value.shift();
  }, 1000);
}
</script>

<template>
  <Header :countMoney="countMoney"/>
  <main>
    <div
      class="relative w-[220px] h-[220px] rounded-full select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[15px] transition-transform duration-300 ease-out cursor-pointer"
      @click="handleClick"
      :style="{
        transform: `rotateX(${tiltDirection.x}deg) rotateY(${tiltDirection.y}deg)`,
      }"
    >
      <div class="w-full h-full rounded-full overflow-hidden bg-white">
        <img
          :src="img"
          alt="raccoon"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div v-for="(text, index) in floatingText" 
         :key="index" 
         class="absolute text-white text-base font-extrabold select-none pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-fade-out"
         :style="{ top: `${text.y}px`, left: `${text.x}px` }">
      +1
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}
.animate-fade-out {
  animation: fadeOut 1s ease-out forwards;
}
</style>
