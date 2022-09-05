<script setup lang="ts">
import { stringifyQuery, useRoute } from 'vue-router'
import { reactive, ref, watch, onMounted, toRaw, } from 'vue'
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
let items = ref<Array<IListItem>>([]);
onMounted(() =>
        watch(
                () => props.uid as string,
                async newId => {
                        var dbML = await getMeterialsListByUID(newId);
                        if (dbML) {
                                Object.assign(ml, dbML);
                                items.value = ml.items;
                        }

                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLHeadElement;
        ml.title = element.innerHTML;
        beforeUpdate(true);
}
const updatedList = (list: Array<IListItem>) => {
        items.value = list;
        beforeUpdate(true);
}
const beforeUpdate = (silent : boolean = false) => {
        ml.items = JSON.parse(JSON.stringify(items.value));
        updateMeterialsList(toRaw(ml),silent);
}
</script>


<template>
        <form class="flex  flex-col items-center justify-center">
                <div contenteditable="true" @input="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none">
                        {{ ml.title }}
                </div>
                <ItemsList :items="items" @updated-list="updatedList"></ItemsList>


        </form>
</template>
<style scoped>
[contenteditable] {
        -webkit-tap-highlight-color: transparent;
        outline: 0px solid transparent;
}
</style>