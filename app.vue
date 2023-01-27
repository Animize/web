<template>
  <div class="flex flex-col animize-background">
    <NuxtLoadingIndicator/>
    <LazyCommonNavbar class="item w-full  fixed top-0 sticky z-20 bg-opacity-70 backdrop-blur-xl"></LazyCommonNavbar>
    <NuxtPage class="item w-auto min-h-screen h-auto flex-grow relative"></NuxtPage>
    <LazyCommonFooter class="item w-auto h-auto flex-auto"></LazyCommonFooter>
  </div>

</template>

<script setup>
import {getCredential} from "~/composables/useFirebaseAuth";

useHead({
  title: 'Animize'
})
const isLoggedIn = useState('isLoggedIn', () => getCredential() !== null)
</script>
