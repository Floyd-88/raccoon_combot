<template>
    <div class="loader"></div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .loader {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left: 8px solid #3498db; 
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin .7s linear infinite;
    position: relative;
    margin: 0 auto; 
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  