<template>
<nav aria-label="Breadcrumb">
  <ol role="list" class="flex items-center space-x-1 text-sm text-gray-500">
    <li v-for="item in crumbs">
      <RouterLink class="block transition-colors hover:text-gray-700" to="`/${{item}}`"> {{item}} /</RouterLink>
    </li>
  </ol>
</nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  crumbs: Array<string>
}>()
</script>