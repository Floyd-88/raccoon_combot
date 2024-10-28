<script setup lang="ts">
import { PuzzlePieceIcon, UsersIcon, HomeIcon, WrenchScrewdriverIcon } from "@heroicons/vue/24/solid";
import { useAppStore } from "../stores/app";

const app = useAppStore()
const adminID = import.meta.env.VITE_ADMIN_TELEGRAM_ID
</script>

<template>
  <div
    class="flex justify-around items-center shadow-lg w-full bg-slate-900"
  >
    <router-link to="/">
      <HomeIcon class="w-8 h-8 text-blue-500 hover:scale-110" />
    </router-link>
    <router-link to="/friends">
      <UsersIcon class="w-8 h-8 text-blue-500 hover:scale-110" />
    </router-link>
    <router-link to="/tasks">
      <PuzzlePieceIcon class="w-8 h-8 text-blue-500 hover:scale-110" />
    </router-link>
    <router-link to="/admin" v-if="Number(app.user?.id) === Number(adminID)">
      <WrenchScrewdriverIcon class="w-8 h-8 text-blue-500 hover:scale-110" />
    </router-link>
  </div>
</template>

<style scoped></style>
