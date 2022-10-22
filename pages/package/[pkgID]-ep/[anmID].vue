<template>
  <div class="flex justify-center">
    <Head v-if="!pending">
      <Title>
        {{packages.name ? packages.name : 'Animize'}} | Episode {{episode.episode ? episode.episode : '0'}}
      </Title>
      <Meta :content="episode ?`Episode ${episode.episode}, ${episode.summary ? episode.summary : 'Nothing to be told'}`  : 'Animize'" name="description"/>
    </Head>
    <div v-if="episode && !episodePending" class="flex-inline flex-col">
      <div class="item flex flex-row flex-wrap w-screen p-4">
        <div class="item flex-col w-full md:w-2/3 h-auto p-2">
          <video-player ref="animizePlayer"
                        :controls="true"
                        :sources="videoPlayerSource"
                        class="w-full aspect-[10/7]"
                        @mounted="videoPlayerOnMounted"
          />
        </div>
        <div class="item flex-col w-full md:w-1/3 h-auto">
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
      <div
          class="item flex flex-row rounded shadow-lg dark:bg-gray-800 dark:text-white text-gray-800 text-justify ml-8 mr-8 mb-4 p-4">
        <nuxt-img :alt="`animize-${pkgID}-cover`"
                  :src="packages.cover ? packages.cover : '/icon/img_notfound.png'"
                  class="object-cover w-48 h-72 rounded md:h-auto md:w-48 shadow m-8 hover:scale-110"/>
        <div
            class="item flex flex-col text-justify">
          <div class="item flex flex-col text-3xl font-bold flex-wrap w-full pl-4 pt-2">
            {{ packages.name }}
          </div>
          <div class="item flex flex-col text-2xs-sm flex-wrap w-full pl-4 pt-2">
            {{ packages.synopsis }}
          </div>
        </div>
      </div>


      <div
          class="item flex flex-col dark:text-white text-gray-800 text-justify
          ml-8 mb-4 mr-8 p-4">
        <div class="item flex flex-col text-2xl flex-wrap w-full pl-4 pt-2">
          Sources
        </div>
        <div class="item flex flex-wrap gap-1.5">
          <div v-for="src in videoPlayerSource"
               class="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer active:bg-gray-300
              active:text-gray-800 dark:active:bg-gray-800 dark:active:text-white hover:bg-gray-900
              hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800 transition duration-300 ease
              text-gray-500 bg-gray-200 dark:bg-gray-800 dark:text-white mr-1">
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