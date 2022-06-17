<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs from './components/shared/Tabs.vue'
import AppHeader from './components/shared/AppHeader.vue'
</script>

<template>
  <div class="items-center content-center justify-center w-32 flex-none">
    <aside>
      <Tabs />
    </aside>
  </div>
  <div class="flex-grow items-center content-center justify-center p-2">
    <header>
      <AppHeader />
    </header>
    <main class="flex flex-wrap flex-col h-full">
      <RouterView />
    </main>
  </div>
</template>