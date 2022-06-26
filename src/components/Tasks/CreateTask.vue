<template>
    <div>
        <div>
            <TextInput :modelValue="''" v-model="model.title" :placeholder="'Title'" :label="'Title'" :required="true">
            </TextInput>
            <FormError v-if="props.errors.title" :text="props.errors.title" />
        </div>
        <div>
            <h4>how hard is this task?</h4>
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
            <h4>how long does this task takes? {{ HowLongFullText }}</h4>
            <NumberInput :placeholder="`15 (minutes)`" v-model="model.howLong" :modelValue="5" :min="1"
                :suggestions="[5, 10, 20, 30, 60]" />
            <FormError v-if="props.errors.howLong" :text="props.errors.howLong" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { HowHard } from '@/entities/Task';
import { watch, reactive, computed } from 'vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import TextInput from '@/components/shared/Forms/TextInput.vue';
import NumberInput from '@/components/shared/Forms/NumberInput.vue';
import FormError from '@/components/shared/Forms/FormError.vue';
import type ICreateTaskFormModalError from '@/entities/interfaces/ICreateTaskFormModalError';
const props = defineProps({
    errors: { type: Object, required: true },
    vmodel: { type: Object, required: true },

});
const model = reactive(props.vmodel);

let HowLongFullText = computed(() => {
    return model.howLong ? `${model.howLong} minutes` : '';
});
</script>