<template>
    <label :for="id" class="relative h-8 w-16 cursor-pointer">
        <input type="checkbox" :id="id" class="peer sr-only" :value="state"
            @change="$emit('change', $event.target?.value)" />
        <span class="absolute inset-0 rounded-full bg-gray-400 transition peer-checked:bg-gray-600"></span>
        <span
            class="absolute inset-0 m-1 h-6 w-6 rounded-full bg-gray-900 transition peer-checked:translate-x-8"></span>
    </label>

</template>
<script setup lang="ts">
defineEmits(['change']);
const props = defineProps({
    name: { type: String, required: true },
    state: { type: Boolean, required: true }

})
const id = `${props.name}-cb-input`;
</script>