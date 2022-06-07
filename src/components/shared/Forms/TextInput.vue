<template>
<label class="sr-only" for="title">Title</label>
<input 
    class="w-full p-3 text-sm border-2 border-gray-200 rounded-lg" 
    :placeholder="placeholder || ''" 
    type="text" 
    :value="modelValue"
    :id="id"
    @change="$emit('update:modelValue', $event.target?.value)" />
</template>
<script setup lang="ts">
defineProps({
  id: {type: String, required: true },
  modelValue: {type: String, required: true },
  text: {type: String, required: false },
  placeholder: String
});

</script>