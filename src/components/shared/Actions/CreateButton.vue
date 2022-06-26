<template>
  <div
    class="inline-flex items-center cursor-pointer px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 w-fit"
    @click.prevent="buttonClicked">
    <slot></slot>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
      class="flex-shrink-0 w-4 h-4 ml-3">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
</template>
<script setup lang="ts">
defineProps({
  Do: Function
})
const emits = defineEmits(['clicked']);
const buttonClicked = () => {
  emits('clicked');
}
</script>