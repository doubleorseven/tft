<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs from './components/shared/Tabs.vue'
import AppHeader from './components/shared/AppHeader.vue'
import { initApplicationSettings, useApplicationSettings } from '@/composables/useApplicationSettings';
import { computed } from '@vue/reactivity';
import { inject } from 'vue';
initApplicationSettings();
const { IsDrawerOpen } = useApplicationSettings();
const isMobile = inject("$isMobile") as boolean;
const sidebarClass = computed(() => ({
  'items-center content-center justify-center flex-none': true,
  'z-50': isMobile,
  'fixed': isMobile
}))
</script>

<template>
  <div :class="sidebarClass">
    <div v-show="IsDrawerOpen" class="fixed inset-0 w-full h-full z-30" style="background-color: rgba(0,0,0,.4);"></div>
    <Tabs />

  </div>
  <div class="flex-grow items-center content-center justify-center p-2">
    <header>
      <AppHeader />
    </header>
    <main class="flex shrink-0 max-w-full min-w-0 mx-auto pt-10 w-11/12 flex-col h-full">
      <RouterView />
    </main>
    <notifications :position="'top center'" :duration="1000" :clickToClose="false" />
  </div>
</template>
