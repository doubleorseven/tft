
<template>
  <ul v-if="$isMobile">
    <li v-for="task in props.tasks">
      <TaskCard :task="task" :delete-task="deleteTask"></TaskCard>
    </li>
  </ul>
  <div v-else class="overflow-x-auto">
    <table class="min-w-full text-sm divide-y-2 divide-gray-200">
      <thead>
        <tr>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            Title
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            How Hard?
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            How Long
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            Date Created
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            Delete
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">

        <template v-for="task in props.tasks">
          <tr>
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
              <router-link :to="{ name: 'task', params: { uid: task.uid } }" class="underline cursor-pointer">
                {{ task.title }}
              </router-link>
            </td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ task.howHard }}</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ task.howLong }} minutes</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ task.DateCreatedFormatted }}</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
              <DeleteButton @fire="() => deleteTask(task.id)">
                <TrashBinSvg></TrashBinSvg>
              </DeleteButton>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type Task from '@/entities/Task';
import type { PropType } from 'vue';
import TaskCard from './TaskCard.vue';
import DeleteButton from '@/components/shared/Actions/DeleteButton.vue'
import TrashBinSvg from '@/components/shared/SVG/TrashBinSvg.vue';
const props = defineProps({
  tasks: { type: null as unknown as PropType<Task[]>, required: true },
  deleteTask: { type: Function, required: true }
});
const deleteTask = (id: string) => {
  props.deleteTask(id);
};
</script>