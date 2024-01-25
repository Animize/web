<template>
  <div id="create-anime" class="w-full p-8 page-container">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Amend Anime
      </div>
      <form
          id="form-amend-anime"
          class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4"
          @submit.prevent=""
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

              label="Episode"
              type="number"
              :readonly="true"
          />
        </div>

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
            Amend Episode
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>

const config = useRuntimeConfig()
const urlAPI = `${config.public.API_BASE_URL}/packages/page`
const lookupAnimeOpen = useState(() => false)
const selectedID = useState(() => null)
const {data: dataPackage} = await useLazyAsyncData(
    () => useAPI<ResponsePackages>(`${config.public.API_BASE_URL}/packages/by-id/${selectedID.value}`, {}), {
      immediate: false,
      watch: [selectedID]
    })

const renderLookup = {
  key: "id",
  cover: "cover",
  text: "name",
  search: "name",
}
</script>
