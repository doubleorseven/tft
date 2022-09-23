<template>
    <h1>Welcome!</h1>
    <template v-if="hasTasks()">
        <p>looks like you've got some tasks to do.</p>
        <CreateButton @clicked="isModalOpen = true">
            Select a Task
        </CreateButton>
    </template>
    <template v-else>

    </template>
    <FormModal :button-text="`Select Task`" :submit="startTaskSelector" :validate="validateChooseTaskStarter"
        header-text="Let's set our goals" :isModalOpen="isModalOpen" :model="{}" :errors="chooseErrors"
        :component-name="chooseTaskStarterForm" @close="chooseTaskStarterModalClosed">
    </FormModal>
</template>
<script setup lang="ts">
import { useTasksManager } from '@/composables/useTasksManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import { ref, defineAsyncComponent, onMounted, onUnmounted, watch } from "vue";
import type IChooseTaskFormModalError from "@/entities/interfaces/IChooseTaskFormModalError";
import type { ChooseTaskStarterModelData } from "@/entities/Task";
import FormModal from '@/components/shared/Forms/FormModal.vue';
import { useGamificationManager } from '@/composables/useGamificationManager';
const { startGame, GAME } = useGamificationManager();
const { hasTasks, subscribeToDB, unsubscribeToDB, getTasksIdsFromQuery } = useTasksManager();
const chooseTaskStarterForm = defineAsyncComponent(() => import("./Tasks/ChooseTaskStarter.vue"));
const isModalOpen = ref(false);
const chooseErrors = ref({} as IChooseTaskFormModalError);
onMounted(subscribeToDB)
onUnmounted(unsubscribeToDB)
const startTaskSelector = async (form: ChooseTaskStarterModelData) => {
    var tasksIds = await getTasksIdsFromQuery(form);
    startGame(tasksIds, form);
    isModalOpen.value = false;
    clearErrors();
}
const validateChooseTaskStarter =
    (form: ChooseTaskStarterModelData) => {
        let noErrors = true;
        clearErrors();
        if (!form.howMuchEnergy) {
            chooseErrors.value.howMuchEnergy = 'please choose level of difficulty';
            noErrors = false;
        }
        if (!form.howLong) {
            chooseErrors.value.howLong = 'please choose how much time you have';
            noErrors = false;
        }
        return noErrors;
    }
const chooseTaskStarterModalClosed = () => {
    isModalOpen.value = false;
    clearErrors();
}
const clearErrors = () => {
    chooseErrors.value.howLong = '';
    chooseErrors.value.howMuchEnergy = '';
}
watch(GAME, async (newVal) => {
    debugger;
    console.log(newVal);
});
</script>