<script setup lang="ts">
import Footer from './components/Footer.vue';



</script>

<template>
    
    <div class="flex flex-col min-h-screen">
    <!-- Основное содержимое -->
    <div class="flex flex-col w-full justify-center items-center gap-3 flex-grow">
      <div class="w-[220px]">
        <router-view/>
      </div>
    </div>

    <!-- Футер -->
    <Footer class="mt-auto" />
  </div>

</template>

<style scoped>
</style>
