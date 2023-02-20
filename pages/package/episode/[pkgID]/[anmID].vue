<template>
  <div v-if="!episodePending" class="p-4">
    <Head v-if="!packagesPending && !episodesPending">
      <Title>
        {{packages?.data?.name ?? 'Animize'}} | Episode {{episode?.data?.episode ?? '0'}}
      </Title>
      <Meta
          :content="episode ?`Episode ${episode?.data?.episode ?? 0}, ${episode?.data?.summary ?? 'Nothing to be told'}`  : 'Animize'"
          name="description"/>
    </Head>
    <div v-if="!episodePending" class="flex-inline flex-col">
      <div class="item w-full items-center flex flex-col md:flex-row text-justify m-2 gap-2">
        <video-player v-show="videoPlayerSource"
                      id="animize-player"
                      ref="animizePlayer"
                      :options="playerOptions"
                      :controls="true"
                      :sources="videoPlayerSource"
                      class="w-full aspect-[10/7]"
                      @mounted="videoPlayerLoad"
                      @ready="videoPlayerReady"
        />
        <LazyCommonShimmerVideo v-show="!videoPlayerSource"/>

      </div>
      <div class="item w-full items-center flex flex-col md:flex-row text-left m-2 gap-2">
        <Carousel v-if="!episodesPending" :items-to-show="1" class="w-full">
          <Slide v-for="episode in episodes.data" :key="episode.id">
            <NuxtLink
                :to="`/package/episode/${pkgID}/${episode.id}`"
                class="item flex flex-col items-start dark:text-white">
              <div class="item text-xl">Episode {{ episode.episode }}</div>
              <div class="item dark:text-white italic w-full">{{
                  episode?.summary ?? 'Nothing to be told'
                }}
              </div>
            </NuxtLink>
          </Slide>
          <template #addons>
            <Navigation/>
          </template>
        </Carousel>
        <LazyCommonShimmerCarousel v-if="episodesPending" class="w-full"/>
      </div>
      <div v-if="!packagesPending" class="item w-full items-center flex flex-col md:flex-row relative rounded shadow-lg dark:animize-foreground
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2">
        <nuxt-img :alt="`animize-${pkgID}-cover`"
                  :src="packages?.data?.cover ?? '/icon/img_notfound.png'"
                  class="object-cover w-48 aspect-[7/10] min:h-72 rounded shadow"/>
        <div class="flex flex-col justify-between gap-2 leading-normal h-auto">
          <div class="item text-3xl font-bold flex-wrap w-full">
            {{ packages.data.name }}
          </div>
          <div class="item text-2xs-sm flex-wrap w-full">
            {{ packages.data.synopsis }}
          </div>
        </div>
      </div>
      <LazyCommonShimmerCard v-if="packagesPending" class="item w-full items-center flex flex-col md:flex-row relative rounded shadow-lg dark:animize-foreground
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2"/>
      <div v-if="!sourcesPending" class="item w-full items-center flex-row md:flex-row rounded shadow-lg dark:animize-foreground
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
      <div class="item w-full items-center flex-row md:flex-row rounded shadow-lg dark:animize-foreground
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2">
        {{ playerState?.currentTime }}
      </div>

    </div>
    <LazyCommonNotFound v-if="!episode && !episodePending" class="flex items-center justify-center h-screen"/>
    <LazyCommonLoading v-if="episodePending" class="flex items-center justify-center h-screen"/>
  </div>

</template>

<script setup lang="ts">
import {VideoPlayer, VideoPlayerState} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
import {Carousel, Navigation, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

defineComponent({
  components: {
    VideoPlayer
  }
})


const route = useRoute()
const config = useRuntimeConfig()
const {anmID, pkgID} = route.params
const credential = useState('credential')

const hideEpisodeSelector = useState('hideEpisodeSelector', () => true)
const animizePlayer = useState('animizePlayer')
const playerState = useState<VideoPlayerState>('playerState')
const playerOptions = {
  playbackRates: [0.5, 1, 1.5, 2],
}
let player = null


const {data: episode, pending: episodePending, refresh: episodeRefresh} = await useLazyAsyncData(
    'episode',
    () => $fetch(`${config.API_BASE_URL}/episodes/by-id/${anmID}`, {})
)


const {data: packages, pending: packagesPending, refresh: packagesRefresh} = await useLazyAsyncData(
    'packages',
    () => $fetch(`${config.API_BASE_URL}/packages/by-id/${pkgID}`, {})
)

const {data: episodes, pending: episodesPending, refresh: episodesRefresh} = await useLazyAsyncData(
    'episodes',
    () => $fetch(`${config.API_BASE_URL}/episodes/list`, {key: pkgID, params: {packageID: pkgID}})
)
const videoPlayerSource = useState<SourceDTO[]>('videoPlayerSource', () => [])

const {data: sources, pending: sourcesPending, refresh: sourcesRefresh} = await useLazyAsyncData(
    'sources',
    () => $fetch<ResponseDTO>(`${config.API_BASE_URL}/episodes/sources/${anmID}`, {})
        .then(sources => {
          videoPlayerSource.value = []
          sources.data.forEach((source: { sourcesURL: any; contentLang: any; contentQuality: any; }) => {
            videoPlayerSource.value.push({
              src: source.sourcesURL,
              label: `${source.contentLang} - ${source.contentQuality}`,
              type: 'video/mp4'
            })
          })

          return sources
        })
)

watch(() => {
  return playerState.value?.currentTime ?? 0
}, async (currentTime, oldTime) => {
  currentTime = Math.round(currentTime / 0.5) * 0.5
  oldTime = Math.round(oldTime / 0.5) * 0.5

  // Every n second sync to our database player current time
  if (currentTime !== oldTime && currentTime % 3 === 0) {

    const watchSyncDTO: WatchSyncDTO = {
      anmID: `${anmID}`,
      currentWatchTime: currentTime
    }

    await useLazyAsyncData('', () => useAPI<any>('/myself/watch', {
      method: "PATCH",
      body: watchSyncDTO
    }))
  }
})


const videoPlayerReady = async (payload: any) => {

  console.log(animizePlayer.value)

  if (process.client) {


    // Seeking to n secs from API
    const watchHistory = new Promise<WatchHistoryResponse | null>(resolve => {
      const timeOut = setInterval(check, 1000)

      async function check() {
        if (credential.value !== null) {
          const {
            data: watchHistory
          } = await useAsyncData<WatchHistoryResponse>('watchHistory',
              () => useAPI<WatchHistoryResponse>(`/myself/watch/${anmID}`, {}), {})
          clearInterval(timeOut)
          resolve(watchHistory.value)
        }
      }
    })

    watchHistory.then(value => {
      const currentWatchTime = value?.data?.currentWatchTime ?? 0
      console.log(`CURRENT WATCH ${currentWatchTime}`)
      payload.target.player.currentTime(currentWatchTime)
    })
  }
}

const videoPlayerLoad = (payload: any) => {
  player = payload
  playerState.value = payload.state
}

</script>