<template>
  <div v-if="!pkgError" :id="`animize-${pkgID}`">
    <Head v-if="!pending && pkg.errCode === 0">
      <Title>
        {{ pkg ? pkg.data.name : 'Animize' }}
      </Title>
      <Meta :content="pkg ?`Animize - ${pkg.data.synopsis}`  : 'Animize'" name="description"/>
    </Head>
    <LazyCommonLoading v-if="pending"/>
    <div v-if="!pending && pkg.errCode === 0" class="flex flex-col">
      <div id="anime-header">
        <nuxt-img :alt="`animize-${pkgID}-cover-blur`" :src="pkg.data.cover ? pkg.data.cover : '/icon/img_notfound.png'"
                  class="object-cover w-full h-96 blur min-h-0 absolute opacity-30"/>
        <div
            class="flex flex-col items-center md:flex-row relative">
          <nuxt-img :alt="`animize-${pkgID}-cover`"
                    :src="pkg.data.cover ? pkg.data.cover : '/icon/img_notfound.png'"
                    class="object-cover w-48 h-72 rounded md:h-auto md:w-48 shadow m-8 hover:scale-110"/>
          <div class="flex flex-col justify-between p-4 gap-2 leading-normal w-full">
            <p class="mb-2 p-2 animize-text-title text-ellipsis overflow-hidden">
              {{ pkg.data.name }}</p>
            <p class="font-normal text-2xs text-gray-800 dark:text-white">Current episode: {{ pkg.data.currentEpisode }}
              of
              {{ pkg.data.maxEpisode }}</p>
            <div class="font-normal flex inline-flex gap-2.5">
              <div class="flex flex-inline text-sm font-medium text-center items-center dark:text-white">
                Rating:
                {{ pkg.data.rating }}
              </div>
              <div
                  :class="pkg.data.safeContent === 'SAFE' ? 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' : 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'"
                  class="item py-2 px-3 w-auto text-sm font-medium text-center inline-flex items-center text-white rounded-lg focus:ring-4 focus:outline-none">
                {{ pkg.data.safeContent }}
              </div>
            </div>
            <div class="font-normal flex inline-flex gap-2.5">
              <button
                  v-if="!favorite"
                  class="py-2 px-3 w-40 button button-neutral"
                  @click="actionFavorites"
              >
                <StarUnFilled class="w-10 h-10"/>
                Add to library
              </button>
              <button
                  v-else
                  class="py-2 px-3 w-40 button button-neutral"
                  @click="actionFavorites"
              >
                <StarFilled class="w-10 h-10" name="star-filled"/>
                Added on library
              </button>
              <a :href="`https://myanimelist.net/anime/${pkg.data.malId}`"
                 class="py-2 px-3 w-40 button button-primary"
                 target="_blank">
                <img alt="mal" class="w-10 h-10" src="~/assets/icon/mal.svg?url"/>
                MyAnimeList
              </a>
            </div>

            <div
                class="item w-auto h-auto flex-auto gap-2.5 pt-5 pb-5 overflow-hidden overflow-x-auto">
              <NuxtLink
                  v-for="item in pkg.data.genreList"
                  :key="item.id" :to="`/anime?page=1&genre=${item.id}`"
                  class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300 active:text-gray-800 dark:active:animize-foreground dark:active:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease text-gray-500 bg-gray-200 dark:animize-foreground dark:text-white mr-1"
              >{{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div id="anime-description" class="item flex-col mt-8 p-8">
        <p class="text-2xs font-normal dark:text-white text-gray-800 text-justify" style="white-space: pre-line;">
          {{ pkg.data.synopsis }}</p>
      </div>
      <div v-if="!episodePending" id="anime-episode" class="item flex-inline flex-wrap mt-4 p-8">
        <div v-if="episodes ? episodes.data.length !== 0 : false"
             class="item w-full h-auto flex-grow grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5  gap-2.5">
          <NuxtLink
              v-for="episode in episodes ? episodes.data : []"
              :key="episode.id"
              :to="`/package/${pkgID}-ep/${episode.id}`"
              class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl h-auto
              w-full hover:scale-110 dark:hover:bg-gray-700 bg-white border border-gray-200
              shadow-md dark:animize-foreground dark:border-gray-700 transition duration-300 ease">
            <span
                class="object-cover md:w-16 md:h-32 w-full h-auto xl:rounded-l-lg md:rounded-l-lg rounded-t-lg dark:text-white text-6xl dark:bg-gray-600">
              {{ episode.episode }}
            </span>
            <span class="text-2xl line-clamp-3 dark:text-white">
              {{ episode.summary ? episode.summary : 'Nothing to be told' }}
            </span>
          </NuxtLink>
        </div>
        <div v-else class="text-xl italic font-medium text-center items-center dark:text-white">
          Currently no episode listed here.
        </div>

      </div>
    </div>
  </div>
  <div v-else>
    {{ pkgError.data.message }}
  </div>
</template>

<script setup>
import StarFilled from '@/assets/icon/star-filled.svg?component'
import StarUnFilled from '@/assets/icon/star-unfilled.svg?component'

const route = useRoute()
const config = useRuntimeConfig()
const {pkgID} = route.params

const {data: pkg, pending: pending, refresh: refresh, error: pkgError} = await useLazyAsyncData(
    'pkg',
    () => useAPI(`${config.API_BASE_URL}/packages/by-id/${pkgID}`, {key: pkgID})
)


const {data: episodes, pending: episodePending, refresh: episodeRefresh, error: episodeError} = await useLazyAsyncData(
    'episodes',
    () => $fetch(`${config.API_BASE_URL}/episodes/list`, {key: pkgID, params: {packageID: pkgID}})
)

const {
  data: favorite,
  pending: favoritePending,
  refresh: favoriteRefresh,
  error: favoriteError
} = await useLazyAsyncData(
    'favorite',
    () => useAPI(`${config.API_BASE_URL}/myself/favorite/${pkgID}`, {key: pkgID}),
    {
      server : false
    }
)


watch(pkgError, (err) => {
  pkgError.value = err
  if (pkgError.value) {
    throw createError({statusCode: 404, statusMessage: 'Test', fatal: true})
  }

})


watch(episodeError, (err) => {
  episodeError.value = err
  if (episodeError) {
    throw createError({statusCode: 500, statusMessage: 'Test'})
  }

})

const actionFavorites = async () => {
  if (process.client) {
    await useLazyAsyncData('actionFavorites', () => useAPI(`/myself/favorite/${pkgID}`,
        {
          method: 'PATCH',
        }
    ))
  }
}

</script>