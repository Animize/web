<template>
  <div class="flex flex-col animize-background">
    <NuxtLoadingBar :duration="1000" />
    <LazyCommonNavbar class="item w-auto h-auto flex-auto"></LazyCommonNavbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow"></NuxtPage>
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
