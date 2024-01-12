<template>
  <div id="create-anime" class="w-full p-8 page-container">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Upload Episode
      </div>
      <form
          id="form-create-anime"
          class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4"
          @submit.prevent="onSubmit"
      >
        <div class="col-span-3">
          <LazyCommonTextInput
              id="animeName"
              :model-value="dataPackage?.data?.name"
              :readonly="true"
              label="Anime Name"
              @click.prevent="lookupAnimeOpen = true"
          />
          <LazyCommonDialogLookup
              id="lookupAnime"
              v-model:dialog-open="lookupAnimeOpen"
              :is-page="true"
              :mapping="renderLookup"
              :url-api="urlAPI"
              title="Select Anime"
              @onSelectedValue="(value) => selectedID = value"
          />
        </div>
        <div class="col-span-3">
          <LazyCommonTextInput
              id="episode"
              v-model="episodeCreate.episode"
              label="Episode"
              type="number"
          />
        </div>
        <div class="col-span-6">
          <LazyCommonTextArea
              label="Summary"
          />
        </div>
        <div class="col-span-6">
          <label>Sources</label>
        </div>
        <div class="col-span-6">
          <ul>
            <li v-for="(item,index) in sourcesCreate" :key="item.id" class="grid grid-cols-10 mt-2 gap-3">
              <LazyCommonTextInput
                  id="source"
                  v-model="item.sourcesURL"
                  class="col-span-3"
                  label="URL Source"
              />
              <LazyCommonCombobox
                  id="language"
                  v-model="item.contentLang"
                  :default-value="supportedLanguage()[0]"
                  :model="supportedLanguage()"
                  class="col-span-3"
              />
              <LazyCommonCombobox
                  id="resolution"
                  v-model="item.contentQuality"
                  :default-value="supportedResolution()[0]"
                  :model="supportedResolution()"
                  class="col-span-3"
              />
              <button
                  class="button-red col-span-1 grid place-items-center"
                  @click.prevent="deleteSources(index)">
                <TrashIcon class="h-6 w-6"/>
              </button>

            </li>
          </ul>
        </div>
        <div class="col-span-6 grid grid-cols-6 mt-2 gap-3">
          <button
              class="col-span-6 grid place-items-center border-dashed border-4 p-2 select-none"
              @click.prevent="addEmptySources()"
          >
            <PlusIcon class="h-6 w-6"/>
            <label>Add new source</label>
          </button>

        </div>
        <hr class="col-span-6 border-gray-800"/>
        <div class="col-start-3 col-span-2">
          <LazyNuxtLink
              to="/contributor">
            <div class="button button-neutral w-full h-16 justify-center select-none">Cancel</div>
          </LazyNuxtLink>

        </div>
        <div class="col-end-7 col-span-2">
          <button
              class="button button-primary w-full h-16 justify-center select-none"
          >
            Add Episode
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {supportedLanguage, supportedResolution} from "~/composables/util/Constant";
import {PlusIcon, TrashIcon} from '@heroicons/vue/24/solid'


const episodeCreate = useState<EpisodesDTO>('episodeCreate', () => <EpisodesDTO>{})
const sourcesCreate = useState<SourcesDTO[]>('sourcesCreate', () => [])
const config = useRuntimeConfig()
const urlAPI = `${config.public.API_BASE_URL}/packages/page`
const lookupAnimeOpen = useState(() => false)
const selectedID = useState(() => null)

const {data: dataPackage} = await useLazyAsyncData(
    () => useAPI<ResponsePackages>(`${config.public.API_BASE_URL}/packages/by-id/${selectedID.value}`, {}), {
      immediate: false,
      watch: [selectedID]
    })

watch(dataPackage, () => {
  let currentEpisode = dataPackage.value?.data?.currentEpisode ?? 0
  let maxEpisode = dataPackage.value?.data?.maxEpisode ?? 0
  if (currentEpisode < maxEpisode && maxEpisode !== 0) {
    episodeCreate.value.episode = currentEpisode + 1
  }
  let packageID = dataPackage.value?.data?.id
  if (packageID) {
    episodeCreate.value.packageID = packageID
  }

})

const renderLookup = {
  key: "id",
  cover: "cover",
  text: "name",
  search: "name",
}

const deleteSources = (index: number) => {
  sourcesCreate.value.splice(index, 1)
}

const addEmptySources = () => {
  sourcesCreate.value.push(<SourcesDTO>{})
}

const onSubmit = async () => {

  episodeCreate.value.sources = sourcesCreate.value.map(value => {
    value.contentLang = value.contentLang.id
    value.contentQuality = value.contentQuality.id
    return value
  })

  const {status} = await useLazyAsyncData('reqEpisodeCreate', () => useAPI<any>('/episodes',
      {
        method: 'POST',
        body: episodeCreate.value
      }, {
        logging: true,
        showToast: true
      }
  ))

  if (status.value == 'success') {
    episodeCreate.value = <EpisodesDTO>{}
    await navigateTo("/contributor")
  }
}


</script>
