<template>
  <div id="create-anime" class="w-full p-8">
    <div class="relative flex-1">
      <div class="animize-text-title text-3xl">
        Create anime
      </div>
      <form class="grid grid-cols-6 gap-3 dark:text-white text-gray-900 mt-4">
        <div class="col-span-6">
          <LazyCommonTextInput
              label="Name"
              id="name"
          />
        </div>
        <div class="col-span-6 sm:col-span-2">
          <LazyCommonTextInput
              label="Rating"
              id="rating"
          />
        </div>
        <div class="col-span-6 sm:col-span-2 ">
          <LazyCommonTextInput
              label="Episode"
              id="maxEpisode"
          />
        </div>
        <div class="col-span-6 sm:col-span-2 ">
          <LazyCommonTextInput
              label="MAL ID"
              id="malID"
          />
        </div>

        <div class="col-span-6 sm:col-span-2 select-none">
          <div class="button button-red">
            SAFE
          </div>
        </div>
        <div class="col-span-6 sm:col-span-4">
          <LazyCommonTextInput
              label="Genre"
              id="genre"
          />
        </div>

        <div class="col-span-6">
          <LazyCommonTextArea
              label="Synopsis"
              id="synopsis"
          />
        </div>
        <hr class="col-span-6 border-gray-800"/>
        <div class="col-start-3 col-span-2">
          <div class="button button-neutral w-full h-16 justify-center select-none">Cancel</div>
        </div>
        <div class="col-end-7 col-span-2">
          <div class="button button-primary w-full h-16 justify-center select-none">Create</div>
        </div>
      </form>
    </div>

  </div>
</template>
<script setup lang="ts">

</script>
