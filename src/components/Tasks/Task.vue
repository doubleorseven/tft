<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, watch, onMounted, toRaw, } from 'vue'
import { useTasksManager } from '@/lib/useTasksManager';
import type ITask from '@/entities/Task';
import CreateButton from '../shared/Actions/CreateButton.vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import NumberInput from '@/components/shared/Forms/NumberInput.vue';

import { HowHard } from '@/entities/Task';
const route = useRoute()
const task = reactive({} as ITask);
const { getTaskByUID, updateTask } = useTasksManager();
onMounted(() =>
        watch(
                () => route.params.uid as string,
                async newId => {
                        var dbTask = await getTaskByUID(newId);
                        if (dbTask) {
                                Object.assign(task, dbTask);
                        }

                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLHeadElement;
        task.title = element.innerHTML;
}

</script>


<template>
        <form>
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
                        <NumberInput :placeholder="`15 (minutes)`" v-model="task.howLong" :modelValue="5" :min="5"
                                :max="600" :step="5" :suggestions="[5, 10, 20, 30, 60]" />
                </div>

                <CreateButton @clicked="updateTask(toRaw(task))">
                        Save task!
                </CreateButton>
        </form>
</template>
<style scoped>
[contenteditable] {
        -webkit-tap-highlight-color: transparent;
        outline: 0px solid transparent;
}
</style>