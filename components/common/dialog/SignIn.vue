<template>
  <TransitionRoot :show="signInDialogOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="signInDialogOpen = false">
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
                class="relative shadow-lg bg-opacity-90 backdrop-blur-xl animize-foreground rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-5/6 h-auto">
              <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-white">
                <DialogTitle as="h1" class="text-3xl leading-6 font-bold ">Sign In
                </DialogTitle>
                <hr class="border-1 my-4 dark:bg-gray-400"/>
                <div class="mt-4 text-left font-semibold text-xl">
                  Sign in with email
                </div>
                <hr class="border-1 my-4 dark:bg-gray-400"/>
                <span class="dark:text-gray-300 text-gray-800 italic">
                  Have a Google account?
                </span>
                <button class="button button-neutral" @click="signInWithGoogleAction">
                  Sign In With Google
                </button>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {signInWithGoogle} from "~/composables/useFirebaseAuth";

const signInDialogOpen = useState('signInDialogOpen', () => false)
const signInWithGoogleAction = async () =>{
  await signInWithGoogle()
}
</script>

<style scoped>

</style>