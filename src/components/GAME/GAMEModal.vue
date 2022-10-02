<template>
  <div>
    <transition name="fade">
      <div v-if="isModalOpen" class="bg-stone-900/[.3] fixed " style="inset: 0;"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isModalOpen" style="inset: 0;" class="fixed z-10 flex items-center justify-center"
        @keyup.esc="$emit('end')">
        <div class="w-96 mx-auto my-0 p-8 z-10 bg-white -translate-y-8" role="dialog">
          <header class="mb-8 text-3xl">THE TASK CHOOSER GAME</header>
          <main>
            <div class="space-y-4">
              <transition v-if="task" name="switch-fade" mode="out-in" appear>
                <GAMECard :key="task.id || '123'" :task="task"></GAMECard>
              </transition>
              <div class="flex items-center justify-end gap-4">
                <button @click.prevent="$emit('select')">This ONE!</button>
                <button @click.prevent="$emit('next')">Next One...</button>
                <button @click.prevent="$emit('end')">End Game</button>
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
import GAMECard from './GAMECard.vue';
defineEmits(['end', 'next', 'select']);
defineProps({
  isModalOpen: Boolean,
  task: { type: ITask }
});

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
  