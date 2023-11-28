<template>
  <div id="create-anime" class="w-full p-8 page-container">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Upload Episode
      </div>
      <form id="form-create-anime" class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4">
        <div class="col-span-3">
          <LazyCommonTextInput
              label="Anime Name"
              id="animeName"
              @click.prevent="lookupAnimeOpen = true"
          />
          <LazyCommonDialogLookup
              id="lookupAnime"
              v-model:dialog-open="lookupAnimeOpen"
              :url-api="urlAPI"
              title="Select Anime"
              :is-page="true"
              :mapping="renderLookup"
          />
        </div>
        <div class="col-span-3">
          <LazyCommonTextInput
              label="Episode"
              id="episode"
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
<script setup lang="ts">

const episodeCreate = useState('episodeCreate', () => <EpisodesDTO>{})
const config = useRuntimeConfig()
const urlAPI = `${config.public.API_BASE_URL}/packages/page`
const lookupAnimeOpen = useState(() => false)

const renderLookup = {
  key: "id",
  cover: "cover",
  text: "name",
  search: "name",
}

</script>
