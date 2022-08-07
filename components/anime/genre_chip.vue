<template>
  <div id="genre-chip">
    <div v-if="pending"
         class="item w-auto h-auto flex-auto gap-1 p-1.5 overflow-hidden overflow-x-scroll">
    <span
        v-for="item in 5" :key="item"
        class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 dark:active:bg-gray-800 dark:active:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease"
    >
      </span>
    </div>

    <div v-if="!pending"
         class="item w-auto h-auto flex-auto gap-1 p-1.5 overflow-hidden overflow-x-scroll">
    <span
        v-for="item in genres"
        :class="item.id === (route.query.genre ? route.query.genre : null) ? 'bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white' "
        class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 dark:active:bg-gray-800 dark:active:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease"
        @click="setGenre(item.id)">
        {{ item.name }}
      </span>
    </div>
  </div>


</template>

<script setup>

import {useLazyAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";
import {watch} from "vue";

const config = useRuntimeConfig()
const emit = defineEmits(['event:genreChange'])
const route = useRoute()

const {data: genres, pending, refresh} = await useLazyAsyncData(
    'genres',
    () => $fetch(`${config.API_BASE_URL}/genre/list`)
        .then((result) => {
          result.unshift({
            id: null,
            name: 'All'
          })
          return result
        })
)

watch(pending, () => {
  console.log(`Pending ${pending.value}`)
})

const setGenre = async (id) => {
  emit('event:genreChange', id)
}

defineExpose({
  genres,
  pending
})

</script>

<style scoped>

</style>