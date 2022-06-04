<script setup lang="ts">
defineEmits(['close']);
defineProps({
  isModalOpen: Boolean,
  Header: String,
  SubmitText: String,
  SubmitAction: Function,
});

const submitForm = () => {
  SubmitAction && SubmitAction();
  $emit('close');
};
</script>

<template>
  <div v-if="isModalOpen" class="bg-stone-900/[.3] fixed " style="inset: 0;"></div>
  <div v-if="isModalOpen" class="fixed z-10 flex items-center justify-center">
    <div class="w-96 mx-auto my-0 p-8 z-10 bg-white -translate-y-8" role="dialog">
      <header class="mb-8 text-3xl">{{Header}}</header>
      <main>
        <form class="space-y-4">
          <slot></slot>
          <div class="flex items-center justify-end gap-4">
            <button @click.prevent="$emit('close')">Cancel</button>
            <button @click.prevent="submitForm">Submit form</button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>
