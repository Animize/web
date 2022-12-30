<template>
  <div id="library" class="flex-inline flex-wrap">
    <div v-if="totalElements !== 0 && !pending" :class="pending ? 'animate-pulse' : ''"
         class="item w-auto h-auto flex-grow grid p-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-1.5">
      <NuxtLink v-for="item in packages ? packages.content : []" :key="item.id"
                :to="`/package/${item.id}`"
                class="group relative z-0 w-5/6 aspect-[7/10] rounded drop-shadow-md hover:drop-shadow-2xl max-w-sm bg-white shadow-md dark:animize-foreground transition duration-300 ease">
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
    <Loading v-if="pending"></Loading>

    <NotFound v-if="totalElements === 0 && !pending" class="flex items-center justify-center h-screen"></NotFound>

    <nav v-if="totalElements !== 0 && !pending" class="item flex justify-center">
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="changePage(page - 2,totalPages)">
            <span class="sr-only">Previous</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    fill-rule="evenodd"></path>
            </svg>
          </a>
        </li>
        <li v-for="numPage in totalPages" :key="numPage">
          <a
              :aria-current="numPage === page + 1 ? 'page' : 'false'"
              :class="numPage === page + 1 ? 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
              @click="changePage(numPage,totalPages)"

          >{{ numPage }}</a>
        </li>
        <li>
          <a class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click="changePage(page + 2,totalPages)">
            <span class="sr-only">Next</span>
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>

  </div>

</template>
<script setup>
import NotFound from "@/components/common/NotFound";
import Loading from "@/components/common/Loading"

const route = useRoute()
const page = useState('page', () => 0)
const size = useState('size', () => 16)
const sort = useState('sort', () => null)
const genres = useState('genres', () => [])
const search = useState('search', () => null)
const targetPath = route.path


const queryStringRequest = computed(() => {
  let query = `?page=${page.value}&size=${size.value}`
  if (sort.value) {
    query += `&sort=${sort.value.field},${sort.value.direction}`
  }

  if (search.value) {
    query += `&name=${search.value}`
  }

  for (const genre of genres.value) {
    query += `&genreIds=${genre}`
  }

  return query
})

const config = useRuntimeConfig()
const {data: libraryPackages, pending, refresh} = await useLazyAsyncData(
    'libraryPackages',
    () => $fetch(`${config.API_BASE_URL}/packages/page${queryStringRequest.value}`)
)

const packages = useState('packages', () => libraryPackages ? libraryPackages.data : [])
const totalPages = useState('totalPages', () => 0)
const totalElements = useState('totalElements', () => 0)

watch(libraryPackages, (nPkg) => {
  totalPages.value = nPkg.data.totalPages
  totalElements.value = nPkg.data.totalElements
  packages.value = nPkg.data
})


watch(() => queryStringRequest.value, () => refresh())


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


defineExpose({
  sort,
  page,
  size,
  genres,
  search
})

</script>