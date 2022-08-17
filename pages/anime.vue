<template>
  <div id="anime">
    <Head>
      <Title>
        Animize | Page {{ page + 1 }}
      </Title>
    </Head>
    <div class="flex-inline justify-center p-6">
      <anime_filter ref="animeFilter"></anime_filter>
      <button class="button button-primary" @click="openAnimeFilter">
        <svg aria-hidden="true" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 512.000000 512.000000"
             xmlns="http://www.w3.org/2000/svg">
          <g
              stroke="none" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
            <path d="M142 5109 c-47 -14 -109 -79 -123 -131 -15 -56 -5 -241 22 -394 64
-370 243 -729 497 -996 42 -45 298 -278 569 -519 511 -456 553 -498 609 -624
62 -141 58 -70 64 -1240 l5 -1070 23 -37 c46 -74 136 -112 217 -90 31 8 240
142 658 421 336 224 620 417 629 427 48 55 48 52 48 731 0 696 1 706 58 842
59 139 92 174 615 640 271 241 527 474 569 519 242 258 406 571 484 925 20 87
27 153 31 294 l6 183 -26 39 c-14 21 -43 49 -64 62 l-38 24 -2410 2 c-1502 1
-2422 -2 -2443 -8z m4561 -471 c-32 -181 -131 -425 -236 -580 -97 -145 -178
-226 -662 -656 -269 -239 -512 -458 -539 -486 -106 -112 -199 -268 -250 -420
-52 -157 -56 -212 -56 -832 l0 -571 -385 -256 c-212 -142 -387 -257 -390 -257
-2 0 -6 390 -8 868 -4 940 -1 896 -60 1067 -49 142 -140 292 -244 401 -26 28
-268 247 -538 486 -297 264 -516 467 -555 514 -182 219 -309 489 -348 747 l-9
57 2147 0 2147 0 -14 -82z"/>
          </g>
        </svg>

        Open modal
      </button>
      <library class="item w-auto h-auto flex-grow"></library>
    </div>
  </div>
</template>

<script setup>
import Library from "../components/anime/library";
import Anime_filter from "../components/anime/anime_filter";

const genreChip = ref(null);
const animeFilter = ref(null);
const route = useRoute();
const animeQuery = computed(() => route.query)
const page = useState('page', () => 0)


const targetPath = route.path;

const openAnimeFilter = () => {
  nextTick(() => {
    animeFilter.value.open = true
  })

}

</script>

<style scoped>
</style>