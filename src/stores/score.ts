import { defineStore } from "pinia";
import { LevelImagesI } from "../types/type";

import raccoon_1 from "@/assets/img/raccoon_1.jpg";
import raccoon_2 from "@/assets/img/raccoon_2.jpg";
import raccoon_3 from "@/assets/img/raccoon_3.jpg";
import raccoon_4 from "@/assets/img/raccoon_4.jpg";
import raccoon_5 from "@/assets/img/raccoon_5.jpg";
import raccoon_6 from "@/assets/img/raccoon_6.jpg";

const levelImage: LevelImagesI = {
  level_1: raccoon_1,
  level_2: raccoon_2,
  level_3: raccoon_3,
  level_4: raccoon_4,
  level_5: raccoon_5,
  level_6: raccoon_6,
};

export const base_points: number = 50;

const count_levels = new Array(15)
  .fill(0)
  .map((_, i) => base_points * Math.pow(2, i));

export const usePointStore = defineStore("counter", {
  state: () => {
    return {
      totalPoints: 0,
      level: 0,
      level_progress: 0,
      top_level_progress: base_points,
      image: levelImage,
    };
  },

  getters: {
    interest_level_progress: (state) =>
      (state.level_progress * 100) / state.top_level_progress,
    getImage: (state) =>
      state.image[`level_${state.level + 1}` as keyof typeof levelImage] || state.image.level_6,
  },

  actions: {
    addPoint() {
      this.totalPoints++;
      if (this.totalPoints >= count_levels[this.level]) {
        if (this.level < count_levels.length - 1) {
          this.level++;
          this.level_progress = 0;
          this.top_level_progress =
            count_levels[this.level] - count_levels[this.level - 1];
        } else {
            console.log('victory')
        }
      } else {
        this.level_progress++;
      }
    },
  },
});
