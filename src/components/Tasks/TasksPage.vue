<template>
<div class="flex flex-wrap flex-col -m-2">
  <template v-if="tasks.length > 0">
    <CreateButton @clicked="isModalOpen = true">
  {{$t('areas.tasks.create-a-task')}}
  </CreateButton>
  
  <TasksTable v-if="tasks.length > 0" :tasks="tasks"> </TasksTable>  
  </template>
      <div v-else class="relative p-8 text-center border border-gray-200 rounded-lg">
  <h2 class="text-2xl font-medium">
    {{$t('areas.tasks.no-tasks')}}
  </h2>

  <p class="mt-4 text-sm text-gray-500">
    {{$t('areas.tasks.created-tasks-appers-here')}}
  </p>
  <CreateButton @clicked="isModalOpen = true">
  {{$t('areas.tasks.create-a-task')}}
  </CreateButton>
 
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
import TasksTable from '@/components/Tasks/TasksTable.vue';
import  {useTasksManager} from '@/lib/useTasksManager';
import FormModal from '@/components/shared/Forms/FormModal.vue';
import CreateTask from '@/components/Tasks/CreateTask.vue';
import CreateButton  from '@/components/shared/Actions/CreateButton.vue';
import { useRouter } from 'vue-router'
const { createTask, tasks,subscribeToDB,unsubscribeToDB } = useTasksManager();
const router = useRouter();
const isModalOpen = ref(false);
const createTaskForm = defineAsyncComponent(() => import("./CreateTask.vue"));

onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>
