<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, watch, onMounted, toRaw, ref } from 'vue'
import { useTasksManager } from '@/composables/useTasksManager';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import type ITask from '@/entities/Task';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import NumberInput from '@/components/shared/Forms/NumberInput.vue';
import ItemsList from '@/components/shared/ItemsList.vue';
import FormSlider from '../shared/Forms/FormSlider.vue';

import { HowHard } from '@/entities/Task';
import type MaterialsList from '@/entities/MaterialsList.js';
import type IListItem from '@/entities/interfaces/IListItem.js';
const route = useRoute()
const task = reactive({} as ITask);
const ml = reactive({} as MaterialsList);
const materialsListItems = ref<Array<IListItem>>([]);
const { getTaskByUID, updateTask } = useTasksManager();
const { createMaterialsList, getMeterialsListByID, updateMeterialsList } = useMaterialsListsManager();
onMounted(() =>
        watch(
                () => route.params.uid as string,
                async newId => {
                        var dbTask = await getTaskByUID(newId);
                        if (dbTask) {
                                Object.assign(task, dbTask);
                                if (dbTask.materialsListId) {
                                        const localMl = await getMeterialsListByID(dbTask.materialsListId);
                                        if (ml) {
                                                Object.assign(ml, localMl);
                                                materialsListItems.value = ml.items;
                                        }
                                }
                        }

                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLHeadElement;
        task.title = element.innerHTML;
}
const addMaterialsList = async (taskId: string) => {
        Object.assign(ml, await createMaterialsList(taskId));
        task.materialsListId = ml.id;
        materialsListItems.value = ml.items;
}
const updatedList = (list: Array<IListItem>) => {
        materialsListItems.value = list;
        beforeSave();
}
const beforeSave = () => {
        if (task.materialsListId) {
                ml.items = JSON.parse(JSON.stringify(materialsListItems.value));
                updateMeterialsList(toRaw(ml), true);
        }
        updateTask(toRaw(task), true);

}
watch(task, beforeSave);
</script>


<template>
        <form class="flex  flex-col items-center justify-center">
                <div contenteditable="true" @input="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none">
                        {{ task.title }}
                </div>
                <div class="w-9/12 mt-5 sm:w-4/12">
                        <h4 class="select-none mb-5 text-2xl underline decoration-1 underline-offset-2">how hard is this
                                task?</h4>
                        <div class=" grid grid-cols-1 gap-4 text-center sm:grid-cols-3 ">
                                <div>
                                        <RadioButton :id="'HowHard.Easy'" :modelValue="HowHard.Easy"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Easy"></RadioButton>
                                </div>
                                <div>
                                        <RadioButton :id="'HowHard.Medium'" :modelValue="HowHard.Medium"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Medium"></RadioButton>
                                </div>
                                <div>
                                        <RadioButton :id="'HowHard.Hard'" :modelValue="HowHard.Hard"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Hard"></RadioButton>
                                </div>
                        </div>
                </div>
                <div class="w-9/12 mt-5 sm:w-4/12">
                        <h4 class="select-none mb-5 text-2xl underline decoration-1 underline-offset-2">how
                                long does this
                                task takes?</h4>
                        <FormSlider v-model="task.howLong" :label="task.howLong || 0" />

                </div>
                <div v-if="task.materialsListId" class="w-9/12 mt-5 mb-5 sm:w-4/12">
                        <h4 class="select-none mb-5 text-2xl underline decoration-1 underline-offset-2">materials</h4>
                        <ItemsList :items="materialsListItems" @updated-list="updatedList"></ItemsList>
                </div>
                <CreateButton v-else @clicked="addMaterialsList(task.id)">
                        Add Materials List
                </CreateButton>

        </form>
</template>
<style scoped>
[contenteditable] {
        -webkit-tap-highlight-color: transparent;
        outline: 0px solid transparent;
}
</style>