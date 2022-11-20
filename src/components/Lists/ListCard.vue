<template>
  <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div class="flex-grow">
        <router-link :to="{ name: 'list', params: { uid: List.uid } }" class="underline cursor-pointer font-medium">
          {{ List.title }}
        </router-link>
        <template v-if="List.items.length > 0">
          <p class="text-gray-500">{{ List.items.length }} items in this list</p>
          <p class="text-gray-500">{{ List.items.filter(x => x.done).length }} marked as done</p>
        </template>
        <p v-else class="text-gray-500">no items in this list</p>
        <p class="text-gray-500">Created at {{ List.DateCreatedFormatted }}</p>
        <div class="flex flex-row justify-end">
          <DeleteButton @fire="() => deleteList(List.id)">
            <TrashBinSvg></TrashBinSvg>
          </DeleteButton>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import List from '@/entities/List';
import DeleteButton from '@/components/shared/Actions/DeleteButton.vue'
import TrashBinSvg from '@/components/shared/SVG/TrashBinSvg.vue';
defineProps({
  List: { type: List, required: true },
  deleteList: { type: Function, required: true }
});
</script>