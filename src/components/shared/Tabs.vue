<template>
  <aside :class="classObject">
    <section class="overflow-hidden flex h-screen justify-between bg-gray-100 text-gray-700 border-b border-gray-200 ">
      <div class="overflow-hidden fixed">
        <div class="flex items-center justify-between h-14 pl-6 w-32 mt-3">
          <span class="text-sm font-medium tracking-widest uppercase select-none">
            menu
          </span>
          <div v-show="isDrawerOpen" aria-label="Open Menu" class="mr-2 w-3 h-3 cursor-pointer"
            @click.prevent="() => changeDrawerState()">
            <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" />
              <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2" />
            </svg>
          </div>
        </div>

        <nav class="flex flex-col text-sm font-medium text-gray-500">
          <RouterLink v-for="link in links" @click.native="linkClicked" :to="link.to"
            :class="{'px-6 py-3': true, 'font-bold': link.name.startsWith(routeName as string)}"> {{ $t(link.text) }}
          </RouterLink>
        </nav>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">

import { computed, inject, watch } from 'vue';
import { useApplicationSettings } from '@/composables/useApplicationSettings';
import { useRoute } from 'vue-router';
const route = useRoute();
const { isDrawerOpen, changeDrawerState } = useApplicationSettings();
const classObject = computed(() => ({
  'transform top-0 left-0 bg-white overflow-hidden h-full overflow-auto ease-in-out transition-all duration-350': true,
  'translate-x-0 w-32': isDrawerOpen.value,
  '-translate-x-full w-0': !isDrawerOpen.value,
}))
const routeName = computed(() => route.name);
const links = [
  {
    to: '/',
    name: 'home',
    text: 'menu.home'
  },
  {
    to: '/tasks',
    name: 'tasks',
    text: 'menu.tasks'
  },
  {
    to: '/materials-lists',
    name: 'materials-lists',
    text: 'menu.materialsLists'
  },
  {
    to: '/settings',
    name: 'settings',
    text: 'menu.settings'
  }];
const isMobile = inject("$isMobile") as boolean;
const linkClicked = () => {
  if (isMobile) {
    changeDrawerState();
  }
}
</script>
