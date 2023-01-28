<template>
  <div class="flex flex-col animize-background">
    <LazyNuxtLoadingIndicator :duration="1000"/>
    <LazyCommonNavbar class="item w-auto h-auto flex-auto"></LazyCommonNavbar>
    <div
        class="item w-auto min-h-screen h-auto flex-grow text-white text-2xl flex items-center justify-center h-screen">
      <div class="flex justify-center flex-col">
        <img alt="stranded" class="item flex-wrap max-w-[300px] max-h-[300px]" src="~/assets/icon/astronaut.png">
        <div class="item w-64">
          <p class="item dark:text-white text-gray-800 font-extrabold text-5xl text-left w-full">
            {{ error.statusCode }}</p>
          <p class="item dark:text-white text-gray-800 font-bold text-2xl text-left w-full">Oops!</p>
          <p class="item dark:text-white text-gray-800 font-extralight text-2xs text-left w-full">Beep! Beep!, we
            encounter a problem!</p>
          <p class="item dark:text-white text-gray-800 font-extralight text-sm text-left w-full">Received message:</p>
          <p class="item dark:text-white text-gray-800 font-extralight text-sm italic text-left w-full">
            {{ error.message }}</p>
        </div>

      </div>
    </div>
    <LazyCommonFooter class="item w-auto h-auto flex-auto"></LazyCommonFooter>
  </div>

</template>

<script setup>

defineProps(['error'])

useHead({
  title: 'Animize'
})
</script>
