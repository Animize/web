<template>
  <div class="flex flex-col dark:bg-gray-900">
    <NuxtLoadingBar :duration="1000" />
    <navbar class="item w-auto h-auto flex-auto"></navbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow"></NuxtPage>
    <animize_footer class="item w-auto h-auto flex-auto"></animize_footer>
  </div>

</template>

<script setup>
import {loadTheme} from "./composables/dark-setting";
loadTheme()

import Navbar from "./components/common/navbar";
import Animize_footer from "./components/common/animize_footer";

useHead({
  title: 'Animize'
})
</script>
