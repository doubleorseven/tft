<template>
  <div
    class="select-none inline-flex items-center cursor-pointer px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 w-fit"
    @click.prevent="() => $emit('clicked')">
    <slot></slot>
    <RightArrowSvg></RightArrowSvg>
  </div>
</template>
<script setup lang="ts">
import RightArrowSvg from "@/components/shared/SVG/RightArrowSvg.vue";
defineEmits(['clicked']);
</script>