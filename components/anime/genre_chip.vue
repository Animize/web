<template>
  <div class="container">
    <div class="flex gap-1 p-1.5 overflow-scroll" :class="pending ? 'animate-pulse' : ''">
      <span
          :class="!route.query.genre ? 'bg-gray-300 text-gray-800' : 'dark:bg-gray-800 dark:text-white'"
          class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 hover:bg-gray-700 transition duration-300 ease">
        All
      </span>
      <span
          v-for="item in genres"
          class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 hover:bg-gray-700 transition duration-300 ease">
        {{ item.name }}
      </span>
    </div>
  </div>

</template>

<script setup>

import {useAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()
const route = useRoute()

const {data: genres, pending, refresh} = await useAsyncData(
    'genres',
    () => $fetch(`${config.API_BASE_URL}/genre/list`)
)
console.log(route.query)
refresh()

</script>

<style scoped>

</style>