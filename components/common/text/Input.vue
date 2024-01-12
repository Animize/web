<template>
  <div>
    <div class="relative">
      <input :id="id" :step="type === 'number' ? step : undefined"
             :type="type"
             :value="modelValue ? modelValue : undefined"
             class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500
             focus:outline-none focus:ring-0 focus:border-blue-600 peer"
             :class="props.readonly ? 'select-none' : ''"
             placeholder=""
             @input="$emit('update:modelValue', $event.target.value)"
             :readonly="props.readonly"
      />
      <label :for="id"
             class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">{{
          label
        }}</label>
    </div>
    <p v-show="errorMessage" id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{
        errorMessage
      }}</p>
  </div>
</template>
<script lang="ts" setup>
import {useField} from 'vee-validate';

const props = defineProps({
  modelValue: {
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    default: 'text-input'
  },
  step: {
    type: String,
    default: '1'
  },
  readonly: {
    default: false
  }

})

const {value, errorMessage} = useField(() => props.id);

</script>
