<template>
  <div id="anime">
    <Head>
      <Title>
        {{
        genre ? genre.name : 'All'
        }} |
        Page {{ page + 1 }}
      </Title>
    </Head>
    <div class="flex-inline justify-center p-8">
      <Genre_chip
          ref="genreChip"
          class="item"
          @event:genreChange="genreChange"
      ></Genre_chip>
      <library v-if="!pendingGenre" class="item w-auto h-auto flex-grow"></library>
    </div>
  </div>
</template>

<script setup>
import Library from "../components/anime/library";
import Genre_chip from "../components/anime/genre_chip";

const genreChip = ref(null);
const route = useRoute();
const animeQuery = computed(() => route.query)
const pendingGenre = useState('pendingGenre',() => true)
const genre = useState('genre', () => null)
const page = useState('page', () => 0)

watch(animeQuery, (query) => {
  nextTick(()=>{
    genre.value = genreChip.value.genres.filter((gnr) => gnr.id === query.genre)[0];
  })
})
onMounted(()=>{
  nextTick(()=>{
    pendingGenre.value = genreChip.value.pending
    genre.value = genreChip.value.genres.filter((gnr) => gnr.id === animeQuery.value.genre)[0]
  })
})


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