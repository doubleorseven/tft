<template>

  <template v-if="materialsLists.length > 0">
    <div class="flex flex-wrap flex-col">
      <CreateButton @clicked="createMaterialsList">
        {{ $t('areas.materialsLists.create-a-materialsList') }}
      </CreateButton>
      <MaterialsListsTable v-if="materialsLists.length > 0" :materialsLists="materialsLists"
        :delete-material="deleteMaterialsList">
      </MaterialsListsTable>
    </div>
  </template>
  <div v-else class="flex flex-wrap flex-col h-full items-center justify-center">
    <div class="relative p-8 text-center border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-medium">
        {{ $t('areas.materialsLists.no-materialsLists') }}
      </h2>

      <p class="mt-4 text-sm text-gray-500">
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
import MaterialsListsTable from '@/components/materialsLists/MaterialsListsTable.vue';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import type MaterialsList from "@/entities/MaterialsList";
const { createMaterialsList, deleteMaterialsList, materialsLists, subscribeToDB, unsubscribeToDB } = useMaterialsListsManager();
const createNewMaterial = async () => {
  const materialsList: MaterialsList = await createMaterialsList();
  if (materialsList.id) {
    // goto materialsList
  }

}
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
</script>
