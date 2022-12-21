<template>
  <div class="flex flex-col">
    <div class="item w-full items-center flex flex-col md:flex-row text-left">
      <Carousel :settings="carouselSetting" :breakpoints="carouselBreakpoints" class="w-full h-auto">
        <Slide v-for="pkg in bannerPackages.content" :key="pkg.id">
          <div class="flex flex-col md:flex-row relative w-full aspect-[10/5] m-2">
            <nuxt-img :alt="`animize-${pkg.id}-cover-blur`" :src="pkg.cover ? pkg.cover : '/icon/img_notfound.png'"
                      class="object-cover opacity-30 w-full aspect-[10/5] absolute rounded-lg"/>
            <div
                class="flex flex-col md:flex-row relative p-8">
              <div class="flex flex-col leading-normal h-auto">
                <p class="mb-2 animize-text-subtitle">
                  {{ pkg.name }}</p>
                <p class="font-normal text-2xs text-gray-800 dark:text-white">Current episode: {{ pkg.currentEpisode }} of
                  {{ pkg.maxEpisode }}</p>
              </div>
            </div>
          </div>

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
import {Carousel, Navigation, Slide} from 'vue3-carousel'
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

<style scoped>

</style>