<template>
<div class="flex flex-wrap -m-2">
  <ul>
    <li v-for="task in tasks">
      {{task.title}}
      <!-- <TaskCardVue></TaskCardVue> -->
    </li>
  </ul>
  

      <div class="relative p-8 text-center border border-gray-200 rounded-lg">
  <h2 class="text-2xl font-medium">
    {{$t('areas.tasks.no-tasks')}}
  </h2>

  <p class="mt-4 text-sm text-gray-500">
    {{$t('areas.tasks.created-tasks-appers-here')}}
  </p>

  <button
    href=""
    class="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
    @click.prevent="isModalOpen = true"
  >
    {{$t('areas.tasks.create-a-task')}}

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="flex-shrink-0 w-4 h-4 ml-3"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
</div>
      </div>
      <FormModal 
        :button-text="`Create Task`" 
        :submit="createTask" 
        :header-text="'Create new Task'"
        :isModalOpen="isModalOpen"
        :model="{}"
        :component-name="createTaskForm"
        @close="isModalOpen = false">
      </FormModal>
</template>
<script setup lang="ts">
import { ref,defineAsyncComponent,onMounted,onUnmounted } from "vue";
import TaskCardVue from './TaskCard.vue';
import  {useTasksManager} from '@/lib/useTasksManager';
import FormModal from '@/components/shared/Forms/FormModal.vue';
import CreateTask from '@/components/Tasks/CreateTask.vue';
import { useRouter } from 'vue-router'
const { createTask, tasks,subscribeToDB,unsubscribeToDB } = useTasksManager();
const router = useRouter();
const isModalOpen = ref(false);
const createTaskForm = defineAsyncComponent(() => import("./CreateTask.vue"));
const goToTask = (id: string) => {
  router.push({ name: 'myRoute',params: { uid: 'id' } })
};
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>