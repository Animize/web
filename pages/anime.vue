<template>
  <div id="anime">
    <div class="flex-inline justify-center p-8">
      <Genre_chip ref="genreChip" class="item" @event:genreChange="genreChange"></Genre_chip>
      <library v-if="!pendingGenre" class="item w-auto h-auto flex-grow"></library>
    </div>
  </div>

</template>

<script setup>
import Library from "../components/anime/library";
import Genre_chip from "../components/anime/genre_chip";
import {navigateTo, useRoute} from "nuxt/app";
import {computed, ref} from "vue";

const genreChip = ref(null)
const route = useRoute()
const targetPath = route.path

const pendingGenre = computed(() => genreChip.value ? genreChip.value.pending : true)


const genreChange = async (id) => {
  if (id) {
    navigateTo(
        {
          path: targetPath,
          query: {
            page: 1,
            genre: id
          }
        }
    )
  } else {
    navigateTo(
        {
          path: targetPath,
          query: {
            page: 1
          }
        }
    )
  }
}

</script>

<style scoped>

</style>