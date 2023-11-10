<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="data in modelData" :key="data.key" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="data.cover" alt=""/>
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ data.text }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">

const props = defineProps({
  modelData: {
    type: Array<any>,
    default: []
  }
})


</script>
