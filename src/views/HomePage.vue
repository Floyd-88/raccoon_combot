<script setup lang="ts">
import { usePointStore } from "../stores/score";
import { clickImage } from "../utils/clickImage";
import { useFloatingText } from "../utils/useFloatingText";
import Header from "../components/Header.vue";

const { tiltDirection, handleImageClick } = clickImage();
const { floatingText, showFloatingText } = useFloatingText();

const point = usePointStore();

function handleClick(event: MouseEvent) {
  point.addPoint();
  handleImageClick(event);
  showFloatingText(event);
}
</script>

<template>
  <div class="w-[220px]">
    <Header />
    <main>
      <div
        class="relative w-[220px] h-[220px] rounded-full select-none shadow-raccoon p-[15px] transition-transform duration-300 ease-out cursor-pointer bg-circle"
        @click="handleClick"
        :style="{
          transform: `rotateX(${tiltDirection.x}deg) rotateY(${tiltDirection.y}deg)`,
        }"
      >
        <div
          class="w-full h-full rounded-full overflow-hidden bg-white shadow-inner-raccoon"
        >
          <img
            :src="point.getImage"
            alt="raccoon"
            class="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      <div
        v-for="(text, index) in floatingText"
        :key="index"
        class="absolute text-amber-600 text-base font-extrabold select-none pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-fade-out"
        :style="{ top: `${text.y}px`, left: `${text.x}px` }"
      >
        +1
      </div>
    </main>
  </div>
</template>

<style scoped>
.shadow-raccoon {
  /* Неоновое свечение вокруг */
  box-shadow: 0px 0px 10px rgba(58, 187, 255, 0.6), 
              0px 0px 25px rgba(90, 255, 135, 0.5), 
              0px 0px 40px rgba(255, 60, 120, 0.4);
  border-radius: 50%;

  /* Градиент для неонового эффекта с блеском */
  background: radial-gradient(circle at 30% 30%, #a0f, #0ff, #0f0 70%, #ff0 100%);
}

.shadow-inner-raccoon {
  /* Внутренний глянец */
  box-shadow: inset 0px 6px 10px rgba(255, 255, 255, 0.4), /* Верхний блеск */
              inset 0px -6px 8px rgba(0, 0, 0, 0.3); /* Нижняя тень */
}

.bg-circle {
  /* Гладкий градиент для имитации стеклянного купола с неоном */
  background: linear-gradient(145deg, #0ff, #a0f 30%, #F5E 61%);
  border: 0 solid rgba(255, 255, 255, 0.4); /* Глянцевая рамка */
}



@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}
.animate-fade-out {
  animation: fadeOut 1s ease-out forwards;
}
</style>
