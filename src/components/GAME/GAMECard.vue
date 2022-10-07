<template>
    <div v-if="task" class="flex flex-col items-center gap-4 select-none h-[170px]">
        <h4 class="text-bold"> {{task.title}}</h4>
        <p>Should take: <span class="bold">{{numberToHumanClockText(task.howLong)}}.</span></p>
        <p>Should be an <span class="bold">{{task.howHard}} task.</span></p>
        <div v-if="task.materialsListStats && task.materialsListStats.totalItems > 0"
            class="flex flex-col items-center">
            <p>has {{task.materialsListStats.totalItems}} items in it's materials list</p>
            <p>{{task.materialsListStats.markedAsDone}} items are marked as done.</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import ITask from '@/entities/Task';
import { numberToHumanClockText } from "@/lib/functions";
defineProps({
    key: String,
    task: null,
})
</script>