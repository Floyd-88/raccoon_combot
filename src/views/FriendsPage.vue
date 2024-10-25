<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "../stores/app";
import { useTelegram } from "../services/telegram";

const app = useAppStore();
const { telegramUser } = useTelegram();

const referalText = ref("Your referal");

const friends = computed(() =>
  app.user
    ? Object.keys(app.user.friends || {}).map((id) => ({
        id,
        name: app.user ? app.user.friends[id] : '',
      }))
    : []
);

function copy() {
  const url = telegramUser?.id
    ? "https://t.me/raccoon_clicker_bot?start=" + telegramUser.id
    : "https://t.me/raccoon_clicker_bot";

  navigator.clipboard.writeText(url);
  referalText.value = "Copied!";
}
</script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <h1 class="text-2xl font-bold mb-4">Your Friends</h1>
    <button
      class="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded-3xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      :class="{
        'bg-gray-500 hover:bg-gray-500 hover:scale-100':
          referalText === 'Copied!',
      }"
      @click="copy"
    >
      {{ referalText }}
    </button>
    <h3 class="text-lg mb-2" v-if="friends.length === 0">Друзей пока нет</h3>

    <ul class="flex flex-col gap-2">
      <li
        class="flex justify-between bg-gray-800 w-[200px] px-2 py-2 rounded-2xl"
        v-for="friend in friends"
        :key="friend.id"
      >
        {{ friend.name }}
        <span class="bg-green-600 px-2 mr-1 py-0 rounded-2xl">50</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
