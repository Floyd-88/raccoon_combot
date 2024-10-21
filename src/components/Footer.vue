<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/solid";
import { UsersIcon } from "@heroicons/vue/24/solid";
import { PuzzlePieceIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    class="flex justify-around items-center shadow-lg h-20 w-full bg-slate-900"
  >
    <router-link to="/">
      <HomeIcon class="w-8 h-8 text-blue-500" />
    </router-link>
    <router-link to="/friends">
      <UsersIcon class="w-8 h-8 text-blue-500" />
    </router-link>
    <router-link to="/tasks">
      <PuzzlePieceIcon class="w-8 h-8 text-blue-500" />
    </router-link>
  </div>
</template>

<style scoped></style>
