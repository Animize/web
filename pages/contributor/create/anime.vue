<template>
  <div id="create-anime" class="p-8">
    <div class="animize-text-title text-2xl">
      Create anime
    </div>
    <form class="flex flex-col dark:text-white text-gray-900">
      <div class="item ">
        <div class="mt-4 text-left font-semibold text-xl">
          Name
        </div>
        <input id="simple-search"
               v-model="nameSearch"
               class="text-input"
               placeholder="Search"
               type="text">
      </div>
      <div class="item">
        <div class="mt-4 text-left font-semibold text-xl">
          Synopsis
        </div>
        <textarea id="simple-search"
               v-model="nameSearch"
               class="text-input"
               placeholder="Search"
               type="text"/>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">

</script>
