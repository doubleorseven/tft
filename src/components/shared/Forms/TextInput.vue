<template>
  <label class="sr-only" for="title">{{ label }}</label>
  <input class="w-full p-3 text-sm border-2 border-gray-200 rounded-lg" :placeholder="placeholder || ''" type="text"
    :value="modelValue" :id="`text-input-${randomId}`" @change="$emit('update:modelValue', $event.target?.value)" />
</template>
<script setup lang="ts">
defineProps({
  modelValue: { type: String, required: true },
  label: String,
  placeholder: String
});
const randomId = Math.random().toString(36).slice(2, 7);
</script>