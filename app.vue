<template>
  <div class="flex flex-col animize-background">
    <NuxtLoadingBar :duration="1000"/>
    <LazyCommonNavbar class="item w-full  fixed top-0 sticky z-20 bg-opacity-80 backdrop-blur-xl"></LazyCommonNavbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow relative"></NuxtPage>
    <LazyCommonFooter class="item w-auto h-auto flex-auto"></LazyCommonFooter>
  </div>

</template>

<script setup>
import {loadTheme} from "@/composables/dark-setting";

loadTheme()
useHead({
  title: 'Animize'
})
</script>
