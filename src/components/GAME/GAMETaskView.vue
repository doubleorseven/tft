<template>
    <h4 class="font-medium"> {{ task?.title }}</h4>
    <p>Should take: <span v-html="numberToHumanClockText(task?.howLong)"></span>.</p>
    <p>Should be a <span class="font-bold">{{ task?.howHard }}</span> task.</p>
    <div class="relative w-fit mt-2"
        v-if="task?.materialsListId && (ml as MaterialsList).id && (ml as MaterialsList).items.length > 0">
        <h4 class="uppercase">Items list</h4>
        <ItemsList :items="ml?.items" :disabled="true"></ItemsList>
    </div>
    <div class="flex gap-3">
        <EndGameButton @clicked="$emit('end', true)" :yes="true">I DID IT!</EndGameButton>
        <EndGameButton @clicked="$emit('end', false)">I Choose not to..</EndGameButton>
    </div>

</template>
<script setup lang="ts">
import { numberToHumanClockText } from "@/lib/functions";
import { ref, watch } from 'vue';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import type MaterialsList from '@/entities/MaterialsList';
import ItemsList from '@/components/shared/ItemsList.vue';
import Task from "@/entities/Task";
import EndGameButton from "@/components/shared/Actions/EndGameButton.vue";
const props = defineProps({
    task: Task
});
defineEmits(['end'])
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