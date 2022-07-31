<template>
  <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
      <a class="flex items-center mb-4 sm:mb-0" href="/">
        <img alt="Animize Logo" class="mr-3 h-8" src="../../assets/icon/animize.svg"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Animize</span>
      </a>
      <label class="inline-flex relative items-center cursor-pointer" for="dark-toggle">
        <input id="dark-toggle" v-model="isDark" class="sr-only peer" type="checkbox">
        <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Turn on dark mode</span>
      </label>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a class="hover:underline"
                                                                                          href="https://animize.my.id/">Animize™</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<script setup>

import {useState} from "nuxt/app";
import {watch} from "vue";
import {loadTheme} from "../../composables/dark-setting";

const isDark = useState(() => false)

if (process.client) {
  isDark.value = localStorage.theme === 'dark'
}

watch(isDark, (nextIsDark) => {
  console.log(`Dark ${isDark.value} Dark2 ${nextIsDark}`)
  if (process.client) {
    if (nextIsDark) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.removeItem('theme')
    }
    loadTheme()
  }


})

</script>

<style scoped>

</style>