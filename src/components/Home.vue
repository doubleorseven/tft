<template>
    <h1>Welcome!</h1>
    <template v-if="hasTasks()">
        <p>looks like you've got some tasks to do.</p>
        <CreateButton @clicked="isTaskStarterModalOpen = true">
            Select a Task
        </CreateButton>
    </template>
    <template v-else>

    </template>
    <FormModal :button-text="`Select Task`" :submit="startTaskSelector" :validate="validateChooseTaskStarter"
        header-text="Let's set our goals" :isModalOpen="isTaskStarterModalOpen" :model="{}" :errors="chooseErrors"
        :component-name="chooseTaskStarterForm" @close="chooseTaskStarterModalClosed">
    </FormModal>
    <GAMEModal :isModalOpen="GAME != undefined && GAME.gameActive" :task="(GAMETask as Task)" @end="endGame"
        @next="loadNextTask">

    </GAMEModal>
</template>
<script setup lang="ts">
import { useTasksManager } from '@/composables/useTasksManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import { ref, defineAsyncComponent, onMounted, onUnmounted, watch } from "vue";
import type IChooseTaskFormModalError from "@/entities/interfaces/IChooseTaskFormModalError";
import type { ChooseTaskStarterModelData } from "@/entities/Task";
import type Game from '@/entities/Game';
import FormModal from '@/components/shared/Forms/FormModal.vue';
import { useGamificationManager } from '@/composables/useGamificationManager';
import GAMEModal from './GAME/GAMEModal.vue';
const { startGame, endGame, loadNextTask, GAME, subscribeToDB: subscribeToGAMEDB, unsubscribeFromDB: unsubscribeToGAMEDB } = useGamificationManager();
const { hasTasks, subscribeToDB: subscribeToTasksDB, unsubscribeToDB: unsubscribeToTasksDB, getTasksIdsFromQuery } = useTasksManager();
const chooseTaskStarterForm = defineAsyncComponent(() => import("./Tasks/ChooseTaskStarter.vue"));
const isTaskStarterModalOpen = ref(false);
const chooseErrors = ref({} as IChooseTaskFormModalError);
onMounted(() => {
    subscribeToTasksDB();
    subscribeToGAMEDB();
});
onUnmounted(() => {
    unsubscribeToTasksDB();
    unsubscribeToGAMEDB();
})
const startTaskSelector = async (form: ChooseTaskStarterModelData) => {
    var tasksIds = await getTasksIdsFromQuery(form);
    startGame(tasksIds, form);
    isTaskStarterModalOpen.value = false;
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
    isTaskStarterModalOpen.value = false;
    clearErrors();
}
const clearErrors = () => {
    chooseErrors.value.howLong = '';
    chooseErrors.value.howMuchEnergy = '';
}
watch(GAME, async (newVal) => {
    if (newVal && newVal.gameActive) {
    }
});
</script>