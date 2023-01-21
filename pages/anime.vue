<template>
  <div id="anime">
    <Head>
      <Title>
        Animize | Page {{ page + 1 }}
      </Title>
    </Head>
    <div class="justify-center p-2">
      <div class="flex flex-row justify-between gap-6 p-2 w-full h-auto">
        <div class="item w-1/3 h-auto">
          <Listbox v-model="selectedSort">
            <div class="relative">
              <ListboxButton
                  :class="dropdownOpen ? 'rounded-t' : 'rounded'"
                  class="flex flex-col relative cursor-default h-auto w-full bg-gray-200 dark:animize-foreground focus:ring-2 focus:ring-black focus:dark:ring-white"
                  @click="dropdownOpen ? dropdownOpen = false : dropdownOpen = true"
              >
                <span class="item text-gray-900 dark:text-white font-semibold text-xl p-2">Sort By</span>
                <span
                    class="item w-fit text-gray-900 dark:text-white font-normal text-xl mt-1 text-center  p-2"
                >{{ selectedSort.title }}
              </span>
              </ListboxButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
              >
                <ListboxOptions
                    :class="sortBy.length > 10 ? 'h-96 overflow-y-scroll' : ''"
                    class="item z-10 absolute w-full h-auto rounded-b bg-gray-200 dark:animize-foreground">
                  <ListboxOption
                      v-for="sort in sortBy"
                      :key="sort"
                      v-slot="{active,selected}"
                      :value="sort"
                      as="template"
                  >
                    <li
                        :class="active ? 'active:bg-gray-400 active:dark:bg-gray-600 active:dark:text-white p-2' : ''"
                        class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:text-white p-2 flex flex-row justify-between"
                    >
                      <span class="item">

                        {{ sort.title }}</span>
                      <CheckIcon v-if="selected" aria-hidden="true" class="item h-5 w-5 items-end"/>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="item h-auto left-0">
          <button
              class="button button-neutral transition-colors ease-out duration-200 dark:fill-white dark:hover:fill-gray-900 fill-gray-900 hover:fill-white"
              @click="openAnimeFilter">
            <LazyCommonIcon name="filter" class="w-10 h-10"/>
            Filter
          </button>
        </div>

      </div>
      <AnimeFilter></AnimeFilter>
      <Library class="w-auto h-auto"></Library>
    </div>
  </div>
</template>

<script setup>
import Library from "@/components/anime/Library";
import AnimeFilter from "@/components/anime/AnimeFilter";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon} from '@heroicons/vue/24/solid/esm/index.js'


const route = useRoute();
const targetPath = route.path
const animeQuery = computed(() => route.query)
const dropdownOpen = useState('dropdownOpen', () => false)

const sortBy = [
  {
    id: 1,
    title: 'Title Ascending',
    field: 'name',
    direction: 'asc'
  }, {
    id: 2,
    title: 'Title Descending',
    field: 'name',
    direction: 'desc'
  }, {
    id: 3,
    title: 'Highest Rating',
    field: 'rating',
    direction: 'desc'
  }, {
    id: 4,
    title: 'Lowest Rating',
    field: 'rating',
    direction: 'asc'
  }, {
    id: 5,
    title: 'Recently Added',
    field: 'createdDate',
    direction: 'desc'
  }, {
    id: 6,
    title: 'Oldest Added',
    field: 'createdDate',
    direction: 'asc'
  }
]
const selectedSort = useState('selectedSort', () => sortBy[0])
const page = useState('page', () => 0)
const sort = useState('sort', () => null)
const genres = useState('genres', () => [])
const search = useState('search', () => null)
const dialogOpen = useState('dialogOpen', () => false)


onMounted(() => {
  nextTick(() => {
    if (animeQuery.value.page) {
      page.value = animeQuery.value.page - 1
    }

    if (animeQuery.value.sort) {
      let srt = animeQuery.value.sort
      sort.value = sortBy.filter(value => value.id === Number(srt))[0]
    } else {
      sort.value = sortBy[0]
    }

    selectedSort.value = sort.value


    if (animeQuery.value.search) {
      search.value = animeQuery.value.search
    } else {
      search.value = null
    }
    if (animeQuery.value.genre) {
      genres.value = animeQuery.value.genre.split(',')
    } else {
      genres.value = []
    }

  })
})

watch(animeQuery, (anmQuery) => {
  if (anmQuery.page) {
    page.value = anmQuery.page - 1
  }

  if (anmQuery.sort) {
    let srt = anmQuery.sort
    sort.value = sortBy.filter(value => value.id === Number(srt))[0]
  } else {
    sort.value = sortBy[0]
  }

  selectedSort.value = sort.value


  if (anmQuery.search) {
    search.value = anmQuery.search
  } else {
    search.value = null
  }
  if (anmQuery.genre) {
    genres.value = anmQuery.genre.split(',')
  } else {
    genres.value = []
  }
})

watch(selectedSort, (selSort) => {
  dropdownOpen.value = false
  const query = {
    page: page.value + 1,
    genre: route.query.genre,
    sort: selSort.id,
    search: route.query.search
  }

  navigateTo(
      {
        path: targetPath,
        query: query
      }
  )
})


const openAnimeFilter = async () => {

  nextTick(() => {
    dialogOpen.value = true

  })

}

</script>
