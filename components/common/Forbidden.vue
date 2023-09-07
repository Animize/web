<template>
  <div id="animize-forbidden" class="flex justify-center flex-col">
    <img alt="Forbidden" class="item flex-wrap max-w-[300px] max-h-[300px]" src="~/assets/icon/astronaut.png">
    <div class="item w-64">
      <p class="item dark:text-white text-gray-800 font-extrabold text-5xl text-left w-full">403</p>
      <p class="item dark:text-white text-gray-800 font-bold text-2xl text-left w-full">Restricted Area!</p>
      <p class="item dark:text-white text-gray-800 font-extralight text-2xs text-left w-full">Beep! Beep!, identify yourself! you're about to enter restricted area!</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "Forbidden"
}
</script>