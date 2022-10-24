<template>

  <template v-if="materialsLists.length > 0">
    <div class="flex flex-wrap flex-col">
      <CreateButton @clicked="createNewMaterial">
        {{ $t('areas.materialsLists.create-a-materialsList') }}
      </CreateButton>
      <MaterialsListsTable v-if="materialsLists.length > 0" :materialsLists="materialsLists"
        :delete-materials-list="deleteMaterialsList">
      </MaterialsListsTable>
    </div>
  </template>
  <div v-else class="flex flex-wrap flex-col h-full" :class="{ 'items-start': !$isMobile, 'items-center': $isMobile }">
    <div class=" relative p-8 text-center border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-medium">
        {{ $t('areas.materialsLists.no-materialsLists') }}
      </h2>

      <p class="my-4 text-sm text-gray-500">
        {{ $t('areas.materialsLists.created-materialsLists-appers-here') }}
      </p>
      <CreateButton @clicked="createMaterialsList">
        {{ $t('areas.materialsLists.create-a-materialsList') }}
      </CreateButton>

    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import MaterialsListsTable from '@/components/Materials/MaterialsListsTable.vue';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import type MaterialsList from "@/entities/MaterialsList";
import { useRouter } from "vue-router";
const { createMaterialsList, deleteMaterialsList, materialsLists, subscribeToDB, unsubscribeToDB } = useMaterialsListsManager();
const router = useRouter();
const createNewMaterial = async () => {
  const materialsList: MaterialsList = await createMaterialsList();
  if (materialsList.id) {
    router.push({ name: 'materials-list', params: { uid: materialsList.uid } })
  }

}
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>
