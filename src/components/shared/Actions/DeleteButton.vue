<template>
    <div class="cursor-pointer w-fit select-none" v-longpress="() => $emit('fire')" @click="showHelp">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
defineEmits(['fire']);
const showHelp = () => {
    notify({
        type: "notification-warning",
        title: `long press to delete`,
    });
}
</script>