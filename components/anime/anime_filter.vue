<template>
  <TransitionRoot :show="dialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="dialogOpen = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 backdrop-blur-sm bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative shadow-lg dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-5/6 h-auto">
              <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:text-white text-gray-800">
                <DialogTitle as="h1" class="text-3xl leading-6 font-bold ">Filter
                </DialogTitle>
                <hr class="border-1 my-4 dark:bg-gray-400"/>
                <div class="mt-4 text-left font-semibold text-xl">
                  Applied filter
                </div>
                <div
                    id="current-filter"
                    class="item w-auto h-auto flex flex-col gap-2.5 p-1.5">
                  <p :class="nameSearch.length !== 0 ?'p-2': ''" class="item dark:text-gray-300 text-gray-800 italic">
                    {{ nameSearch }}
                  </p>
                  <div class="item flex flex-wrap gap-1.5">
                    <span
                        v-for="item in currentGenreFilter"
                        v-if="currentGenreFilter.length !== 0" :key="item.id"
                        class="item chip transition-colors ease-in duration-200">
                    {{ item.name ? item.name : 'N/A' }}
                  </span>
                    <span
                        v-if="currentGenreFilter.length === 0"
                        class="chip transition-colors ease-in duration-200">
                  Any
                  </span>
                  </div>
                </div>
                <hr class="border-1 my-4 dark:bg-gray-400"/>
                <div class="mt-4 text-left font-semibold text-xl">
                  Name
                </div>
                <input id="simple-search"
                       v-model="nameSearch"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search"
                       type="text">
                <div class="mt-4 text-left font-semibold text-xl">
                  Genre
                </div>
                <div
                    class="item w-auto h-auto flex flex-wrap gap-1.5 p-1.5">
                  <span v-for="item in genres" :key="item.id"
                        :class="currentGenreFilter.indexOf(item) !== -1 ? 'chip-selected': ''"
                        class="chip transition-colors ease-in duration-200"
                        @click="selectedGenreAction(item)"
                  >
                    {{ item.name }}
                  </span>
                </div>
              </div>
              <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    class="button button-primary"
                    type="button"
                    @click="applyAction">Apply
                </button>
                <button ref="cancelButtonRef"
                        class="button button-neutral transition-colors ease-in duration-200"
                        type="button" @click="resetFilterAction">Reset
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

const config = useRuntimeConfig()
const route = useRoute()
const targetPath = route.path
const dialogOpen = useState('dialogOpen', () => false)
const nameSearch = useState('nameSearch', () => '')
const currentGenreFilter = useState('currentGenreFilter', () => [])

const {data: genres, pending, refresh} = await useLazyAsyncData(
    'genres',
    () => $fetch(`${config.API_BASE_URL}/genre/list`)
        .then((result) => {
          result.unshift({
            id: null,
            name: 'Any'
          })
          return result
        })
)

const selectedGenreAction = async (genre) => {
  if (genre.id === null) {
    currentGenreFilter.value = []
  }
  let genreIndex = currentGenreFilter.value.indexOf(genre)
  if (genreIndex === -1) {
    currentGenreFilter.value.push(genre)
  } else {
    currentGenreFilter.value.splice(genreIndex, 1)
  }
}

const resetFilterAction = async () => {
  currentGenreFilter.value = []
  nameSearch.value = ""
}

const applyAction = async () => {

  let parsedId = currentGenreFilter.value.map(gnr => gnr.id).join(',')

  const query = {
    page: route.query.page ? route.query.page : 1,
    genre: parsedId,
    sort: route.query.sort,
    search: nameSearch.value
  }

  dialogOpen.value = false

  navigateTo(
      {
        path: targetPath,
        query: query
      }
  )
}
onMounted(() =>{
  nextTick(() =>{
    refresh()
  })
})



defineExpose({
  dialogOpen,
  genres,
  currentGenreFilter,
  nameSearch
})
</script>

<style scoped>

</style>