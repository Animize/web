<template>
  <div class="flex-inline flex-wrap">
    <Genre_chip ref="genreChip" class="item" @event:genreChange="genreChange"></Genre_chip>
    <div v-if="!pending" :class="pending ? 'animate-pulse' : ''"
         class="item w-auto h-auto flex-grow grid p-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5  gap-1.5">
      <div v-for="item in packages.content"
           class="hover:scale-110 dark:hover:bg-gray-700 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease">
        <img alt=""
             class="rounded-t-lg object-center h-68 w-96"
             v-bind:src="'https://cdn.dvnlabs.xyz/pkg/' + item.id +'.jpg'"/>
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-3">
            {{
              item.name
            }}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-6">{{
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
    <div v-if="pending" class="flex items-center justify-center h-screen">
      <div role="status">
        <svg aria-hidden="true" class="mr-2 w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             fill="none" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
        <span class="sr-only dark:text-white text-gray-800">Loading...</span>
      </div>
    </div>

    <div v-if="packages.totalPages === 0 && !pending" class="flex items-center justify-center h-screen">
      <not_found></not_found>
    </div>

    <nav class="item flex justify-center">
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="changePage(page - 2,packages.totalPages)">
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
              @click="changePage(numPage,packages.totalPages)"

          >{{ numPage }}</a>
        </li>
        <li>
          <a class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="changePage(page + 2,packages.totalPages)">
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
import {navigateTo, useAsyncData, useRoute, useRuntimeConfig, useState} from "nuxt/app";
import {computed, ref, watch} from "vue";
import Genre_chip from "./genre_chip";
import Not_found from "../common/not_found";

const route = useRoute()
const page = useState('page', () => 0)
const size = useState('size', () => 10)
const genres = useState('genres', () => [])
const targetPath = route.path
const genreChip = ref(null)


const queryStringRequest = computed(() => {
  let query = `?page=${page.value}&size=${size.value}`

  for (const genre of genres.value) {
    query += `&genreIds=${genre}`
  }

  return query
})

const pageQuery = computed(() => route.query.page ? route.query.page : 1)
const genreQuery = computed(() => route.query.genre ? route.query.genre : null)

const config = useRuntimeConfig()
const {data: packages, pending, refresh} = await useAsyncData(
    'packages',
    () => $fetch(`${config.API_BASE_URL}/packages/page${queryStringRequest.value}`)
)

const genre = useState('genre', () => null)


watch(() => queryStringRequest.value, () => refresh())


const changePage = async (pageNumber, totalPages) => {
  if (pageNumber < 1) {
    pageNumber = 1
  } else if (pageNumber > totalPages) {
    pageNumber = pageNumber - 1
  }

  const query = {
    page: pageNumber,
    genre: route.query.genre
  }

  navigateTo(
      {
        path: targetPath,
        query: query
      }
  )
}

watch(pageQuery, async (newPageQuery) => {
  page.value = newPageQuery - 1
})

watch(genreQuery, (newGenre) => {
  if (newGenre) {
    genres.value.pop()
    genres.value.push(newGenre)
  } else {
    genres.value.pop()
  }
  genre.value = genreChip.value.genres.filter((value) => value.id === newGenre)[0]
})

const genreChange = async (id) => {
  if (id) {
    navigateTo(
        {
          path: targetPath,
          query: {
            page: 1,
            genre: id
          }
        }
    )
  } else {
    navigateTo(
        {
          path: targetPath,
          query: {
            page: 1
          }
        }
    )
  }
}

refresh()

</script>

<style scoped>

</style>