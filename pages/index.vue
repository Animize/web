<template>

  <!--  <div ref="mediaPlayer" style="width: 1024px;height: 600px"></div>-->
</template>
<script setup>
import {nextTick, onMounted, reactive, ref} from 'vue'
import Artplayer from "artplayer";
import Library from "../components/anime/library";

const mediaPlayer = ref(null)
const playerOption = reactive({
  url: 'https://www.googleapis.com/drive/v3/files/1J1w33vYakUCHsA1VdtaxjfAptjtta7j-?alt=media&key=AIzaSyAmulazgBW2wXbJtPH6RQiTidbXLXI9S9s',
  title: 'Your Name',
})

onMounted(() => {
  nextTick(() => {
    new Artplayer({
      ...playerOption,
      container: mediaPlayer.value
    })
  })
})

defineExpose({
  mediaPlayer,
  playerOption
})
</script>

<style scoped>

</style>