<template>
  <TransitionRoot :show="dialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="dialogOpen = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 backdrop-blur-sm bg-opacity-60 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0">
        <div class="flex items-end sm:items-center justify-center w-screen h-screen p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative shadow-lg bg-opacity-90 backdrop-blur-xl animize-foreground rounded-lg text-left
                overflow-y-auto shadow-xl transform transition-all w-5/6 h-5/6">
              <DialogTitle as="h1" class="text-3xl leading-6 font-bold ">
                {{ title }}
              </DialogTitle>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">

import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";

const props = defineProps({
  dialogOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

</script>
