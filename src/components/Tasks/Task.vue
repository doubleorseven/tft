<template>
        <pre v-if="!task">........................</pre>
        <form v-else class="flex  flex-col justify-center" :class="{ 'items-center': $isMobile }">
                <div contenteditable="true" @input.prevent="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none">
                        {{ task.title }}
                </div>
                <div class="lg:w-3/12 mt-5 sm:w-9/12">
                        <h4>how hard is this
                                task?</h4>
                        <div class=" grid gap-4 text-center grid-cols-3">
                                <div>
                                        <RadioButton :id="'HowHard.Easy'" :modelValue="HowHard.Easy"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Easy">
                                        </RadioButton>
                                </div>
                                <div>
                                        <RadioButton :id="'HowHard.Medium'" :modelValue="HowHard.Medium"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Medium">
                                        </RadioButton>
                                </div>
                                <div>
                                        <RadioButton :id="'HowHard.Hard'" :modelValue="HowHard.Hard"
                                                v-model="task.howHard" :name="'difficulty'"
                                                :checked="HowHard[task.howHard] === HowHard.Hard"></RadioButton>
                                </div>
                        </div>
                </div>
                <div class="lg:w-3/12 mt-5 sm:w-9/12">
                        <h4>how
                                long does this
                                task takes?</h4>
                        <FormSlider v-model="task.howLong" :label="task.howLong || 0" />

                </div>
                <div class="lg:w-3/12 mt-5 mb-5 sm:w-9/12 flex flex-col justify-start">
                        <div class="flex flex-row  gap-2 items-center">
                                <h4>One time task?</h4>
                                <Checkbox v-model="task.oneTime" :name="'task-one-time'">
                                </Checkbox>

                        </div>
                        <div :style="{ visibility: !task.oneTime ? 'visible' : 'hidden' }"
                                class="flex flex-row  gap-2 items-center">
                                <h4>Delay next cycle?</h4>
                                <Checkbox v-model="task.delay" :name="'task-delay-in-days'">
                                </Checkbox>

                        </div>
                        <div v-if="task.delay && !task.oneTime" class="flex flex-row gap-2 items-center">
                                <label for="input-number-delay-by">delay for</label>
                                <input type="number" id="input-number-delay-by" v-model="task.delayForData[0]" :min="1"
                                        :step="1" :max="365" oninput="validity.valid||(value='');"
                                        class="w-fit p-3 text-sm border-2 border-gray-200 rounded-lg  outline-none text-center flex-grow-0" />
                                <select v-model="task.delayForData[1]"
                                        class="w-fit p-3 text-sm border-2 border-gray-200 rounded-lg outline-none w-[100px]">
                                        <option v-for="o in delayMultiplyOptions" :value="o.key">{{
                                                        (task.delayForData[0] < 2) ? o.value : `${o.value}s`
                                        }}</option>
                                </select>
                        </div>
                </div>
                <h4 class="select-none mb-5 text-2xl underline decoration-1 underline-offset-2">
                        materials</h4>
                <div v-if="task.materialsListId" class="w-9/12 mt-5 mb-5 sm:w-4/12">
                        <ItemsList :items="materialsListItems" @updated-list="updatedList"></ItemsList>
                </div>
                <CreateButton v-else @clicked="addMaterialsList(task.id)">
                        Add Materials List
                </CreateButton>
        </form>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, watch, onMounted, toRaw, ref } from 'vue'
import { useTasksManager } from '@/composables/useTasksManager';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import type ITask from '@/entities/Task';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import Checkbox from '@/components/shared/Forms/Checkbox.vue';
import ItemsList from '@/components/shared/ItemsList.vue';
import FormSlider from '../shared/Forms/FormSlider.vue';
import type KeyValuePair from "@/entities/interfaces/KeyValuePair";
import { HowHard } from '@/entities/Task';
import type MaterialsList from '@/entities/MaterialsList.js';
import type IListItem from '@/entities/interfaces/IListItem.js';
const route = useRoute()
const task = reactive({} as ITask);
const ml = reactive({} as MaterialsList);
const materialsListItems = ref<Array<IListItem>>([]);
const { getTaskByUID, updateTask } = useTasksManager();
const { createMaterialsList, getMeterialsListByID, updateMeterialsList } = useMaterialsListsManager();
const delayMultiplyOptions: KeyValuePair[] = [{ key: 1, value: 'day' }, { key: 7, value: 'week' }, { key: 30, value: 'month' }, { key: 365, value: 'year' }];

onMounted(() =>
        watch(
                () => route.params.uid as string,
                async newId => {
                        if (newId) {
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

                        }

                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLDivElement;
        task.title = element.innerText;
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
