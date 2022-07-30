<template>
  <div class="container">
    <div :class="pending ? 'animate-pulse' : ''" class="flex gap-1 p-1.5 overflow-auto sm:overflow-x-scroll">
      <span
          :class="!route.query.genre ? 'bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white'"
          class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease"
          @click="setGenre(null)">
        All
      </span>
      <span
          v-for="item in genres"
          :class="item.id === route.query.genre ? 'bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white' "
          class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 dark:active:bg-gray-800 dark:active:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease"
          @click="setGenre(item.id)">
        {{ item.name }}
      </span>
    </div>
  </div>

</template>

<script setup>

import {navigateTo, useAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()
const route = useRoute()

const {data: genres, pending, refresh} = await useAsyncData(
    'genres',
    () => $fetch(`${config.API_BASE_URL}/genre/list`)
)
refresh()

const setGenre = async (id) => {

  const targetPath = route.path
  let query = null

  if (id) {
    query = {
      genre: id
    }
  }

  console.log(`Target path ${targetPath}`)
  await navigateTo({
    path: targetPath,
    query: query
  })
}

</script>

<style scoped>

</style>