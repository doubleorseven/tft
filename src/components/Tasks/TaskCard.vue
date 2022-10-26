<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div class="flex-grow select-none">
        <router-link :to="{ name: 'task', params: { uid: task.uid } }" class="underline cursor-pointer font-medium">
          {{ task.title }}
        </router-link>
        <p class="text-gray-500">Should be {{ task.howHard.toString() }}</p>
        <p class="text-gray-500">Takes <span v-html="numberToHumanClockText(task.howLong)"></span></p>
        <p class="text-gray-500">Created at {{ task.DateCreatedFormatted }}</p>
        <div class="flex flex-row justify-end">
          <DeleteButton @fire="() => deleteTask(task.id)">
            <TrashBinSvg></TrashBinSvg>
          </DeleteButton>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Task from '@/entities/Task';
import { numberToHumanClockText } from "@/lib/functions";
import DeleteButton from '@/components/shared/Actions/DeleteButton.vue'
import TrashBinSvg from '@/components/shared/SVG/TrashBinSvg.vue';
defineProps({
  task: { type: Task, required: true },
  deleteTask: { type: Function, required: true }
});
</script>