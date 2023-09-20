<template>
  <div class="flex flex-col animize-background">
    <LazyNuxtLoadingIndicator/>
    <LazyCommonNavbar
        class="item w-full top-0 sticky z-10 backdrop-blur-xl dark:bg-opacity-70 bg-opacity-95 dark:bg-black"></LazyCommonNavbar>
    <LazyNuxtPage class="item flex-grow min-h-screen"></LazyNuxtPage>
    <LazyCommonFooter class="item w-auto h-auto flex-auto"></LazyCommonFooter>
  </div>

</template>

<script setup>
useHead({
  title: 'Animize'
})
</script>
