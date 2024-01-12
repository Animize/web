<template>
  <Listbox v-model="modelValue" :default-value="defaultValue" by="id" class="col-span-2">
    <div class="relative">
      <ListboxButton
          class="relative w-full cursor-default rounded-lg animize-background
                      h-full text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2
                       focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm
                       border-gray-300 dark:border-gray-600 border-2
                       pl-2">
        <span class="block truncate">{{ modelValue?.name }}</span>
        <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                          aria-hidden="true"
                          class="h-5 w-5 text-gray-400"/>
                    </span>
      </ListboxButton>
      <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
        <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md animize-backdrop
                        py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-40">
          <ListboxOption
              v-for="lang in props.model"
              :key="lang.id"
              v-slot="{ active, selected }"
              :value="lang"
              as="template">
            <li
                :class="[
                                active ? 'menu-item-selected' : 'menu-item--not-selected',
                                'relative cursor-default select-none py-2 pl-10 pr-4',]">
                          <span
                              :class="[
                                  selected ? 'font-medium' : 'font-normal','block truncate']">
                  {{ lang.name }}
                </span>
              <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 animize-accent">
                            <CheckIcon aria-hidden="true" class="h-5 w-5"/>
                          </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script lang="ts" setup>

import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";

const props = defineProps({
  id: {
    default: 'combobox'
  },
  model: {
    default: []
  },
  defaultValue: {
    default: null
  },
})

const modelValue = defineModel('modelValue')

onMounted(() => {
  modelValue.value = props.defaultValue
})


</script>

