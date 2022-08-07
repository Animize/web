<template>
  <div class="flex flex-col dark:bg-gray-900">
    <navbar class="item w-auto h-auto flex-auto"></navbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow"></NuxtPage>
    <animize_footer class="item w-auto h-auto flex-auto"></animize_footer>
  </div>

</template>

<script setup>
import {loadTheme} from "./composables/dark-setting";
loadTheme()
useHead({
  title: 'Animize'
})
import Navbar from "./components/common/navbar";
import Animize_footer from "./components/common/animize_footer";
import {useHead} from "nuxt/app";
</script>
