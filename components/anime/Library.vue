<template>
  <div id="library" class="flex-inline flex-wrap">
    <div v-if="numberOfElements !== 0 && !libraryPending" :class="libraryPending ? 'animate-pulse' : ''"
         class="item w-auto h-auto grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-1.5 place-items-center	">
      <NuxtLink v-for="item in packages ? packages.content : []" :key="item.id"
                :to="`/package/${item.id}`"
                class="group relative z-0 w-40 md:w-44 xl:w-56 aspect-[7/10] rounded drop-shadow-md hover:drop-shadow-2xl
                max-w-sm bg-white shadow-md dark:animize-foreground transition duration-300 ease">
        <nuxt-img :src="item.cover ? item.cover : '/icon/img_notfound.png'"
                  alt=""
                  class="rounded object-center transition-all duration-300	group-hover:opacity-50 group-hover:blur w-full h-full absolute z-0"
                  loading="lazy"/>
        <div
            class="h-auto w-full pr-2 pl-2 z-10 bg-gradient-to-t from-gray-900 rounded-b absolute bottom-0 visible group-hover:invisible">
          <h5 class="mb-4 text-sm font-semibold tracking-tight text-white line-clamp-3 ">
            {{
              item.name
            }}</h5>
        </div>
        <div
            class="h-full w-full p-6 z-20 invisible group-hover:visible bg-gradient-to-t from-gray-900 rounded absolute">
          <h5 class="mb-4 text-sm font-semibold  text-white line-clamp-6 sm:line-clamp-7 md:line-clamp-8 lg:line-clamp-12">
            {{
              item.synopsis
            }}</h5>
        </div>
      </NuxtLink>
    </div>
    <LazyCommonLoading v-if="libraryPending"></LazyCommonLoading>
    <LazyCommonNotFound v-if="!libraryPending && numberOfElements === 0" id="animize-not-found"
                        class="flex items-center justify-center h-screen"></LazyCommonNotFound>
    <LazyCommonPagination v-if="numberOfElements !== 0 && !libraryPending"
                          class="item"
                          :total-pages="totalPages"
                          @change-page="changePage"></LazyCommonPagination>

  </div>

</template>
<script setup>

const route = useRoute()
const page = useState('page', () => 0)
const size = useState('size', () => 24)
const sort = useState('sort', () => null)
const genres = useState('genres', () => [])
const search = useState('search', () => null)
const targetPath = route.path
const computedQuery = computed(() => route.query)


const config = useRuntimeConfig()
const {data: libraryPackages, pending: libraryPending, refresh: libraryRefresh} = await useLazyAsyncData(
    'libraryPackages',
    () => useAPI(`${config.public.API_BASE_URL}/packages/page`, {
      onRequest({options}) {
        let query = {}
        if (page.value) {
          query.page = page.value
        }

        if (size.value) {
          query.size = size.value
        }
        if (sort.value) {
          query.sort = `${sort.value.field},${sort.value.direction}`
        }
        if (search.value) {
          query.name = search.value
        }
        if (genres.value) {
          query.genreIds = genres.value.join(',')
        }

        options.query = query
      }
    }),
    {
      immediate: false,
      watch: [
        computedQuery
      ]
    }
)


const packages = useState('packages', () => libraryPackages ? libraryPackages.data : [])
const totalPages = useState('totalPages', () => 0)
const numberOfElements = useState('numberOfElements', () => 0)

watch(libraryPackages, (nPkg) => {
  totalPages.value = nPkg.data.totalPages
  numberOfElements.value = nPkg.data.numberOfElements
  packages.value = nPkg.data
})

const changePage = async (pageNumber, totPage) => {
  if (pageNumber < 1) {
    pageNumber = 1
  } else if (pageNumber > totPage) {
    pageNumber = pageNumber - 1
  }

  const query = {
    page: pageNumber,
    genre: route.query.genre,
    sort: route.query.sort,
    search: route.query.search
  }

  navigateTo(
      {
        path: targetPath,
        query: query
      }
  )
}

onMounted(() => {
  nextTick(() => {
    libraryRefresh()
  })
})


defineExpose({
  sort,
  page,
  size,
  genres,
  search
})

</script>