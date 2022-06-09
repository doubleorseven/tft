
<template>
<div class="overflow-x-auto">
  <table class="min-w-full text-sm divide-y-2 divide-gray-200">
    <thead>
      <tr>
        <th
          class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
        >
          Title
        </th>
        <th
          class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
        >
          How Hard?
        </th>
        <th
          class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
        >
          How Long
        </th>
        <th
          class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap"
        >
          Date Created
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
      
        <template v-for="task in tasks">
        <tr>
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                <router-link :to="{ name: 'task', params: { uid: task.uid }}">
                    {{task.title}}
                </router-link>
            </td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{task.howHard}}</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{task.howLong}} minutes</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{task.DateCreated}}</td>
            </tr>
        </template>
    </tbody>
  </table>
</div>
</template>

<script setup lang="ts">
import type Task from '@/entities/Task';
import type {PropType} from 'vue';
defineProps({
   tasks: {type: null as unknown as  PropType<Task[]>, required: true},
});
</script>