<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue';
import { useTasksManager } from '@/composables/useTasksManager';
import { HowHard, type ChooseTaskStarterkModelData } from '@/entities/Task';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import FormSlider from '../shared/Forms/FormSlider.vue';
import slider from "vue3-slider";
const props = defineProps({
    errors: { type: Object, required: true },
    vmodel: { type: Object, required: true },

});
const model = reactive(props.vmodel);
const { tasksCountByQuery } = useTasksManager();
const HowLongFullText = computed(() => {
    return model.howLong ? `${model.howLong} minutes` : '';
});
const tasksCount = ref('');
watch(model, async (newValue) => {
    debugger;
    let count = await tasksCountByQuery(newValue as ChooseTaskStarterkModelData);

    tasksCount.value = count > 0 ? `${count} tasks awaits you` : '';
});
</script>

<template>
    <div>
        <div>
            <h4>how much enargy do you have?</h4>
            <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                    <RadioButton :id="'HowHard.Easy'" :modelValue="HowHard.Easy" v-model="model.howHard"
                        :name="'difficulty'"></RadioButton>
                </div>
                <div>
                    <RadioButton :id="'HowHard.Medium'" :modelValue="HowHard.Medium" v-model="model.howHard"
                        :name="'difficulty'"></RadioButton>
                </div>
                <div>
                    <RadioButton :id="'HowHard.Hard'" :modelValue="HowHard.Hard" v-model="model.howHard"
                        :name="'difficulty'"></RadioButton>
                </div>
            </div>
            <FormError v-if="props.errors.howHard" :text="props.errors.howHard" />

        </div>
        <div>
            <h4>how much time do you have?</h4>
            <FormSlider v-model="model.howLong" :label="HowLongFullText" />
            <FormError v-if="props.errors.howLong" :text="props.errors.howLong" />
        </div>
        <h4>{{  tasksCount  }}</h4>
    </div>
</template>