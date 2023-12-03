<template>
  <div id="create-anime" class="w-full p-8 page-container">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Upload Episode
      </div>
      <form id="form-create-anime" class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4">
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

const episodeCreate = useState('episodeCreate', () => <EpisodesDTO>{})
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

})

const renderLookup = {
  key: "id",
  cover: "cover",
  text: "name",
  search: "name",
}

</script>
