<template>
  <nav class="flex justify-center scale-[.8] md:scale-100 p-8 select-none">
    <ul class="inline-flex items-center -space-x-px">
      <li>
        <div
            class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="validateChangePage(page,totalPages)">
          <span class="sr-only">Previous</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  fill-rule="evenodd"></path>
          </svg>
        </div>
      </li>
      <li v-for="numPage in pageList" :key="numPage">
        <div
            :aria-current="numPage === page + 1 ? 'page' : 'false'"
            :class="numPage === page + 1 ? 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
            @click="validateChangePage(numPage,totalPages)"

        >{{ numPage }}
        </div>
      </li>
      <li>
        <div
            class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:animize-foreground dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="validateChangePage(page + 2,totalPages)">
          <span class="sr-only">Next</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  fill-rule="evenodd"></path>
          </svg>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts" setup>

const page = useState('page', () => 0)


const props = defineProps({
  totalPages: {
    type: Number,
    default: 0
  },
})

const validateChangePage = (page: any, totalPage: number) => {
  if (typeof page !== 'number'){
    return
  }
  emit('changePage', page, totalPage)
}

const emit = defineEmits<{
  changePage: [page: any, totalPage: number]
}
>()

const pageList = useState('pageList')

watch(page, () => {
  pageList.value = composePageSelector()
})

/**
 * This function will create predefined pagination with this rule
 *
 * 1. If current page is less than index (9), then hide '...' on the right side, otherwise show it.
 * 2. If current page is greater than 5, then show '...' on the left side, otherwise hide it,
 * 3. If current page is greater than 5, Show only 2 number before current page and 2 number after current page. Total 5
 * 4. If current page is less than 5, show all number with total 6
 *
 */
const composePageSelector = () => {
  let index = 9
  let count = props.totalPages < index ? props.totalPages : index
  let totalPage = props.totalPages
  let composedPage = new Array(count)
  let contentCount = 7
  let idx: number
  composedPage[0] = 1

  if (page.value + 1 > 5) {
    composedPage[1] = '...'
    if (page.value + 1 >= totalPage - 4) {
      contentCount = 8
      for (contentCount; contentCount > 1; contentCount--) {
        composedPage[contentCount] = totalPage - (8 - contentCount)
      }
    } else {
      for (idx = 2; idx < contentCount; idx++) {
        composedPage[idx] = page.value - 3 + idx
      }
    }
  } else {
    if (totalPage < contentCount) {
      contentCount = totalPage
    }
    for (idx = 1; idx < contentCount; idx++) {
      composedPage[idx] = idx + 1
    }
  }

  if (totalPage > index && page.value + 1 < totalPage - 4) {
    composedPage[composedPage.length - 2] = '...'
  }

  if (page.value + 1 < totalPage - 4) {
    composedPage[composedPage.length - 1] = totalPage
  }

  return composedPage
}

onMounted(() => {
  pageList.value = composePageSelector()
})


</script>