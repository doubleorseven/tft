<script setup lang="ts">
import slider from "vue3-slider";

defineProps({
    modelValue: Number,
    label: String,
});
const emits = defineEmits(['update:modelValue', 'drag-end']);

const fireChange = (val: Number) => {
    console.log(val);
    emits('update:modelValue', val);
}
</script>
<template>
    <div class="flex  flex-col justify-center items-center mt-4">
        <slider v-model="modelValue" orientation="circular" color="#2563EB" width="60%" :height="25" :max="600"
            :step="5" track-color="#a1a1a1" @change="fireChange" @drag-end="$emit('drag-end')" />
        <h5 class="mt-4">{{ label }}</h5>
    </div>
</template>