<template>

  <template v-if="tasks.length > 0">
    <div class="flex flex-wrap flex-col">
      <CreateButton @clicked="isModalOpen = true">
        {{ $t('areas.tasks.create-a-task') }}
      </CreateButton>
      <TasksTable v-if="tasks.length > 0" :tasks="tasks" :delete-task="deleteTask"> </TasksTable>
    </div>
  </template>
  <div v-else class="flex flex-wrap flex-col h-full items-center justify-center">
    <div class="relative p-8 text-center border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-medium">
        {{ $t('areas.tasks.no-tasks') }}
      </h2>

      <p class="mt-4 text-sm text-gray-500">
        {{ $t('areas.tasks.created-tasks-appers-here') }}
      </p>
      <CreateButton @clicked="isModalOpen = true">
        {{ $t('areas.tasks.create-a-task') }}
      </CreateButton>

    </div>
  </div>
  <FormModal :button-text="`Create Task`" :submit="createTask" :validate="validateNewTask"
    :header-text="'Create new Task'" :isModalOpen="isModalOpen" :model="{}" :errors="createErrors"
    :component-name="createTaskForm" @close="createNewTaskModalClosed">
  </FormModal>
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, onUnmounted } from "vue";
import TasksTable from '@/components/Tasks/TasksTable.vue';
import { useTasksManager } from '@/composables/useTasksManager';
import FormModal from '@/components/shared/Forms/FormModal.vue';
import CreateTask from '@/components/Tasks/CreateTask.vue';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import type { CreateTaskModelData } from "@/entities/Task";
import type ICreateTaskFormModalError from "@/entities/interfaces/ICreateTaskFormModalError";
import type Task from "@/entities/Task";
const { createTask, deleteTask, tasks, subscribeToDB, unsubscribeToDB } = useTasksManager();
const isModalOpen = ref(false);
const createTaskForm = defineAsyncComponent(() => import("./CreateTask.vue"));
const createErrors = ref({} as ICreateTaskFormModalError);
const createNewTask = async (form: CreateTaskModelData) => {
  createErrors
  const task: Task = await createTask(form);
  if (task.id) {
    // goto task
  }

}
const createNewTaskModalClosed = () => {
  isModalOpen.value = false;
  clearErrors();
}
const clearErrors = () => {
  createErrors.value.title = '';
  createErrors.value.howLong = '';
  createErrors.value.howHard = '';
}
const validateNewTask = (form: CreateTaskModelData) => {
  let noErrors = true;
  clearErrors();
  if (!form.title) {
    createErrors.value.title = 'missing title name';
    noErrors = false;
  }
  if (!form.howHard) {
    createErrors.value.howHard = 'please choose level of difficulty';
    noErrors = false;
  }
  if (!form.howLong) {
    createErrors.value.howLong = 'please choose how long its gonna take';
    noErrors = false;
  }
  return noErrors;
}
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>
