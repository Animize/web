<template>
  <div id="anime">
    <Head>
      <Title>
        Animize |
        {{
          genreChip
            ? genreChip.genres.filter((gnr) => gnr.id === genreId)[0].name
            : "Animize"
        }}
        Page {{ libra ? libra.page + 1 : 1 }}
      </Title>
    </Head>
    <div class="flex-inline justify-center p-8">
      <Genre_chip
        ref="genreChip"
        class="item"
        @event:genreChange="genreChange"
      ></Genre_chip>
      <library ref="libra" class="item w-auto h-auto flex-grow"></library>
    </div>
  </div>
</template>

<script setup>
import Library from "../components/anime/library";
import Genre_chip from "../components/anime/genre_chip";

const genreChip = ref(null);
const libra = ref(null);
const route = useRoute();
const genreId = computed(() => (route.query.genre ? route.query.genre : null));


const targetPath = route.path;

const genreChange = async (id) => {
  if (id) {
    navigateTo({
      path: targetPath,
      query: {
        page: 1,
        genre: id,
      },
    });
  } else {
    navigateTo({
      path: targetPath,
      query: {
        page: 1,
      },
    });
  }
};
</script>

<style scoped>
</style>