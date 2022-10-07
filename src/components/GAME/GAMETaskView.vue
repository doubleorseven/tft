<template>
    <h4 class="text-bold"> {{task?.title}}</h4>
    <p>Should take: <span class="bold">{{numberToHumanClockText(task?.howLong)}}.</span></p>
    <p>Should be an <span class="bold">{{task?.howHard}} task.</span></p>
    <div class="relative w-fit mt-2" v-if="task?.materialsListId && (ml as MaterialsList).id">
        <h4 class="uppercase">Items list</h4>
        <ItemsList :items="ml?.items" :disabled="true"></ItemsList>
    </div>

</template>
<script setup lang="ts">
import { numberToHumanClockText } from "@/lib/functions";
import { ref, watch } from 'vue';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import type MaterialsList from '@/entities/MaterialsList';
import ItemsList from '@/components/shared/ItemsList.vue';
import Task from "@/entities/Task";
const props = defineProps({
    task: Task
});
const ml = ref({} as MaterialsList);
watch(() => props.task as Task, async (newVal) => {
    if (newVal && newVal.materialsListId) {
        const { getMeterialsListByID } = useMaterialsListsManager();
        const dbml = await getMeterialsListByID(newVal.materialsListId);
        if (dbml) {
            ml.value = dbml;
        }
    }
}, { immediate: true });
</script>u