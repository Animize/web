<template>
  <div id="anime">
    <Head>
      <Title>
        Animize | Page {{ page + 1 }}
      </Title>
    </Head>
    <div class="justify-center p-2">
      <div class="flex flex-row justify-between gap-6 p-2 w-full h-auto">
        <div class="item w-1/3 h-auto" tabindex="-1">
          <div
              :class="dropdownOpen ? 'rounded-t' : 'rounded'"
              class="flex flex-col h-auto w-full bg-gray-200 dark:bg-gray-800 focus:ring-2 focus:ring-black focus:dark:ring-white"
              @click="dropdownOpen ? dropdownOpen = false : dropdownOpen = true"
          >
            <span class="item text-gray-900 dark:text-white font-semibold text-xl p-2">Sort By</span>
            <button
                class="item w-fit text-gray-900 dark:text-white font-normal text-xl mt-1 text-center  p-2"
                type="button"
            >{{ selectedSort.title }}
            </button>
          </div>
          <div :style="dropdownOpen ? '' : 'display:none;'"
               class="item z-10 absolute h-auto w-1/3 rounded-b bg-gray-200 dark:bg-gray-800"
          >
            <ul class="text-xl text-gray-900 dark:text-white font-normal h-48 overflow-y-scroll">
              <li v-for="sort in sortBy"
                  :id="sort.title"
                  :key="sort.title"
                  :class="sort.title === selectedSort.title ? 'bg-gray-100 dark:bg-gray-600 dark:text-white p-2' : ''"
                  class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white p-2"
                  tabindex="-1"
                  @click="changeSelectedSortAction(sort)"
              >
                <span>{{ sort.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="item h-auto left-0">
          <button class="button button-neutral transition-colors ease-out duration-200" @click="openAnimeFilter">
            <svg aria-hidden="true" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 512.000000 512.000000"
                 xmlns="http://www.w3.org/2000/svg">
              <g
                  stroke="none" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M142 5109 c-47 -14 -109 -79 -123 -131 -15 -56 -5 -241 22 -394 64
-370 243 -729 497 -996 42 -45 298 -278 569 -519 511 -456 553 -498 609 -624
62 -141 58 -70 64 -1240 l5 -1070 23 -37 c46 -74 136 -112 217 -90 31 8 240
142 658 421 336 224 620 417 629 427 48 55 48 52 48 731 0 696 1 706 58 842
59 139 92 174 615 640 271 241 527 474 569 519 242 258 406 571 484 925 20 87
27 153 31 294 l6 183 -26 39 c-14 21 -43 49 -64 62 l-38 24 -2410 2 c-1502 1
-2422 -2 -2443 -8z m4561 -471 c-32 -181 -131 -425 -236 -580 -97 -145 -178
-226 -662 -656 -269 -239 -512 -458 -539 -486 -106 -112 -199 -268 -250 -420
-52 -157 -56 -212 -56 -832 l0 -571 -385 -256 c-212 -142 -387 -257 -390 -257
-2 0 -6 390 -8 868 -4 940 -1 896 -60 1067 -49 142 -140 292 -244 401 -26 28
-268 247 -538 486 -297 264 -516 467 -555 514 -182 219 -309 489 -348 747 l-9
57 2147 0 2147 0 -14 -82z"/>
              </g>
            </svg>
            Filter
          </button>
        </div>

      </div>
      <anime_filter ref="animeFilter"></anime_filter>
      <library ref="libra" class="w-auto h-auto"></library>
    </div>
  </div>
</template>

<script setup>
import Library from "../components/anime/library";
import Anime_filter from "../components/anime/anime_filter";

const genreChip = ref(null);
const animeFilter = ref(null);
const libra = ref(null);
const route = useRoute();
const targetPath = route.path
const animeQuery = computed(() => route.query)
const page = useState('page', () => 0)
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


onMounted(() => {
  nextTick(() => {
    if (animeQuery.value.page) {
      libra.value.page = animeQuery.value.page - 1
    }

    if (animeQuery.value.sort) {
      let srt = animeQuery.value.sort
      selectedSort.value = sortBy.filter(value => value.id === Number(srt))[0]
      libra.value.sort = sortBy.filter(value => value.id === Number(srt))[0]
    } else {
      selectedSort.value = sortBy[0]
      libra.value.sort = sortBy[0]
    }

    if (animeQuery.value.search) {
      libra.value.search = animeQuery.value.search
    } else {
      libra.value.search = null
    }
    if (animeQuery.value.genre) {
      libra.value.genres = animeQuery.value.genre.split(',')
    } else {
      libra.value.genres = []
    }

  })
})

watch(animeQuery, (anmQuery) => {
  libra.value.page = anmQuery.page - 1
  let srt = anmQuery.sort
  libra.value.sort = sortBy.filter(value => value.id === Number(srt))[0]
  if (anmQuery.search) {
    libra.value.search = anmQuery.search
  } else {
    libra.value.search = null
  }
  if (anmQuery.genre) {
    libra.value.genres = anmQuery.genre.split(',')
  } else {
    libra.value.genres = []
  }
})

const changeSelectedSortAction = (sort) => {
  dropdownOpen.value = false
  selectedSort.value = sort

  const query = {
    page: page.value + 1,
    genre: route.query.genre,
    sort: sort.id,
    search: route.query.search
  }

  navigateTo(
      {
        path: targetPath,
        query: query
      }
  )
}

const openAnimeFilter = () => {
  nextTick(() => {
    animeFilter.value.open = true
  })

}

</script>

<style scoped>
</style>