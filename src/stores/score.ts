import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { debounce } from "lodash";

import img_1 from "@/assets/img/1.jpg";
import img_2 from "@/assets/img/2.jpg";
import img_3 from "@/assets/img/3.jpg";
import img_4 from "@/assets/img/4.jpg";
import img_5 from "@/assets/img/5.jpg";
import img_6 from "@/assets/img/6.jpg";
import img_7 from "@/assets/img/7.jpg";
import img_8 from "@/assets/img/8.jpg";
import img_9 from "@/assets/img/9.jpg";
import img_10 from "@/assets/img/10.jpg";
import { updateTotalPoints } from "../api/api";
import { useTelegram } from "../services/telegram";

const {telegramUser} = useTelegram()
const telegramID = telegramUser?.id ?? import.meta.env.VITE_TEST_TELEGRAM_ID;

const levelImage = {
  level_1: img_1,
  level_2: img_2,
  level_3: img_3,
  level_4: img_4,
  level_5: img_5,
  level_6: img_6,
  level_7: img_7,
  level_8: img_8,
  level_9: img_9,
  level_10: img_10,
};

const debouncedUpdateScore = debounce(async (points: number) => {
  try {
    await updateTotalPoints(points, telegramID);
  } catch (error) {
    console.error('Error updating total points:', error);
  }
}, 500);

export const base_points: number = 200;

const count_levels = new Array(15)
  .fill(0)
  .map((_, i) => base_points * Math.pow(2, i));

export const usePointStore = defineStore("counter", () => {
  const totalPoints = ref(0);
  const bonusPointsForFriend = ref(100); //монеты за приглашенного друга

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
    const maxLevel = Object.keys(levelImage).length; // Максимальный уровень изображений
    const levelKey = `level_${Math.min(level.value + 1, maxLevel)}` as keyof typeof levelImage;
    return levelImage[levelKey];
  });

  // Action для добавления очков
  function addPoint() {
    totalPoints.value += 1;
    debouncedUpdateScore(totalPoints.value)
  }

  function setPoint(value: number) {
    totalPoints.value = value;
  }

  return {
    bonusPointsForFriend,
    totalPoints,
    level,
    top_level_progress,
    level_progress,
    interest_level_progress,
    getImage,
    addPoint,
    setPoint
  };
});
