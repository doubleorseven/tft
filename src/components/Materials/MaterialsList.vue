<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, watch, onMounted, toRaw, } from 'vue'
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
import type MaterialsList from '@/entities/MaterialsList';
import CreateButton from '../shared/Actions/CreateButton.vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import NumberInput from '@/components/shared/Forms/NumberInput.vue';

import { HowHard } from '@/entities/Task';
const route = useRoute()
const ml = reactive({} as MaterialsList);
const { getMeterialsListByUID, updateMeterialsList } = useMaterialsListsManager();
onMounted(() =>
        watch(
                () => route.params.uid as string,
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

</script>


<template>
        <form class="flex  flex-col items-center justify-center">
                <div contenteditable="true" @input="updateTitle" @paste.prevent @keydown.enter.prevent
                        class="font-bold text-4xl cursor-text px-1 py-0.5 border-none">
                        {{ ml.title }}
                </div>

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