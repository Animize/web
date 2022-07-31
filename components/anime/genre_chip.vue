<template>
  <div :class="pending ? 'animate-pulse' : ''" class="item w-auto h-auto flex-auto gap-1 p-1.5 overflow-hidden sm:overflow-x-scroll">
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

</template>

<script setup>

import {useAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()
const emit = defineEmits(['event:genreChange'])
const route = useRoute()

const {data: genres, pending, refresh} = await useAsyncData(
    'genres',
    () => $fetch(`${config.API_BASE_URL}/genre/list`)
)
refresh()

const setGenre = async (id) => {

  emit('event:genreChange', id)

}

defineExpose({
  genres
})

</script>

<style scoped>

</style>