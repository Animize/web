<template>
  <component :is="icon" />
</template>

<script setup>
const props = defineProps({
  name: String,
});
const icon = defineAsyncComponent(() => import(`../../assets/icon/${props.name}.svg`))

</script>