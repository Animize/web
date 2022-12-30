<template>
  <div class="p-4">
    <Head v-if="!episodePending">
      <Title>
        {{packages ? packages.data.name : 'Animize'}} | Episode {{episode.data.episode ? episode.data.episode : '0'}}
      </Title>
      <Meta
          :content="episode ?`Episode ${episode.data.episode}, ${episode.data.summary ? episode.data.summary : 'Nothing to be told'}`  : 'Animize'"
          name="description"/>
    </Head>
    <div v-if="episode && !episodePending" class="flex-inline flex-col">
      <div class="item w-full items-center flex flex-col md:flex-row text-justify m-2 gap-2">
        <video-player ref="animizePlayer"
                      :controls="true"
                      :sources="videoPlayerSource"
                      class="w-full aspect-[10/7]"
                      @mounted="videoPlayerOnMounted"
        />

      </div>
      <div class="item w-full items-center flex flex-col md:flex-row text-left m-2 gap-2">
        <Carousel :items-to-show="1" class="w-full">
          <Slide v-for="episode in episodes.data" :key="episode.id">
            <NuxtLink
                :to="`/package/${pkgID}-ep/${episode.id}`"
                class="item flex flex-col items-start dark:text-white p-8 m-2">
              <span class="item text-xl">Episode {{ episode.episode }}</span>
              <span class="item line-clamp-2 dark:text-white italic">{{
                  episode.summary ? episode.summary : 'Nothing to be told'
                }}</span>
            </NuxtLink>
          </Slide>
          <template #addons>
            <Navigation/>
          </template>
        </Carousel>
      </div>
      <div class="item w-full items-center flex flex-col md:flex-row relative rounded shadow-lg dark:animize-foreground
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2">
        <nuxt-img :alt="`animize-${pkgID}-cover`"
                  :src="packages ? packages.data.cover : '/icon/img_notfound.png'"
                  class="object-cover w-48 aspect-[7/10] rounded shadow"/>
        <div class="flex flex-col justify-between gap-2 leading-normal h-auto">
          <div class="item text-3xl font-bold flex-wrap w-full">
            {{ packages.data.name }}
          </div>
          <div class="item text-2xs-sm flex-wrap w-full">
            {{ packages.data.synopsis }}
          </div>
        </div>
      </div>
      <div class="item w-full items-center flex-row md:flex-row rounded shadow-lg dark:animize-foreground
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2">
        <div class="item flex flex-col text-2xl font-bold flex-wrap w-full">
          Sources
        </div>
        <div class="item w-auto h-auto flex flex-wrap gap-2 p-2">
          <div v-for="src in videoPlayerSource"
               class="chip transition-colors ease-in duration-200">
            {{ src.label }}
          </div>

        </div>
      </div>

    </div>
    <NotFound v-if="!episode && !episodePending" class="flex items-center justify-center h-screen"></NotFound>
    <Loading v-if="episodePending" class="flex items-center justify-center h-screen"/>
  </div>

</template>

<script setup>
import NotFound from "@/components/common/NotFound";
import Loading from "@/components/common/Loading";
import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'


const route = useRoute()
const config = useRuntimeConfig()
const anmID = computed(() => route.params.anmID)
const pkgID = computed(() => route.params.pkgID)

const hideEpisodeSelector = useState('hideEpisodeSelector', () => true)
const animizePlayer = useState('animizePlayer', () => null)

const {data: episode, episodePending, refresh: episodeRefresh} = await useLazyAsyncData(
    'episode',
    () => $fetch(`${config.API_BASE_URL}/episodes/by-id/${anmID.value}`)
)


const {data: packages, packagesPending, refresh: packagesRefresh} = await useLazyAsyncData(
    'packages',
    () => $fetch(`${config.API_BASE_URL}/packages/by-id/${pkgID.value}`)
)

const {data: episodes, episodesPending, refresh: episodesRefresh} = await useLazyAsyncData(
    'episodes',
    () => $fetch(`${config.API_BASE_URL}/episodes/list?packageID=${pkgID.value}`)
)

const {data: sources, sourcesPending, refresh: sourcesRefresh} = await useLazyAsyncData(
    'sources',
    () => $fetch(`${config.API_BASE_URL}/episodes/sources/${anmID.value}`)
)

const videoPlayerSource = computed(() => {
  return sources.value.data ? sources.value.data
      .map(e => ({
        src: e.sourcesURL,
        label: `${e.contentLang} - ${e.contentQuality}`,
        type: 'video/mp4'
      })) : []
})

episodesRefresh()

const videoPlayerOnMounted = () => {
}

onMounted(() => {
  nextTick(async () => {
    await packagesRefresh()
    await sourcesRefresh()
    await episodeRefresh()
    await episodesRefresh()
  })
})

</script>