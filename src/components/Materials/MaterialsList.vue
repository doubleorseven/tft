<script setup lang="ts">
import { stringifyQuery, useRoute } from 'vue-router'
import { reactive, watch, onMounted, toRaw, } from 'vue'
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import { useTasksManager } from '@/composables/useTasksManager';
import type MaterialsList from '@/entities/MaterialsList';
import CreateButton from '../shared/Actions/CreateButton.vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import NumberInput from '@/components/shared/Forms/NumberInput.vue';

import { HowHard } from '@/entities/Task';
import ItemsList from '../shared/ItemsList.vue';
import type IListItem from '@/entities/interfaces/IListItem';
const route = useRoute()
const ml = reactive({} as MaterialsList);
const { getMeterialsListByUID, updateMeterialsList } = useMaterialsListsManager();
const props = defineProps({
        uid: String
})
onMounted(() =>
        watch(
                () => props.uid as string,
                async newId => {
                        var dbML = await getMeterialsListByUID(newId);
                        if (dbML) {
                                Object.assign(ml, dbML);
                        }

                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLHeadElement;
        ml.title = element.innerHTML;
}
const items: Array<IListItem> = [{ title: 'first', done: false }, { title: 'second', done: true }, { title: 'third', done: false }]
</script>


<template>
        <form class="flex  flex-col items-center justify-center">
                <div contenteditable="true" @input="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none">
                        {{ ml.title }}
                </div>
                <ItemsList :items="items"></ItemsList>

                <CreateButton @clicked="updateMeterialsList(toRaw(ml))">
                        Save Materials List!
                </CreateButton>
        </form>
</template>
<style scoped>
[contenteditable] {
        -webkit-tap-highlight-color: transparent;
        outline: 0px solid transparent;
}
</style>