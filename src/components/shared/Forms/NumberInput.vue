<template>
  <div class="grid grid-cols-1 gap-4 text-center ">
    <label for="HowLong">{{ label }}</label>
    <input type="number" :id="`number-input-${randomId}`" :value="modelValue" :placeholder="placeholder || ''"
      :min="min" :max="max" :step="step" :list="suggestionsId"
      class="w-full p-3 text-sm border-2 border-gray-200 rounded-lg"
      @change="$emit('update:modelValue', $event.target?.value)" />


    <datalist v-if="suggestions" :id="suggestionsId">
      <option v-for="number in suggestions" :value="number" />
    </datalist>

  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: Number,
  min: Number,
  max: Number,
  step: Number,
  suggestions: Array,
  label: String,
  placeholder: String
});
const randomId = Math.random().toString(36).slice(2, 7);
const suggestionsId = props.suggestions ? `suggestions-${randomId}` : '';
</script>