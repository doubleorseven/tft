<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch,onMounted } from 'vue'
import  {useTasksManager} from '@/lib/useTasksManager';
import type Task from '@/entities/Task';
const route = useRoute()
const task = ref<Task>();
const {getTaskByUID} = useTasksManager();

onMounted(() =>
        watch(
            () => route.params.uid as string,
            async newId => {
                task.value =  await getTaskByUID(newId);
        },{ immediate: true })
);

</script>


<template>
<h1>{{task?.title}}</h1>
</template>