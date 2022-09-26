<template>
    <div>
        <transition name="fade">
            <div v-if="props.isModalOpen" class="bg-stone-900/[.3] fixed " style="inset: 0;"></div>
        </transition>
        <transition name="slide-fade">
            <div v-if="isModalOpen" style="inset: 0;" class="fixed z-10 flex items-center justify-center"
                @keyup.esc="$emit('close')">
                <div class="w-96 mx-auto my-0 p-8 z-10 bg-white -translate-y-8" role="dialog">
                    <header class="mb-8 text-3xl">THE TASK CHOOSER GAME</header>
                    <main>
                        <div class="space-y-4">
                            <div class="flex items-center justify-center gap-4">
                                <Transition name="fade" mode="out-in">
                                    <template>
                                        <h1> {{task.title}}</h1>
                                    </template>
                                </Transition>
                            </div>
                            <div class="flex items-center justify-end gap-4">
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
import Task from '@/entities/Task';
const emits = defineEmits(['end', 'next']);
const props = defineProps({
    isModalOpen: Boolean,
    task: { type: Task, required: true }
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
</style>
  