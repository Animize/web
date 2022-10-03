<template>
  <div class="flex justify-center">
    <div v-if="episode && !episodePending" class="flex-inline flex-col">
      <div class="item flex flex-row flex-wrap w-screen p-8">
        <div class="item flex-col w-full md:w-2/3 h-auto p-2">
          <div ref="animizePlayer" class="w-full aspect-[10/7]"/>
        </div>
        <div class="item flex-col w-full md:w-1/3 h-auto">
          <Disclosure :v-slot="hideEpisodeSelector" as="div"
                      class="dark:bg-gray-800 rounded shadow-lg flex-col h-auto w-auto">
            <DisclosureButton
                class="item dark:text-white text-gray-900 text-2xl h-auto w-full line-clamp-2 dark:bg-gray-700 p-2 text-start">
              {{ packages ? packages.name : '' }}
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
      <div class="item flex flex-col flex-wrap w-full p-8 text-white">
        2a
      </div>
      <div class="item text-white">
        3a
      </div>
    </div>
    <not_found v-if="!episode && !episodePending" class="flex items-center justify-center h-screen"></not_found>
    <animize_loading v-if="episodePending" class="flex items-center justify-center h-screen"/>
  </div>

</template>

<script setup>
import Artplayer from "artplayer";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import Not_found from "../../../components/common/not_found";
import Animize_loading from "../../../components/common/animize_loading";

const artPlayer = useState('artPlayer', () => null);
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

sourcesRefresh()
episodesRefresh()


watch(sources, () => {
  initializePlayer()
})

const initializePlayer = () => {
  let mapSource = sources.value.map(srcs => {
    return {
      html: `${srcs.provider} - ${srcs.contentQuality}`,
      url: srcs.sourcesURL
    }
  })

  artPlayer.value.switchUrl(mapSource[0].url)
  artPlayer.value.title = packages ? packages.name : ''
  artPlayer.value.quality = mapSource
}

watchEffect(() => {
  if (animizePlayer.value) {
    artPlayer.value = new Artplayer({
      autoplay: false,
      backdrop: true,
      setting: true,
      playbackRate: true,
      aspectRatio: true,
      pip: true,
      fullscreen: true,
      loop: true,
      screenshot: true,
      container: animizePlayer.value,
    })
  }
})

</script>

<style scoped>

</style>