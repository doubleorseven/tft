<template>
<div>
    <div>
        <TextInput :id="'create-task-title'" :modelValue="''"  v-model="model.title" :placeholder="'Title'" ></TextInput>
    </div>
    <h4>how hard is this task?</h4>
    <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
        <div>
            <RadioButton :id="'HowHard.Easy'" :modelValue="HowHard.Easy" v-model="model.howHard" :name="'difficulty'"></RadioButton>
        </div>
        <div>
            <RadioButton :id="'HowHard.Medium'" :modelValue="HowHard.Medium" v-model="model.howHard" :name="'difficulty'"></RadioButton>
        </div>
        <div>
            <RadioButton :id="'HowHard.Hard'" :modelValue="HowHard.Hard" v-model="model.howHard" :name="'difficulty'"></RadioButton>
        </div>
    </div>
    <h4>how long does this task takes?</h4>
    <div class="grid grid-cols-1 gap-4 text-center ">
        <input type="range" id="HowLong" v-model="model.howLong" min="1" max="601" step="5"/>
        <label for="HowLong">{{HowLongFullText}}</label>
    </div>
</div>
</template>

<script setup lang="ts">
import { HowHard } from '@/entities/Task';
import { reactive, computed } from 'vue';
import RadioButton from '@/components/shared/Forms/RadioButton.vue';
import TextInput from '@/components/shared/Forms/TextInput.vue';
const props = defineProps({
  model: { type: Object, required: true },
  });
const model = reactive(props.model);
let HowLongFullText = computed(() => {
    return model.howLong ?  `${model.howLong} minutes` : '';
});
</script>