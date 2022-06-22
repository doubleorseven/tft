<template>
    <div class="p-1 text-red-700" role="alert">
        <strong class="text-sm font-medium"> {{ text }} </strong>
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: String
})
</script>