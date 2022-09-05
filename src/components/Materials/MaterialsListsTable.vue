
<template>
  <ul v-if="$isMobile">
    <li v-for="ml in props.materialsLists">
      <MaterialsCard :materials-list="ml" :delete-materials-list="deleteMaterialsList" />
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
            Date Created
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            Belongs to Task
          </th>
          <th class="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
            Delete
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">

        <template v-for="ml in props.materialsLists">
          <tr>
            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
              <router-link :to="{ name: 'materials-list', params: { uid: ml.uid } }" class="underline cursor-pointer">
                {{ ml.title }}
              </router-link>
            </td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">{{ ml.DateCreatedFormatted }}</td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
              <Link :data="belongsToTaskText(ml.taskId)" v-if="ml.taskId" />
            </td>
            <td class="px-4 py-2 text-gray-700 whitespace-nowrap">
              <div class="cursor-pointer w-fit" @click.prevent="() => deleteMaterialsList(ml.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <desc>Download more icon variants from https://tabler-icons.io/i/trash</desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="4" y1="7" x2="20" y2="7"></line>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type MaterialsList from '@/entities/MaterialsList';
import MaterialsCard from '@/components/Materials/MaterialsCard.vue';
import {defineAsyncComponent, onBeforeMount, reactive, ref, type PropType } from 'vue';
import { useTasksManager } from '@/composables/useTasksManager';
import type Task from '@/entities/Task';
import Link from '@/components/shared/Actions/Link.vue';

// import TaskCard from './TaskCard.vue';
const props = defineProps({
  materialsLists: { type: null as unknown as PropType<MaterialsList[]>, required: true },
  deleteMaterialsList: { type: Function, required: true }
});

const tasksNames = ref([]  as Task[]);
const deleteMaterialsList = (id: string) => {
  let ml = props.materialsLists.find(x => x.id == id);
  if (ml) {
    if (ml.taskId) {
      removeTaskMaterialsList(ml.taskId);
    }
    props.deleteMaterialsList(id);
  }
  

};
const { getTaskByID,removeTaskMaterialsList } = useTasksManager();
onBeforeMount(() => {
  props.materialsLists.forEach(async (e) => {
    if (e.taskId) {
    const task = await getTaskByID(e.taskId);
    if (task) {
      tasksNames.value.push(task);
    }
  }})
})
const belongsToTaskText = (taskId : string | undefined) =>  {
  if (taskId) {
    const task = tasksNames.value.find(x => x.id == taskId);
    if (task) {
      return {
        namedPath: 'task',
        title : task.title, 
        params: {uid: task.uid}};
  }
  return {};
}
}
</script>