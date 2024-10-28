<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen w-full max-w-[480px] bg-black text-white flex flex-col">
    <header class="pt-6 text-center">
      <h1 class="text-2xl font-semibold">Admin Panel</h1>
    </header>

    <main class="flex-1 p-4 w-full">
      <div class="flex flex-col space-y-4">
        <!-- Sidebar -->
        <div class="w-full bg-gray-900 rounded-lg">
          <ul class="space-y-2">
            <li class="w-full">
              <router-link to="/admin/createTasks" class="block p-3 bg-gray-700 hover:bg-gray-600 rounded-md text-center w-full">
                Create Tasks
              </router-link>
            </li>
            <li class="w-full">
              <router-link to="/admin/listAllTasks" class="block p-3 bg-gray-700 hover:bg-gray-600 rounded-md text-center w-full">
                List All Tasks
              </router-link>
            </li>
            <li class="w-full">
              <router-link to="/admin/settings" class="block p-3 bg-gray-700 hover:bg-gray-600 rounded-md text-center w-full">
                Settings
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Main Content -->
        <div class="w-full p-4">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
