<template>
  <div ref="modal" @keyup="keyPress">
    <transition name="fade">
      <div v-if="isModalOpen" class="bg-stone-900/[.3] fixed inset-0"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isModalOpen" class="inset-0 fixed z-10 flex items-center justify-center">
        <div class="w-96 mx-auto my-0 p-8 z-10 bg-white -translate-y-8 " role="dialog">
          <header class="mb-8 text-3xl flex flex-col items-center uppercase">choose a task</header>
          <main class="">
            <div class="space-y-4 min-h-[305px]" v-swipe="handleMove">
              <transition name="switch-fade" mode="out-in" v-if="task">
                <GAMECard :key="task?.id || '123'" :task="task"></GAMECard>
              </transition>
              <div class="flex items-center justify-between gap-4 w-full">
                <button @click.prevent="$emit('previous')">Previous</button>
                <button @click.prevent="$emit('select')" v-focus @keyup.enter="$emit('select')">YES!</button>
                <button @click.prevent="$emit('next')">Next</button>

              </div>
              <div class="flex items-center justify-center gap-4">
                <button class="flex-1 items-center justify-center abort" @click.prevent="$emit('end')">End Game</button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </transition>
  </div>
</template>
  
<script setup lang="ts">
import ITask from '@/entities/Task';
import { onMounted } from 'vue';
import GAMECard from './GAMECard.vue';
const emits = defineEmits(['end', 'previous', 'next', 'select']);
const props = defineProps({
  isModalOpen: Boolean,
  task: null,
});
const vFocus = {
  mounted: (el: HTMLButtonElement) => el.focus()
}
const keyPress = (e: KeyboardEvent): void => {
  if (e.code === 'ArrowLeft') {
    handleMove('LEFT');
  }
  if (e.code === 'ArrowRight') {
    handleMove('RIGHT');
  }
}
const handleMove = (direction: string): void => {
  console.log(direction);
  if ((direction) == 'RIGHT') {
    emits('next');
  }
  if ((direction) == 'LEFT') {
    emits('previous');
  }
}
onMounted(() => {
  if (!props.task) {
    emits('next');
  }
})

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


.switch-fade-enter-active{
  transition: all 0.1s ease-in-out;
}
.switch-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.switch-fade-enter-from {
    transform: translateX(-0.5rem);
    opacity: 0;
}
.switch-fade-leave-to {
  transform: translateX(5rem);
  opacity: 0;
}
</style>
  