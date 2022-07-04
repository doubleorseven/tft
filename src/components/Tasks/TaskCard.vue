<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div class="flex-grow">
        <router-link :to="{ name: 'task', params: { uid: task.uid } }" class="underline cursor-pointer font-medium">
          {{ task.title }}
        </router-link>
        <p class="text-gray-500">Should be {{ task.howHard.toString() }}</p>
        <p class="text-gray-500">Takes {{ task.howLong }} minutes</p>
        <p class="text-gray-500">Created at {{ task.DateCreatedFormatted }}</p>
        <div class="flex flex-row justify-end">

          <p class="underline cursor-pointer ml-4" @click.prevent="() => { deleteTask(task.id) }">
            Delete
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Task from '@/entities/Task';
const props = defineProps({
  task: { type: Task, required: true },
  deleteTask: { type: Function, required: true }
});
</script>