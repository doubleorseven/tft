<template>

  <template v-if="Lists.length > 0">
    <div class="flex flex-wrap flex-col">
      <CreateButton @clicked="createNewList">
        {{ $t('areas.Lists.create-a-List') }}
      </CreateButton>
      <ListsTable v-if="Lists.length > 0" :Lists="Lists" :delete-list="deleteList">
      </ListsTable>
    </div>
  </template>
  <div v-else class="flex flex-wrap flex-col h-full" :class="{ 'items-start': !$isMobile, 'items-center': $isMobile }">
    <div class=" relative p-8 text-center border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-medium">
        {{ $t('areas.Lists.no-Lists') }}
      </h2>

      <p class="my-4 text-sm text-gray-500">
        {{ $t('areas.Lists.created-Lists-appers-here') }}
      </p>
      <CreateButton @clicked="createList">
        {{ $t('areas.Lists.create-a-List') }}
      </CreateButton>

    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import ListsTable from '@/components/Lists/ListsTable.vue';
import { useListsManager } from '@/composables/useListsManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import type List from "@/entities/List";
import { useRouter } from "vue-router";
const { createList, deleteList, Lists, subscribeToDB, unsubscribeToDB } = useListsManager();
const router = useRouter();
const createNewList = async () => {
  const List: List = await createList();
  if (List.id) {
    router.push({ name: 'list', params: { uid: List.uid } })
  }

}
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>
