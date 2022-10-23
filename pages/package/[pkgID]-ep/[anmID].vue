<template>
  <div class="p-4">
    <Head v-if="!episodePending">
      <Title>
        {{packages.name ? packages.name : 'Animize'}} | Episode {{episode.episode ? episode.episode : '0'}}
      </Title>
      <Meta :content="episode ?`Episode ${episode.episode}, ${episode.summary ? episode.summary : 'Nothing to be told'}`  : 'Animize'" name="description"/>
    </Head>
    <div v-if="episode && !episodePending" class="flex-inline flex-col">
      <div class="item w-full items-center flex flex-col md:flex-row text-justify m-2 gap-2 p-2">
        <div class="item w-full md:w-2/3">
          <video-player ref="animizePlayer"
                        :controls="true"
                        :sources="videoPlayerSource"
                        class="w-full aspect-[10/7]"
                        @mounted="videoPlayerOnMounted"
          />
        </div>
        <div class="item w-full md:w-1/3 md:h-96">
          <Disclosure :v-slot="hideEpisodeSelector" as="div"
                      class="dark:bg-gray-800 rounded shadow-lg flex-col h-auto w-auto">
            <DisclosureButton
                class="item dark:text-white text-gray-900 text-2xl h-auto w-full line-clamp-2 dark:bg-gray-700 p-2 text-start">
              Episodes
            </DisclosureButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
              <DisclosurePanel
                  :class="episodes.length > 5 ? 'overflow-y-scroll' : ''"
                  class=" h-auto flex-col">
                <NuxtLink
                    v-for="episode in episodes"
                    :key="episode.id"
                    :to="`/package/${pkgID}-ep/${episode.id}`"
                    class="item flex flex-col items-start hover:text-white dark:hover:bg-gray-900 dark:text-white hover:bg-gray-800 dark:hover:bg-gray-600 p-8">
            <span class="item text-xl">
              Episode {{ episode.episode }}
            </span>
                  <span class="item line-clamp-2 dark:text-white italic">
              {{ episode.summary ? episode.summary : 'Nothing to be told' }}
            </span>
                </NuxtLink>
              </DisclosurePanel>
            </transition>
          </Disclosure>
        </div>
      </div>
      <div class="item w-full items-center flex flex-col md:flex-row relative rounded shadow-lg dark:bg-gray-800
          dark:text-white text-gray-800 text-justify m-2 gap-2 p-2">
        <nuxt-img :alt="`animize-${pkgID}-cover`"
                  :src="packages.cover ? packages.cover : '/icon/img_notfound.png'"
                  class="object-cover w-48 aspect-[7/10] rounded shadow"/>
        <div class="flex flex-col justify-between gap-2 leading-normal h-auto">
          <div class="item text-3xl font-bold flex-wrap w-full">
            {{ packages.name }}
          </div>
          <div class="item text-2xs-sm flex-wrap w-full">
            {{ packages.synopsis }}
          </div>
        </div>
      </div>
      <div class="item w-full items-center flex-row md:flex-row rounded shadow-lg dark:bg-gray-800
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
    <not_found v-if="!episode && !episodePending" class="flex items-center justify-center h-screen"></not_found>
    <animize_loading v-if="episodePending" class="flex items-center justify-center h-screen"/>
  </div>

</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import Not_found from "../../../components/common/not_found";
import Animize_loading from "../../../components/common/animize_loading";
import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'


const route = useRoute()
const config = useRuntimeConfig()
const anmID = useState('anmID', () => route.params.anmID)
const pkgID = useState('pkgID', () => route.params.pkgID)
const hideEpisodeSelector = useState('hideEpisodeSelector', () => false)
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
  return sources.value
      .map(e => ({
        src: e.sourcesURL,
        label: `${e.contentLang} - ${e.contentQuality}`,
        type: 'video/mp4'
      }))
})

episodesRefresh()

const videoPlayerOnMounted = () => {
}

onMounted(() => {
  nextTick(async () => {
    await sourcesRefresh()
  })
})

</script>

<style scoped>

</style>