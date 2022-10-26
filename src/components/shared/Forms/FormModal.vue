<template>
  <div>
    <transition name="fade">
      <div v-if="props.isModalOpen" class="bg-stone-900/[.3] fixed " style="inset: 0;"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isModalOpen" style="inset: 0;" class="fixed z-10 flex items-center justify-center overflow-auto"
        @keyup.esc="$emit('close')">
        <div :class="{ 'w-96 mx-auto my-0 p-8 z-10 bg-white -translate-y-8': true, 'absolute top-8': $isMobile }"
          role="dialog">
          <h1 class="mb-8 text-3xl select-none">{{ props.headerText }}</h1>
          <main>
            <form class="space-y-4" @submit.prevent="submitForm">
              <component :is="props.componentName" :vmodel="props.model" :errors="errors" />
              <div class="flex items-center justify-end gap-4">
                <div @click.prevent="$emit('close')" class="abort">Cancel</div>
                <button type="submit">{{ props.buttonText }}</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const emits = defineEmits(['close']);
const props = defineProps({
  isModalOpen: Boolean,
  headerText: { type: String, required: true },
  buttonText: { type: String, required: true },
  componentName: { type: Object, required: true },
  model: { type: Object, required: true },
  submit: { type: Function, required: true },
  validate: { type: Function, required: false },
  errors: { type: Object, required: false },
});

const submitForm = () => {
  if (props.validate) {
    if (!props.validate(props.model)) {
      return;
    }
  }
  props.submit && props.submit(props.model);
  emits('close');
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}
</style>
