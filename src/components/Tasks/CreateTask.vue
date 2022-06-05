<template>
<div>
<div>
            <label class="sr-only" for="title">Title</label>
            <input 
                class="w-full p-3 text-sm border-2 border-gray-200 rounded-lg" 
                placeholder="Title" 
                type="text" v-model="model.title" />
          </div>
          <h4>how hard is this task?</h4>
<div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            
            <div>
              <input class="sr-only peer" id="HowHard.Easy" :value="HowHard.Easy" v-model="model.howHard" type="radio" tabindex="-1" name="difficulty"  />
              <label for="HowHard.Easy" class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200" tabindex="0">
                <span class="text-sm font-medium"> {{HowHard.Easy}} </span>
              </label>
            </div>

            <div>
              <input class="sr-only peer" id="HowHard.Medium" :value="HowHard.Medium" v-model="model.howHard" type="radio" tabindex="-1"  name="difficulty" />
              <label for="HowHard.Medium"  class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200"  tabindex="0">
                <span class="text-sm font-medium"> {{HowHard.Medium}} </span>
              </label>
            </div>

            <div>
              <input class="sr-only peer" id="HowHard.Hard" :value="HowHard.Hard" v-model="model.howHard" type="radio" tabindex="-1" name="difficulty"  />
              <label for="HowHard.Hard" class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200" tabindex="0">
                <span class="text-sm font-medium"> {{HowHard.Hard}} </span>
              </label>
            </div>
          </div>
          <h4>how long does this task takes?</h4>
<div class="grid grid-cols-1 gap-4 text-center ">
  <input type="range" id="HowLong" v-model="model.howLong" 
         min="1" max="601" step="5">
  <label for="HowLong">{{HowLongFullText}}</label>
</div>
</div>
</template>

<script setup lang="ts">
import { HowHard } from '@/entities/Task';
import { reactive, computed } from 'vue';
const props = defineProps({
  model: { type: Object, required: true },
  });
const model = reactive(props.model);
let HowLongFullText = computed(() => {
    return model.howLong ?  `${model.howLong} minutes` : '';
});
</script>