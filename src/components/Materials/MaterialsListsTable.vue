
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
              <DeleteButton @fire="() => deleteMaterialsList(ml.id)">
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
import type MaterialsList from '@/entities/MaterialsList';
import MaterialsCard from '@/components/Materials/MaterialsCard.vue';
import { defineAsyncComponent, onBeforeMount, reactive, ref, type PropType } from 'vue';
import { useTasksManager } from '@/composables/useTasksManager';
import type Task from '@/entities/Task';
import Link from '@/components/shared/Actions/Link.vue';
import DeleteButton from '@/components/shared/Actions/DeleteButton.vue'
import TrashBinSvg from '@/components/shared/SVG/TrashBinSvg.vue';
// import TaskCard from './TaskCard.vue';
const props = defineProps({
  materialsLists: { type: null as unknown as PropType<MaterialsList[]>, required: true },
  deleteMaterialsList: { type: Function, required: true }
});

const tasksNames = ref([] as Task[]);
const deleteMaterialsList = (id: string) => {
  let ml = props.materialsLists.find(x => x.id == id);
  if (ml) {
    if (ml.taskId) {
      removeTaskMaterialsList(ml.taskId);
    }
    props.deleteMaterialsList(id);
  }


};
const { getTaskByID, removeTaskMaterialsList } = useTasksManager();
onBeforeMount(() => {
  props.materialsLists.forEach(async (e) => {
    if (e.taskId) {
      const task = await getTaskByID(e.taskId);
      if (task) {
        tasksNames.value.push(task);
      }
    }
  })
})
const belongsToTaskText = (taskId: string | undefined) => {
  if (taskId) {
    const task = tasksNames.value.find(x => x.id == taskId);
    if (task) {
      return {
        namedPath: 'task',
        title: task.title,
        params: { uid: task.uid }
      };
    }
    return {};
  }
}
</script>