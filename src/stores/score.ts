import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { LevelImagesI } from "../types/type";

import img_1 from "@/assets/img/1.jpg";
import img_2 from "@/assets/img/2.jpg";
import img_3 from "@/assets/img/3.jpg";
import img_4 from "@/assets/img/4.jpg";
import img_5 from "@/assets/img/5.jpg";
import img_6 from "@/assets/img/6.jpg";

const levelImage: LevelImagesI = {
  level_1: img_1,
  level_2: img_2,
  level_3: img_3,
  level_4: img_4,
  level_5: img_5,
  level_6: img_6,
};

export const base_points: number = 25;

const count_levels = new Array(15)
  .fill(0)
  .map((_, i) => base_points * Math.pow(2, i));

export const usePointStore = defineStore("counter", () => {
  const totalPoints = ref(41);

  // Вычисляем уровень
  const level = computed(() => {
    return count_levels.findIndex((points) => totalPoints.value < points);
  });

  const top_level_progress = computed(() => {
    const currentLevel = count_levels[level.value];
    const previousLevelPoints =
      level.value > 0 ? count_levels[level.value - 1] : 0;
    return currentLevel - previousLevelPoints;
  });

  const level_progress = computed(() => {
    const previousLevelPoints =
      level.value > 0 ? count_levels[level.value - 1] : 0;
    return totalPoints.value - previousLevelPoints;
  });

  const interest_level_progress = computed(() => {
    return (level_progress.value * 100) / top_level_progress.value;
  });

  // Получение изображения в зависимости от уровня
  const getImage = computed(() => {
    const levelKey = `level_${level.value + 1}` as keyof typeof levelImage;
    return levelImage[levelKey] || levelImage.level_6;
  });

  // Action для добавления очков
  function addPoint() {
    totalPoints.value++;
  }

  return {
    totalPoints,
    level,
    top_level_progress,
    level_progress,
    interest_level_progress,
    getImage,
    addPoint,
  };
});
