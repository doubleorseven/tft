<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import  {useTasksManager} from '@/lib/useTasksManager';
import type Task from '@/entities/Task';
const route = useRoute()
const task = ref<Task>();
const {getTaskByUID} = useTasksManager();

watch(
    () => route.params.uid as string,
    async newId => {
        task.value = await getTaskByUID(newId)
    }
)

</script>


<template>
<h1>{{$route.params.uid}}</h1>
<h1>{{task?.title}}</h1>
</template>