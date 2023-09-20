<template>
  <div id="create-anime" class="w-full p-8 page-container">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Create anime
      </div>
      <div class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4">
        <div class="col-span-6">
          <LazyCommonTextInput
              v-model="animeCreate.name"
              label="Name"
              id="name"
          />
        </div>
        <div class="col-span-6 sm:col-span-2">
          <LazyCommonTextInput
              v-model="animeCreate.rating"
              label="Rating"
              id="rating"
          />
        </div>
        <div class="col-span-6 sm:col-span-2 ">
          <LazyCommonTextInput
              v-model="animeCreate.maxEpisode"
              label="Episode"
              id="maxEpisode"
          />
        </div>
        <div class="col-span-6 sm:col-span-2 ">
          <LazyCommonTextInput
              v-model="animeCreate.malId"
              label="MAL ID"
              id="malID"
          />
        </div>


        <div class="col-span-6 sm:col-span-2 select-none">
          <div class="button button-red">
            SAFE
          </div>
        </div>
        <div class="col-span-6">
          <div
              class="item w-auto h-auto flex flex-wrap gap-1.5 p-1.5">
                  <span v-for="item in genres ? genres.data : []" :key="item.id"
                        class="chip transition-colors ease-in duration-200"
                        :class="selectedGenre.indexOf(item) !== -1 ? 'chip-selected': ''"
                        @click="selectedGenreChipAction(item)"
                  >
                    {{ item.name }}
                  </span>
          </div>
        </div>

        <div class="col-span-6">
          <LazyCommonTextArea
              v-model="animeCreate.synopsis"
              label="Synopsis"
              id="synopsis"
          />
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
              @click="createAction"
          >
            Create
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const animeCreate = useState<PackagesDTO>('animeCreate', () => <PackagesDTO>{})
const selectedGenre = useState<Array<GenreDTO>>('selectedGenre', () => [])
const {data: genres, pending, refresh} = await useLazyAsyncData(
    'genres',
    () => useAPI<ResponseGenresDTO>(`${config.public.API_BASE_URL}/genre/list`)
)

const selectedGenreChipAction = async (genre: GenreDTO) => {
  let genreIndex = selectedGenre.value.indexOf(genre)
  if (genreIndex === -1) {
    selectedGenre.value.push(genre)
  } else {
    selectedGenre.value.splice(genreIndex, 1)
  }
  animeCreate.value.genreList = selectedGenre.value
}

const createAction = async () => {
  await useLazyAsyncData('createAnime', () => useAPI<any>('/packages',
      {
        method: 'POST',
        body: animeCreate.value
      }, {
        logging: true,
        showToast:true
      }
  ))
}

</script>
