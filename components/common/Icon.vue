<template>
  <component :is="icon" />
</template>

<script setup>
const props = defineProps({
  name: String,
});
/*
const icons = Object.fromEntries(
    Object.entries(import.meta.glob('~/assets/icon/!*.svg', { as: 'raw' })).map(
        ([key, value]) => {
          const filename = key.split('/').pop().split('.').shift()
          return [filename, value]
        },
    ),
) */

/*
const icon = props.name && (await icons?.[props.name]?.())
*/
const icon = defineAsyncComponent(() => import(`../../assets/icon/${props.name}.svg`))

</script>

<style scoped>

</style>