<template>
    <div class="cursor-pointer w-fit select-none" v-longpress="() => $emit('fire')">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineEmits(['fire']);
</script>