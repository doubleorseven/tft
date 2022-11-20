<template>
  <p>
    <input class="sr-only peer select-none" :id="id" :value="modelValue" type="radio" tabindex="-1" :name="name"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :checked="checked" />
    <label :for="id"
      class="peer-checked:bg-gray-600 peer-checked:text-white select-none inline-flex items-center cursor-pointer px-5 py-3 font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 border-2 hover:border-gray-600 border-gray-400 rounded-lg w-fit transition duration-300"
      tabindex="0">
      <span class="text-sm font-medium"> {{ text || modelValue }} </span>
    </label>
  </p>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

var props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: null as unknown as PropType<unknown>, required: true },
  name: { type: String, required: true },
  text: { type: String, required: false },
  checked: Boolean,
});
</script>