<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppStore } from "../stores/app";
import { useTelegram } from "../services/telegram";
import List from "../components/List.vue";
import Item from "../components/Item.vue";
import { usePointStore } from "../stores/score";

const app = useAppStore();
const points = usePointStore()
const { telegramUser } = useTelegram();

const referalText = ref("Ваша реферальная ссылка");

const friends = computed(() =>
  app.user
    ? Object.keys(app.user.friends || {}).map((id) => ({
        id,
        name: app.user ? app.user.friends[id] : "",
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
  <div
    class="flex flex-col justify-center w-full px-4 pt-6 max-w-[900px] items-center text-white"
  >
    <h2 class="text-4xl font-bold mb-8">Your friends</h2>
    <button
      class="bg-blue-500 w-full max-w-60 mb-8 text-white text-base font-bold py-4 px-4 rounded-3xl"
      :class="{
        'hover:scale-105 shadow-[0px_4px_10px_rgba(0,153,255,0.4),_0px_6px_20px_rgba(0,153,255,0.3)] transition duration-300 ease-in-out transform  hover:shadow-[0px_6px_14px_rgba(0,153,255,0.6),_0px_8px_24px_rgba(0,153,255,0.4)]':
          referalText !== 'Copied!',
        'bg-gray-500 hover:bg-gray-500 scale-100 cursor-auto':
          referalText === 'Copied!',
      }"
      @click="copy"
    >
      {{ referalText }}
    </button>
    <h3 class="text-lg mb-2" v-if="friends.length === 0">Друзей пока нет</h3>
    <List>
      <Item
        v-for="friend in friends"
        :key="friend.id"
        :title="friend.name"
        :amount="points.bonusPointsForFriend"
        shadow="friends"
      />
    </List>
  </div>
</template>

<style scoped></style>
