<template>
    <div class="flex justify-start p-2">
        <div v-show="!IsDrawerOpen" aria-label="Open Menu" class="mr-2 mt-2"><svg fill="none" stroke="currentColor"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 30 30"
                class="w-8 h-8 p-0.5 cursor-pointer" @click.prevent="() => changeDrawerState()">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg></div>
        <Breadcrumbs></Breadcrumbs>
    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/shared/Breadcrumbs.vue';
import { useApplicationSettings } from '@/composables/useApplicationSettings';
const { IsDrawerOpen, changeDrawerState } = useApplicationSettings();
</script>