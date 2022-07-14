<template>
    <ul class="">
        <li v-for="(item, idx) in data" class="flex row group" :key="idx">
            <div class="flex row">
                <div class="hover:opacity-90 hover:bg-slate-200 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000"
                        class="invisible group-hover:visible">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                </div>
                <div><input id="toy" type="checkbox" v-model="item.done" name="type[toy]"
                        class="w-5 h-5 border-gray-300 rounded" />
                </div>
            </div>
            <div>
                <p v-if="idx === data.length - 1" ref="el" contenteditable>{{ item.title }}</p>
                <p v-else :class="{ 'line-through': item.done }" contenteditable>{{ item.title }}</p>
            </div>
        </li>
        <li class="block relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 0 48 48" fill="#000">
                <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
                <path d="m0 0h48v48h-48z" fill="none" />
            </svg>
            <div class="absolute w-full pointer-events-none">List Item</div>
            <div contenteditable @keyup="newItem" spellcheck="false">
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import type IListItem from '@/entities/interfaces/IListItem';
import { nextTick, onUpdated, ref, type PropType } from 'vue';
const props = defineProps({
    items: { type: Array as PropType<IListItem[]>, required: true }
})
const data = ref(props.items);
const newItem = (e: KeyboardEvent) => {
    data.value.push({ title: e.key, done: false });
};
const last = ref()

onUpdated(() => {
    nextTick();
    console.log((last.value as HTMLParagraphElement).focus());
});
</script>