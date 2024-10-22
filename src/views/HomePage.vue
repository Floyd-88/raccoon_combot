<script setup lang="ts">
import { usePointStore } from '../stores/score';
import { clickImage } from "../utils/clickImage";
import { useFloatingText } from "../utils/useFloatingText"; 
import Header from "../components/Header.vue";

const { tiltDirection, handleImageClick } = clickImage();
const { floatingText, showFloatingText } = useFloatingText();

const point = usePointStore();

function handleClick(event: MouseEvent) {
  point.addPoint()
  handleImageClick(event)
  showFloatingText(event); 
}
</script>

<template>
  <Header/>
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
          :src="point.getImage"
          alt="raccoon"
          class="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </div>

    <div v-for="(text, index) in floatingText" 
         :key="index" 
         class="absolute text-amber-600 text-base font-extrabold select-none pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-fade-out"
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
