<template>
  <footer class="p-4 bg-white shadow md:px-6 md:py-8 animize-background">
    <div class="sm:flex sm:items-center sm:justify-between">
      <a class="flex items-center mb-4 sm:mb-0" href="/">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              style="font-family: Slackey, cursive;">Animize</span>
      </a>
      <ul class="flex flex-row gap-1.5">
        <li
            v-for="color of ['system', 'light', 'dark']"
            :key="color"
            class="item"
        >
          <LazyCommonIcon :title="color" :name="color" class="p-2 w-10 h-10 dark:fill-white dark:text-white"
                          @click="colorMode.preference = color"/>
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a class="hover:underline"
                                                                                          href="https://animize.my.id/">Animize™</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<script setup>
const colorMode = useColorMode()

</script>