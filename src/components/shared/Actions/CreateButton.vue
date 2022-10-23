<template>
  <div
    class="select-none inline-flex items-center cursor-pointer px-5 py-3 font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 border-2 hover:border-gray-600 border-gray-400 rounded-lg w-fit"
    @click.prevent="() => $emit('clicked')">
    <slot></slot>
    <RightArrowSvg></RightArrowSvg>
  </div>
</template>
<script setup lang="ts">
import RightArrowSvg from "@/components/shared/SVG/RightArrowSvg.vue";
defineEmits(['clicked']);
</script>