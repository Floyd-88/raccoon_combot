<script setup lang="ts">
import { onMounted } from "vue";
import Footer from "./components/Footer.vue";
import { useTelegram } from "./services/telegram";
import { useAppStore } from "./stores/app";
import { ref } from "vue";
import AppLoader from "./ui/AppLoader.vue";

const isLoader = ref(false);
const app = useAppStore();
const { tg } = useTelegram() || {};

const urlParams = new URLSearchParams(window.location.search);

onMounted(async () => {
  isLoader.value = true;

  try {
    await app.init(urlParams.get("ref") || "");
  } catch (error) {
    console.error("Error during app initialization:", error);
  } finally {
    isLoader.value = false;
  }

  if (tg?.ready && tg?.expand) {
    tg.ready();
    tg.expand();
  } else {
    console.error("Telegram WebApp SDK is not available.");
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Основное содержимое -->
    <div
      class="flex flex-col w-full justify-center items-center gap-3 flex-grow"
    >
      <div class="flex justify-center w-full pb-[100px]" v-if="!isLoader">
        <router-view />
      </div>
      <div v-else class="text-white">
        <AppLoader />
      </div>
    </div>

    <!-- Футер -->
    <Footer class="mt-auto fixed bottom-0 h-20" />
  </div>
</template>

<style scoped></style>
