<script setup lang="ts">
import { numberToHumanClockText } from "@/lib/functions";
import { computed } from "@vue/reactivity";
import slider from "vue3-slider";

const props = defineProps({
    modelValue: Number,
    label: Number,
});
const emits = defineEmits(['update:modelValue', 'drag-end']);

const fireChange = (payload: Event) => {
    emits('update:modelValue', payload);
}
var sliderText = computed(() => numberToHumanClockText(props.label))
</script>
<template>
    <div class="flex  flex-col justify-center items-center mt-6">
        <slider v-model="modelValue" orientation="circular" color="#4b5563" width="50%" :height="15" :max="600"
            :step="5" track-color="#a1a1a1" :handleScale="1" @change="fireChange" @drag-end="$emit('drag-end')" />
        <h5 class="mt-4" v-html="sliderText"></h5>
    </div>
</template>