<template>
  <div class="flex flex-col animize-background">
    <LazyNuxtLoadingIndicator/>
    <LazyCommonNavbar
        class="item w-full fixed top-0 sticky z-20 bg-opacity-70 backdrop-blur-xl"></LazyCommonNavbar>
    <LazyNuxtPage class="item w-auto min-h-screen h-auto flex-grow relative"></LazyNuxtPage>
    <LazyCommonFooter class="item w-auto h-auto flex-auto"></LazyCommonFooter>
  </div>

</template>

<script setup>
useHead({
  title: 'Animize'
})
</script>
