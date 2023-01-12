<template>
  <Disclosure v-slot="{ open }" as="nav" class="animize-foreground">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <ListBulletIcon v-if="!open" aria-hidden="true" class="block h-6 w-6"/>
            <XMarkIcon v-else aria-hidden="true" class="block h-6 w-6"/>
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <NuxtLink class="flex-shrink-0 flex items-center" to="/">
            <img alt="Animize" class="block lg:hidden h-8 w-auto"
                 src="~/assets/icon/animize.svg"/>
            <img alt="Animize"
                 class="hidden lg:block h-8 w-auto" src="~/assets/icon/animize.svg"/>
            <div class="text-white" style="font-family: Slackey, cursive;">Animize</div>
          </NuxtLink>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NuxtLink v-for="item in navigation" :key="item.name"
                        :aria-current="item.href === route.path ? 'page' : undefined"
                        :class="[item.href === route.path ? 'item-selected' : 'item-not-selected', 'px-3 py-2 text-sm font-medium']"
                        :to="item.href">{{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="ml-6 relative">
            <label class="sr-only" for="simple-search">Search</label>
            <div class="relative w-full">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        fill-rule="evenodd"></path>
                </svg>
              </div>
              <input id="simple-search"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search"
                     type="text">
            </div>
          </div>

          <button
              class="animize-foreground p-1 m-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              type="button">
            <span class="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" class="h-6 w-6"/>
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-10">
            <div>
              <MenuButton
                  class="animize-foreground flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">Open user menu</span>
                <img alt=""
                     class="h-8 w-8 rounded-full"
                     src="../../assets/icon/user.png"/>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1
                  ring-black ring-opacity-5 focus:outline-none animize-background animize-text-navigate bg-opacity-90 backdrop-blur-xl ">
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2']" href="#">Your
                    Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2']"
                     href="#">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2']" href="#">Sign
                    out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink v-for="item in navigation" :key="item.name"
                  :aria-current="item.href === route.path ? 'page' : undefined"
                  :class="[item.href === route.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
                  :to="item.href"
        >
          <DisclosureButton>
            {{ item.name }}
          </DisclosureButton>
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {BellIcon, ListBulletIcon, XMarkIcon} from '@heroicons/vue/24/solid/esm/index.js'

const route = useRoute()

let navigation = [
  {name: 'Home', href: '/'},
  {name: 'Anime', href: '/anime'},
]

</script>
<style scoped>

</style>