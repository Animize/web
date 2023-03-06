<template>
  <div class="flex flex-col">
    <div v-if="!pending" class="item w-full items-center flex flex-col md:flex-row text-left">
      <Carousel
          :settings="carouselSetting" :breakpoints="carouselBreakpoints" :autoplay="0" :wrapAround="true"
          :pauseAutoplayOnHover="true" :transition="500" class="w-full h-auto">
        <Slide v-for="pkg in bannerPackages.data.content" :key="pkg.id">
          <NuxtLink
              class="flex flex-col md:flex-row relative w-full aspect-[10/5] m-2 z-0 group transition duration-300 ease"
              :to="`/package/${pkg.id}`"
          >
            <NuxtImg :alt="`animize-${pkg.id}-cover-blur`" :src="pkg.cover ? pkg.cover : '/icon/img_notfound.png'"
                     class="object-cover opacity-30 w-full aspect-[10/5] absolute rounded-lg z-0 transition-all duration-300	group-hover:opacity-50 group-hover:blur"
                     :placeholder="[100, 50, 10]"/>
            <div class="h-fit w-full pr-2 pl-2 bottom-0 visible group-hover:invisible">
              <span class="item animize-text-subtitle line-clamp-3">
                {{ pkg.name }}</span>
              <span class="item font-normal text-2xs text-gray-800 dark:text-white">Current episode: {{
                  pkg.currentEpisode
                }} of
                {{ pkg.maxEpisode }}</span>
            </div>
            <div
                class="h-full w-full p-6 z-20 invisible group-hover:visible bg-gradient-to-t from-gray-900 rounded absolute">
              <h5 class="mb-4 text-sm font-semibold  text-white line-clamp-6 sm:line-clamp-7 md:line-clamp-8 lg:line-clamp-12">
                {{
                  pkg.synopsis
                }}</h5>
            </div>
          </NuxtLink>

        </Slide>
      </Carousel>
    </div>
    <div class="item flex flex-col md:flex-row">
      <div class="basis-1/2 h-96 card p-2 m-2 flex flex-col">
        <LazyCommonShimmerCard v-if="historyPending"/>
        <div v-if="credential && history?.data?.totalElements > 0"
             class="item relative flex items-center justify-between m-2">
          <div class="left-0 animize-text-subtitle">
            Resume what you left
          </div>
          <div class="right-0 chip transition-colors ease-in duration-200">
            See more
          </div>
        </div>
        <div v-if="credential && history?.data?.totalElements > 0" class="item w-full h-full overflow-y-auto">
          <div v-for="hst in history?.data?.content" :key="hst?.id" class="flex flex-row p-4">
            <LazyNuxtImg class="basis-1/4 aspect-[7/10] w-4" :src="hst?.packages?.cover ?? '/icon/img_notfound.png'"/>
            <div class="basis-3/4">
              <div class="animize-text-subtitle p-2 line-clamp-2">
                {{ hst?.packages?.name }}
              </div>
              <div class="animize-text-subtitle text-sm ml-2">
                Episode: {{ hst?.episodes?.episode }}
              </div>
              <NuxtLink
                  :to="`/package/episode/${hst?.packages?.id}/${hst?.episodes?.id}`">
                <button class="button button-primary">
                  Resume at {{ convertSecondToVideoDurationFormat(hst?.currentWatchTime ?? 0) }}
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/2 h-96 card p-2 m-2 flex flex-col">
        <LazyCommonShimmerCard v-if="favoritesPending"/>
        <div v-if="credential && favorites?.data?.totalElements > 0"
             class="item relative flex items-center justify-between m-2">
          <div class="left-0 animize-text-subtitle">
            Your favorited anime
          </div>
          <div class="right-0 chip transition-colors ease-in duration-200">
            See more
          </div>
        </div>
        <div v-if="credential && favorites?.data?.totalElements > 0" class="item w-full h-full overflow-y-auto">
          <div v-for="fvr in favorites?.data?.content" :key="fvr?.id" class="flex flex-row p-4">
            <LazyNuxtImg class="basis-1/4 aspect-[7/10] w-4" :src="fvr?.packages?.cover ?? '/icon/img_notfound.png'"/>
            <div class="basis-3/4">
              <div class="animize-text-subtitle p-2 line-clamp-2">
                {{ fvr?.packages?.name }}
              </div>
              <div class="animize-text-subtitle text-sm ml-2">
                Episode: {{ fvr?.packages?.currentEpisode }}
              </div>
              <NuxtLink
                  :to="`/package/${fvr?.packages?.id}`">
                <button class="button button-primary">
                  See anime
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script setup lang="ts">
import {Carousel, Slide} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {convertSecondToVideoDurationFormat} from "~/composables/util/VideoUtils";

const credential = useState('credential')
const config = useRuntimeConfig()

const carouselSetting = {
  itemsToShow: 1
}

const carouselBreakpoints = {
  700: {
    itemsToShow: 2.5
  }
}

const {data: bannerPackages, pending, refresh} = await useLazyAsyncData(
    'bannerPackages',
    () => $fetch<any>(`${config.API_BASE_URL}/packages/page?page=0&size=10&sort=name,desc`)
)


const {data: history, pending: historyPending, refresh: historyRefresh} = await useLazyAsyncData(
    'homeHistory',
    () => useAPI<any>(`${config.API_BASE_URL}/myself/watch?page=0&size=5&sort=lastModifiedDate,desc`),
    {
      immediate: false,
      watch: [
        credential
      ]
    }
)

const {data: favorites, pending: favoritesPending, refresh: favoritesRefresh} = await useLazyAsyncData(
    'homeFavorites',
    () => useAPI<any>(`${config.API_BASE_URL}/myself/favorites?page=0&size=5&sort=createdDate,desc`),
    {
      immediate: false,
      watch: [
        credential
      ]
    }
)


onMounted(() => {
  nextTick(() => {
    refresh()
  })
})

defineExpose({})
</script>
