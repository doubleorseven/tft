<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div class="flex-grow">
        <router-link :to="{ name: 'materials-list', params: { uid: materialsList.uid } }"
          class="underline cursor-pointer font-medium">
          {{ materialsList.title }}
        </router-link>
        <template v-if="materialsList.items.length > 0">
          <p class="text-gray-500">{{ materialsList.items.length }} items in this list</p>
          <p class="text-gray-500">{{ materialsList.items.filter(x => x.done).length }} marked as done</p>
        </template>
        <p v-else class="text-gray-500">no items in this list</p>
        <p class="text-gray-500">Created at {{ materialsList.DateCreatedFormatted }}</p>
        <div class="flex flex-row justify-end">

          <DeleteButton @fire="() => deleteMaterialsList(materialsList.id)">
            <p class="underline cursor-pointer ml-4">Delete</p>
          </DeleteButton>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MaterialsList from '@/entities/MaterialsList';
import DeleteButton from '@/components/shared/Actions/DeleteButton.vue'
const props = defineProps({
  materialsList: { type: MaterialsList, required: true },
  deleteMaterialsList: { type: Function, required: true }
});
</script>