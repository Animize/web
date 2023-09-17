<template>
  <div id="contributor">
    <div class="flex flex-col p-8">
      <div class="item card select-none">
        <div class="animize-text-title text-2xl">
          Welcome {{ credential?.displayName }},
        </div>
        <div class="animize-text-subtitle text-xl font-normal">
          to contributor area!
        </div>
      </div>
      <div class="item mt-2 grid grid-cols-1 md:grid-cols-3 select-none justify-center h-48">
        <LazyNuxtLink
            class="button button-neutral card animize-text-subtitle items-center"
            to="/contributor/create/anime">
          <div>
            Add anime
          </div>
        </LazyNuxtLink>
        <LazyNuxtLink
            class="button button-neutral card animize-text-subtitle items-center"
            to="/contributor/episode"
        >
          <div>
            Upload new episode
          </div>
        </LazyNuxtLink>

        <LazyNuxtLink
            class="button button-neutral card animize-text-subtitle items-center"
            to="/contributor/amend/anime">
          <div>
            Amend anime
          </div>
        </LazyNuxtLink>

      </div>

    </div>
  </div>

</template>
<script lang="ts" setup>
const credential = useState('credential')
</script>
