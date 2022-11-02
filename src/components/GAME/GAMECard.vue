<template>
    <div v-if="task" class="flex flex-col items-center gap-4 select-none h-[170px]">
        <h4 class="text-bold"> {{ task.title }}</h4>
        <p>Should take: <span v-html="numberToHumanClockText(task.howLong)"></span>.</p>
        <p>Should be an <span class="font-bold">{{ task.howHard }}</span> task.</p>
        <div v-if="task.materialsListStats && task.materialsListStats.totalItems > 0"
            class="flex flex-col items-center">
            <p>has <span class="font-bold">{{ task.materialsListStats.totalItems }}</span> items in it's materials list
            </p>
            <p><span class="font-bold">{{ task.materialsListStats.markedAsDone }}</span> items are marked as done.</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { numberToHumanClockText } from "@/lib/functions";
defineProps({
    key: String,
    task: null,
})
</script>