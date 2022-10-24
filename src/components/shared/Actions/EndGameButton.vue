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
  'select-none inline-flex items-center cursor-pointer border-2 px-5 py-3 mt-8 font-medium rounded-lg w-fit': true,
  'text-gray-400 hover:bg-gray-100 hover:text-gray-600  hover:border-gray-600 border-gray-400': props.yes,
  'abort': !props.yes,
}
</script>