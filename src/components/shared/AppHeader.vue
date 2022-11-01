<template>
    <div class="flex items-center justify-start  h-14 border-b-[0.5px] bg-white border-b-slate-100 w-full">
        <div :style="{ visibility: !isDrawerOpen ? 'visible' : 'hidden' }" aria-label="Open Menu" class="ml-1 mt-1"><svg
                fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                viewBox="0 0 30 30" class="w-8 h-8 p-0.5 cursor-pointer" @click.prevent="() => changeDrawerState()">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg></div>
        <Breadcrumbs></Breadcrumbs>
    </div>
</template>
<script setup lang="ts">
import Breadcrumbs from '@/components/shared/Breadcrumbs.vue';
import { useApplicationSettings } from '@/composables/useApplicationSettings';
const { isDrawerOpen, changeDrawerState } = useApplicationSettings();
</script>