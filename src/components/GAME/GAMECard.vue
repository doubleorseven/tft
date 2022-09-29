<template>
    <div class="flex flex-col gap-4">
        <h1> {{task.title}}</h1>
        <p>Should take: <span class="bold">{{task.howLong}} minutes</span></p>
        <p>Should be an <span class="bold">{{task.howHard}} task</span></p>
    </div>
</template>
<script setup lang="ts">
import ITask from '@/entities/Task';
defineProps({
    key: String,
    task: { type: ITask, required: true },
})
</script>