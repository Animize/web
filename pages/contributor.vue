<template>
  <div id="contributor">
    <div class="flex flex-col p-8">
      <div class="card">
        <div class="animize-text-title text-2xl">
          Welcome {{credential?.displayName}},
        </div>
        <div class="animize-text-subtitle text-xl font-normal">
          to contributor area!
        </div>
      </div>
      <div>
        saajsisa
      </div>

    </div>
  </div>

</template>
<script setup lang="ts">
const credential = useState('credential')
</script>
