<script setup lang="ts">
import { numberToHumanClockText } from "@/lib/functions";
import { computed } from "@vue/reactivity";
import slider from "vue3-slider";

const props = defineProps({
    modelValue: Number,
    label: Number,
});
const emits = defineEmits(['update:modelValue', 'drag-end']);

const fireChange = (val: Number) => {
    emits('update:modelValue', val);
}
var sliderText = computed(() => numberToHumanClockText(props.label))
</script>
<template>
    <div class="flex  flex-col justify-center items-center mt-4">
        <slider v-model="modelValue" orientation="circular" color="#2563EB" width="60%" :height="25" :max="600"
            :step="5" track-color="#a1a1a1" @change="fireChange" @drag-end="$emit('drag-end')" />
        <h4 class="mt-4">{{ sliderText }}</h4>
    </div>
</template>