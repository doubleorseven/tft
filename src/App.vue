<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs  from './components/shared/Tabs.vue'
import AppHeader from './components/shared/AppHeader.vue'
</script>

<template>
  
  <div class="flex items-start">
      
      <aside>
        <Tabs/>
      </aside>
<div>
  <header>
    <AppHeader/>
  </header>
      <main class="container px-5 py-24 mx-auto">
  <RouterView />
  </main></div>

  </div>
</template>