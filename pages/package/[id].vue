<template>
  <div :id="`animize-${pkgId}`">
    <Head v-if="!pending">
      <Title>
        {{pkg.name ? pkg.name : 'Animize'}}
      </Title>
      <Meta :content="pkg.synopsis ? pkg.synopsis : 'Animize'" name="description"/>
    </Head>
    <animize_loading v-if="pending"></animize_loading>
    <div v-if="!pending" class="flex flex-col">
      <div id="anime-header">
        <img :alt="`animize-${pkgId}-cover-blur`" :srcset="pkg.cover ? pkg.cover : '/icon/img_notfound.png'"
             class="object-cover w-full h-96 blur min-h-0 absolute opacity-30">
        <div
            class="flex flex-col items-center md:flex-row relative">
          <img :alt="`animize-${pkgId}-cover`"
               :srcset="pkg.cover ? pkg.cover : '/icon/img_notfound.png'"
               class="object-cover w-48 h-72 rounded md:h-auto md:w-48 shadow m-8 hover:scale-110"/>
          <div class="flex flex-col justify-between p-4 gap-2 leading-normal h-auto">
            <p class="mb-2 text-5xl font-bold tracking-tight text-gray-800 dark:text-white lg:max-w-[1024px]">
              {{ pkg.name }}</p>
            <p class="font-normal text-2xs text-gray-800 dark:text-white">Current episode: {{ pkg.currentEpisode }} of
              {{ pkg.maxEpisode }}</p>
            <div class="font-normal flex inline-flex gap-2.5">
              <div class="flex flex-inline text-sm font-medium text-center items-center text-white">
                <svg aria-hidden="true" class="item w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"><title>Rating</title>
                  <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {{ pkg.rating }}
              </div>
              <div
                  :class="pkg.safeContent === 'SAFE' ? 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' : 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'"
                  class="item py-2 px-3 w-auto text-sm font-medium text-center inline-flex items-center text-white rounded-lg focus:ring-4 focus:outline-none">
                {{ pkg.safeContent }}
              </div>
            </div>
            <a :href="`https://myanimelist.net/anime/${pkg.malId}`"
               class="py-2 px-3 w-40 button-primary"
               target="_blank">
              <img alt="mal" class="mr-2 -ml-1 w-10 h-10" src="~/assets/icon/mal.svg"/>
              MyAnimeList
            </a>
            <div
                class="item w-auto h-auto flex-auto gap-2.5 pt-5 pb-5 overflow-hidden overflow-x-auto">
              <NuxtLink
                  :to="`/anime?page=1&genre=${item.id}`"
                  v-for="item in pkg.genreList" :key="item.id"
                  class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 dark:active:bg-gray-800 dark:active:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white mr-1"
              >{{ item.name }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div id="anime-description" class="item flex-col mt-8 p-8">
        <p class="text-2xs font-normal dark:text-white text-gray-800 text-justify" style="white-space: pre-line;">
          {{ pkg.synopsis }}</p>
      </div>
      <div id="anime-episode" class="item flex-inline flex-wrap mt-10 p-8">
        <div v-if="!episodePending"
             class="item w-auto h-auto flex-grow grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5  gap-2.5">
          <div
              v-for="episode in episodes"
              :key="episode.id"
              class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl h-auto w-72 hover:scale-110 dark:hover:bg-gray-700 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease">
            <span class="object-cover w-16 h-32 rounded-l-lg dark:text-white text-6xl dark:bg-gray-600">
              {{ episode.episode }}
            </span>
            <span class="text-2xl line-clamp-3 dark:text-white">
              {{ episode.summary ? episode.summary : 'N/A' }}
            </span>
          </div>
        </div>
        <div v-else class="item w-auto h-auto flex-grow grid p-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5  gap-1.5">
          <div
              v-for="episode in 10"
              class="h-32 w-72 hover:scale-110 dark:hover:bg-gray-700 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Animize_loading from "@/components/common/animize_loading"


const route = useRoute()
const config = useRuntimeConfig()
const pkgId = useState(() => route.params.id)

const {data: pkg, pending, refresh: refresh} = await useLazyAsyncData(
    'pkg',
    () => $fetch(`${config.API_BASE_URL}/packages/by-id/${pkgId.value}`)
)

const {data: episodes, episodePending, refresh: episodeRefresh} = await useLazyAsyncData(
    'episodes',
    () => $fetch(`${config.API_BASE_URL}/episodes/list?packageID=${pkgId.value}`)
)

watch(pkgId, () => {
  refresh()
  episodeRefresh()
})

onMounted(() => {
  pkgId.value = route.params.id
})
</script>

<style scoped>

</style>