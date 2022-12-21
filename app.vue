<template>
  <div class="flex flex-col animize-background">
    <NuxtLoadingBar :duration="1000" />
    <navbar class="item w-auto h-auto flex-auto"></navbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow"></NuxtPage>
    <AnimizeFooter class="item w-auto h-auto flex-auto"></AnimizeFooter>
  </div>

</template>

<script setup>
import {loadTheme} from "./composables/dark-setting";
loadTheme()

import Navbar from "./components/common/Navbar";
import AnimizeFooter from "./components/common/Footer";

useHead({
  title: 'Animize'
})
</script>
