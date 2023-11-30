<template>
  <TransitionRoot :show="dialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="$emit('update:dialogOpen',false)">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 backdrop-blur-sm bg-opacity-60 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0">
        <div
            class="flex items-end sm:items-center justify-center w-screen h-screen p-4 text-center sm:p-0 overflow-y-auto">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative shadow-xl bg-opacity-90 backdrop-blur-xl animize-foreground rounded-lg text-left
                overflow-y-auto transform transition-all w-5/6 h-5/6
                p-4">
              <DialogTitle as="h1" class="text-3xl leading-6 font-bold animize-text-title">
                {{ title }}
              </DialogTitle>
              <LazyCommonTextInput
                  v-model="searchLookup"
                  id="searchLookup"
                  class="mt-4"
                  label="Search"
                  @keyup.enter="refreshData"
              />
              <LazyCommonLoading
                  class="h-72 z-10"
                  v-if="lookupStatusList === 'pending' || lookupStatusPage === 'pending'"
              />


              <LazyCommonStackedList
                  v-if="lookupStatusList !== 'pending' && lookupStatusPage !== 'pending'"
                  :model-data="modelData"
                  @onDblClick="onDblCLick"
              />
              <LazyCommonPagination
                  :total-pages="lookupDataPage?.data?.totalPages"
                  v-show="props.isPage"
                  @change-page="changePage"
              />

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";

const props = defineProps({
  id: {
    type: String,
    default: 'lookup'
  },
  dialogOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  urlApi: {
    type: String,
    default: ''
  },
  isPage: {
    type: Boolean,
    default: false
  },
  mapping: {
    default: {
      key: null,
      cover: null,
      text: null,
      search: ''
    }
  },
  selectedId: {
    default: null
  }
})

const emit = defineEmits<{
  (e: 'update:dialogOpen', value: boolean): void,
  (e: 'onSelectedValue', value: any): void
}>()


const modelData = useState(() => [])
const page = useState('page', () => 0)
const searchLookup = useState('searchLookup', () => '')

const changePage = async (pageNumber: number, totPage: number) => {
  if (props.isPage) {
    if (pageNumber < 1 || pageNumber > totPage) {
      return
    }
    page.value = pageNumber - 1
    await lookupRefreshPage()
  }
}


const {data: lookupDataPage, status: lookupStatusPage, refresh: lookupRefreshPage} = await useLazyAsyncData(
    `${props.id}LookupPage`,
    () => useAPI<ResponsePageDTO>(`${props.urlApi}`, {
          query: {
            page: page.value,
            size: 10,
            [props.mapping.search]: searchLookup.value
          },
        }
    ),
    {
      immediate: false
    }
)

const {data: lookupDataList, status: lookupStatusList, refresh: lookupRefreshList} = await useLazyAsyncData(
    `${props.id}LookupList`,
    () => useAPI<ResponseDTO>(`${props.urlApi}`, {}),
    {
      immediate: false
    }
)

watch([lookupDataPage, lookupDataList], ([dataPage, dataList]) => {
  console.log(dataPage?.data)
  console.log(dataList?.data)
  if (!props.mapping.text) {
    return
  }

  modelData.value = []

  if (dataPage && dataPage?.data?.totalElements != 0) {
    let data = dataPage?.data?.content.map((e: any) => {
      return {
        key: e[props.mapping.key ?? ''],
        cover: e[props.mapping.cover ?? ''],
        text: e[props.mapping.text ?? '']
      }
    })
    modelData.value = modelData.value.concat(data)
  }

  if (dataList && dataList?.data.length != 0) {
    let data = dataList?.data.map((e: any) => {
      return {
        key: e[props.mapping.key ?? ''],
        cover: e[props.mapping.cover ?? ''],
        text: e[props.mapping.text ?? '']
      }
    })
    modelData.value = modelData.value.concat(data)
  }

})

const refreshData = async () => {
  if (props.isPage) {
    page.value = 0
    console.log('Refresh page')
    await lookupRefreshPage()
  } else {
    console.log('Refresh list')
    await lookupRefreshList()
  }
}

const onDblCLick = (value: any) => {
  emit('update:dialogOpen', false)
  emit('onSelectedValue', value)
}

onMounted(async () => {
  await refreshData()
})


</script>
