<template>
    <ul class="w-10/12 flex flex-col">
        <li v-for="(item, idx) in items" class="flex row group focus-within:border-y focus-within:border-y-zinc-300"
            :key="idx" @click.self="focusOnItem">
            <div class="flex row">
                <div v-if="!disabled" class="active:opacity-90 active:bg-slate-200 rounded-full cursor-pointer">
                    <svg xmlns=" http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000"
                        class="invisible group-focus-within:visible group-hover:visible"
                        @click="() => { deleteItem(idx) }">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                </div>
                <div><input id="toy" type="checkbox" @click="() => { updateItemState(idx) }" v-model="item.done"
                        name="type[toy]" class="w-5 h-5 border-gray-300 rounded mr-2" :disabled="disabled" />
                </div>
            </div>
            <div class="">
                <p v-if="!disabled && idx === items.length - 1" id="newItemAdded" :data-index="idx"
                    @input.prevent="updateItem" :class="{ 'line-through': item.done }" contenteditable
                    class="outline-0">{{
                            item.title
                    }}
                </p>
                <p v-else :data-index="idx" :class="{ 'line-through': item.done && !disabled }"
                    @input.prevent="updateItem" :contenteditable="!disabled" class="outline-0">
                    {{ item.title }}</p>
            </div>
        </li>
        <li v-if="!disabled"
            class="relative lw-full  inline-block pl-6 focus-within:border-y focus-within:border-y-zinc-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline" height="18px" width="18px" viewBox="0 0 48 48"
                fill="#000">
                <path d="m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z" />
                <path d="m0 0h48v48h-48z" fill="none" />
            </svg>
            <div class="absolute inline  lw-full  pointer-events-none text-gray-500 left-[52px]">Add new item</div>
            <div contenteditable @input="newItem" class="outline-0 absolute inline w-28 left-[52px]" spellcheck="false">
            </div>
        </li>
    </ul>
</template>
<script setup lang="ts">
import type IListItem from '@/entities/interfaces/IListItem';
import { nextTick, onUpdated, type PropType } from 'vue';
let focusNewItem = false;
const props = defineProps({
    items: { type: Array as PropType<IListItem[]>, required: true },
    disabled: Boolean,
})
const emits = defineEmits(['updatedList']);
const newItem = (e: Event) => {
    const ie = e as InputEvent;
    if (ie.data) {
        emitUpdatedList(props.items.concat([{ title: ie.data, done: false }]));
        focusNewItem = true;
    }
    if (e.target) {
        (e.target as HTMLDivElement).innerHTML = '';
    }


};
const focusOnItem = (event: Event) => {
    if (props.disabled) return;
    const li = event.target as HTMLLIElement;
    const p = li.querySelector('p');
    if (p) {
        moveCursorToEndOfLine(p);
    }
}
const updateItemState = (idx: number) => {
    props.items[Number(idx)].done = !props.items[Number(idx)].done;
    emitUpdatedList(props.items);
}
const updateItem = (e: Event) => {
    const element = e.target as HTMLParagraphElement;
    const ie = e as InputEvent;
    const idx = Number(element.getAttribute('data-index'));
    if (ie.inputType === 'insertParagraph' || ie.inputType === 'insertText' && !ie.data) {
        const values = element.innerText.split('\n').filter(x => x);
        let newItem: IListItem;
        if (values.length === 0) {
            newItem = { title: '', done: false };
        } else {
            props.items[idx].title = values[0];
            newItem = { title: values[1] || '', done: false };
        }
        if (idx + 1 === props.items.length) {
            props.items.push(newItem);
            focusNewItem = true;
        } else {
            props.items.splice(idx + 1, 0, newItem);
        }
        emitUpdatedList(props.items);
    } else {
        if (idx) {
            props.items[idx].title = element.innerText;
            emitUpdatedList(props.items);
        }
    }
}

const deleteItem = (idx: number) => {
    props.items.splice(idx, 1);
    emitUpdatedList(props.items);
}
const emitUpdatedList = (list: IListItem[]) => {
    emits('updatedList', [...list]);
}
const moveCursorToEndOfLine = (p: HTMLParagraphElement) => {
    p.focus();
    let range, selection;
    range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(p);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection();//get the selection object (allows you to change selection)
    if (selection) {
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
}
onUpdated(() => {
    nextTick();
    const p = document.getElementById('newItemAdded') as HTMLParagraphElement;
    if (p && focusNewItem) {
        focusNewItem = false;
        setTimeout(() => moveCursorToEndOfLine(p), 0);
    }
})
</script>