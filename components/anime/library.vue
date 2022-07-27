<template>
  <div class="flex-inline">
    <div :class="pending ? 'animate-pulse' : ''"
         class="item w-auto h-auto flex-grow grid p-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5  gap-1.5">
      <div v-for="item in packages.content"
           class="hover:scale-110 dark:hover:bg-gray-700 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease">
        <img alt=""
             class="rounded-t-lg object-center h-68 w-96"
             v-bind:src="'https://cdn.dvnlabs.xyz/pkg/' + item.id +'.jpg'"/>
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden">
            {{
              item.name
            }}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden">{{
              item.synopsis
            }}</p>
          <a class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             href="#">
            Read more
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    fill-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <nav class="item flex-auto items-center">
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="page === 0 ? 0 : page--">
            <span class="sr-only">Previous</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    fill-rule="evenodd"></path>
            </svg>
          </a>
        </li>
        <li v-for="numPage in packages.totalPages">
          <a
              :aria-current="numPage === page + 1 ? 'page' : 'false'"
              :class="numPage === page + 1 ? 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
              @click="page = numPage - 1"

          >{{ numPage }}</a>
        </li>
        <li>
          <a class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="page++">
            <span class="sr-only">Next</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>

  </div>

</template>
<script setup>
import {useAsyncData, useRuntimeConfig, useState} from "nuxt/app";
import {computed, watch} from "vue";

const page = useState('page', () => 0)
const size = useState('size', () => 10)

const queryString = computed(() => {
  return `?page=${page.value}&size=${size.value}`
})

const config = useRuntimeConfig()
const {data: packages, pending, refresh} = await useAsyncData(
    'packages',
    () => $fetch(`${config.API_BASE_URL}/packages/page${queryString.value}`)
)

watch(() => queryString.value, () => refresh())

refresh()

</script>

<style scoped>

</style>