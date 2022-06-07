<template>
<input 
  class="sr-only peer" 
  :id="id" 
  :value="modelValue" 
  type="radio" 
  tabindex="-1" 
  :name="name"
  @change="$emit('update:modelValue', $event.target?.value)"  />
<label 
  :for="id" 
  class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200" 
  tabindex="0">
  <span class="text-sm font-medium"> {{text || modelValue}} </span>
</label>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
defineProps({
  id: {type: String, required: true },
  modelValue: {type: null as unknown as PropType<unknown>, required: true },
  name: {type: String, required: true },
  text: {type: String, required: false }
});

</script>