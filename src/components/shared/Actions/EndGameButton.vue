<template>
  <div :class="classObject" @click.prevent="() => $emit('clicked')">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineEmits(['clicked']);
const props = defineProps({
  yes: Boolean
})
const classObject = {
  'select-none inline-flex items-center cursor-pointer px-5 py-3 mt-8 font-medium text-white rounded-lg w-fit': true,
  'bg-blue-600 hover:bg-blue-500': props.yes,
  'bg-red-600 hover:bg-red-500': !props.yes,
}
</script>