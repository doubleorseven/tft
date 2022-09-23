<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue';
import { useTasksManager } from '@/composables/useTasksManager';
import { HowMuchEnergy, type ChooseTaskStarterModelData } from '@/entities/Task';
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
    let count = await tasksCountByQuery(newValue as ChooseTaskStarterModelData);

    tasksCount.value = count > 0 ? `${count} tasks awaits you` : '';
});
</script>

<template>
    <div>
        <div>
            <h4>how much enargy do you have?</h4>
            <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                    <RadioButton :id="'HowMuchEnergy.Low'" :modelValue="HowMuchEnergy.Low" v-model="model.howMuchEnergy"
                        :name="'difficulty'">
                    </RadioButton>
                </div>
                <div>
                    <RadioButton :id="'HowMuchEnergy.Medium'" :modelValue="HowMuchEnergy.Medium"
                        v-model="model.howMuchEnergy" :name="'difficulty'">
                    </RadioButton>
                </div>
                <div>
                    <RadioButton :id="'HowMuchEnergy.High'" :modelValue="HowMuchEnergy.High"
                        v-model="model.howMuchEnergy" :name="'difficulty'">
                    </RadioButton>
                </div>
            </div>
            <FormError v-if="props.errors.howMuchEnergy" :text="props.errors.howMuchEnergy" />

        </div>
        <div>
            <h4>how much time do you have?</h4>
            <FormSlider v-model="model.howLong" :label="HowLongFullText" />
            <FormError v-if="props.errors.howLong" :text="props.errors.howLong" />
        </div>
        <div class="flex  flex-col justify-center items-center mt-2">
            <h4>{{ tasksCount }}</h4>
        </div>
    </div>
</template>