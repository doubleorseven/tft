<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs from './components/shared/Tabs.vue'
import AppHeader from './components/shared/AppHeader.vue'
import { initApplicationSettings } from '@/composables/useApplicationSettings';
import { computed } from '@vue/reactivity';
import { inject } from 'vue';
initApplicationSettings();
const isMobile = inject("$isMobile") as boolean;
const sidebarClass = computed(() => ({

}))
</script>

<template>
  <div class="flex flex-row ">
    <div class="sticky top-0 h-screen" :class="{ 'z-50 fixed': isMobile }">
      <Tabs />

    </div>
    <div class="flex-grow items-center content-center justify-center h-full">
      <header class="sticky top-0 z-40">
        <AppHeader />
      </header>
      <main class="flex shrink-0 max-w-full min-w-0 mx-auto mb-3 pt-10 p-2 w-11/12 flex-col overflow-auto h-full">
        <RouterView />
      </main>
      <notifications :position="'top center'" :duration="1000" :classes="'notification'" :clickToClose="false"
        :ignoreDuplicates="true" />
    </div>
  </div>
</template>
