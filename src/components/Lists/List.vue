

<template>
        <form class="flex flex-col justify-center" :class="{ 'items-center': $isMobile }">
                <div contenteditable="true" @input="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none mb-10">
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
<script setup lang="ts">
import { stringifyQuery, useRoute } from 'vue-router'
import { reactive, ref, watch, onMounted, toRaw, } from 'vue'
import { useListsManager } from '@/composables/useListsManager';
import type List from '@/entities/List';
import ItemsList from '@/components/shared/ItemsList.vue';
import type IListItem from '@/entities/interfaces/IListItem';
const ml = reactive({} as List);
const { getMeterialsListByUID, updateMeterialsList } = useListsManager();
const props = defineProps({
        uid: String
})
let items = ref<Array<IListItem>>([]);
onMounted(() =>
        watch(
                () => props.uid as string,
                async newId => {
                        if (newId) {
                                var dbML = await getMeterialsListByUID(newId);
                                if (dbML) {
                                        Object.assign(ml, dbML);
                                        items.value = ml.items;
                                }
                        }
                }, { immediate: true })
);

const updateTitle = (e: Event) => {
        var element = e.target as HTMLDivElement;
        ml.title = element.innerText;
        beforeUpdate(true);
}
const updatedList = (list: Array<IListItem>) => {
        items.value = list;
        beforeUpdate(true);
}
const beforeUpdate = (silent: boolean = false) => {
        ml.items = JSON.parse(JSON.stringify(items.value));
        updateMeterialsList(toRaw(ml), silent);
}
</script>
