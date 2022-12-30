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
            <nuxt-img :alt="`animize-${pkg.id}-cover-blur`" :src="pkg.cover ? pkg.cover : '/icon/img_notfound.png'"
                      class="object-cover opacity-30 w-full aspect-[10/5] absolute rounded-lg z-0 transition-all duration-300	group-hover:opacity-50 group-hover:blur"/>
            <div class="h-fit w-full pr-2 pl-2 bottom-0 visible group-hover:invisible">
              <span class="item animize-text-subtitle line-clamp-3">
                {{ pkg.name }}</span>
              <span class="item font-normal text-2xs text-gray-800 dark:text-white">Current episode: {{ pkg.currentEpisode }} of
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
    <div class="item relative flex items-center justify-between m-2">
      <div class="left-0 animize-text-subtitle">
        Editors pick
      </div>
      <div class="right-0 chip transition-colors ease-in duration-200">
        See more
      </div>
    </div>
  </div>

</template>
<script setup>
const config = useRuntimeConfig()
const carouselSetting = {
  itemsToShow: 1
}
const carouselBreakpoints = {
  700:{
    itemsToShow: 2.5
  }
}
import {Carousel, Pagination, Slide} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'


const {data: bannerPackages, pending, refresh} = await useLazyAsyncData(
    'bannerPackages',
    () => $fetch(`${config.API_BASE_URL}/packages/page?page=0&size=10&sort=name,desc`)
)

onMounted(() => {
  nextTick(() => {
    refresh()
  })
})

defineExpose({})
</script>
