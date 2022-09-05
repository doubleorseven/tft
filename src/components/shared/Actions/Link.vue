<template>
    <router-link :to="buildData" class="underline cursor-pointer font-medium">
        {{ data?.title }}
    </router-link>
</template>
<script setup lang="ts">import { computed } from 'vue';

const props = defineProps({data: Object})
const buildData = computed(() => {
    return {
        name: props.data?.namedPath,
        params: props.data?.params,
    }
});
</script>