<template>
    <label :for="id" class="relative h-4 w-8 cursor-pointer">
        <input type="checkbox" :id="id" class="peer sr-only"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)" v-model="modelValue" />
        <span class="absolute inset-0 rounded-full bg-gray-400 transition peer-checked:bg-gray-600"></span>
        <span class="absolute inset-0  h-4 w-4 rounded-full bg-gray-900 transition peer-checked:translate-x-4"></span>
    </label>

</template>
<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    modelValue: { type: Boolean, required: true }

})
const id = `${props.name}-cb-input`;
</script>