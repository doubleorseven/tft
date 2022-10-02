<template>
  <input class="sr-only peer select-none" :id="id" :value="modelValue" type="radio" tabindex="-1" :name="name"
    @change="$emit('update:modelValue', $event.target?.value)" :checked="checked" />
  <label :for="id"
    class="block w-full select-none	cursor-pointer p-3 border border-gray-200 rounded-lg peer-checked:bg-blue-600 hover:bg-blue-500 hover:text-white  peer-checked:text-white transition duration-200"
    tabindex="0">
    <span class="text-sm font-medium"> {{ text || modelValue }} </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
var props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: null as unknown as PropType<unknown>, required: true },
  name: { type: String, required: true },
  text: { type: String, required: false },
  checked: Boolean,
});
console.log(props.modelValue, props.checked)
</script>