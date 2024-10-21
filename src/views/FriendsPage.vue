<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <h1 class="text-2xl font-bold mb-4">Your Friends</h1>
    <button
      class="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded-3xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      Your Referral
    </button>
    <h3 class="text-lg mb-2">No friends yet</h3>

    <ul class="flex flex-col gap-2">
      <li class="flex justify-between bg-gray-800 w-[200px] px-2 py-2 rounded-2xl">
        Alex
        <span class="bg-green-600 px-2 mr-1 py-0 rounded-2xl">50</span>
      </li>
      <li class="flex justify-between bg-gray-800 w-[200px] px-2 py-1 rounded-2xl">
        Rick
        <span class="bg-green-600 px-2 mr-1 py-0 rounded-2xl">70</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
