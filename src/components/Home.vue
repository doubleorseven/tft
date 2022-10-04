<template>
    <div class="flex flex-wrap flex-col h-full items-center ">
        <h1>Welcome!</h1>
        <template v-if="hasTasks()">
            <p>looks like you've got some tasks to do.</p>
            <CreateButton @clicked="isTaskStarterModalOpen = true">
                Select a Task
            </CreateButton>
        </template>
        <template v-else>

        </template>
        <FormModal :button-text="`Start Game`" :submit="startTaskSelector" :validate="validateChooseTaskStarter"
            header-text="Let's set our goals" :isModalOpen="isTaskStarterModalOpen" :model="{}" :errors="chooseErrors"
            :component-name="chooseTaskStarterForm" @close="chooseTaskStarterModalClosed">
        </FormModal>
        <GAMEModal :isModalOpen="checkIfGameIsActive" :task="getTaskForGame" @end="endGame" @next="loadNextTask"
            @select="selectTaskFromGame" @previous="loadPreviousTask">
        </GAMEModal>
    </div>
</template>
<script setup lang="ts">
import { useTasksManager } from '@/composables/useTasksManager';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import { ref, defineAsyncComponent, onMounted, onUnmounted, computed, nextTick } from "vue";
import type IChooseTaskFormModalError from "@/entities/interfaces/IChooseTaskFormModalError";
import type { ChooseTaskStarterModelData } from "@/entities/Task";
import Game from '@/entities/Game';
import FormModal from '@/components/shared/Forms/FormModal.vue';
import { useGamificationManager } from '@/composables/useGamificationManager';
import GAMEModal from './GAME/GAMEModal.vue';
import type Task from '@/entities/Task';
import { notify } from '@kyvg/vue3-notification';
const { startGame, endGame, loadNextTask, loadPreviousTask, GAMETask, isGameActive, subscribeToDB: subscribeToGAMEDB, unsubscribeFromDB: unsubscribeToGAMEDB } = useGamificationManager();
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

const checkIfGameIsActive = computed(isGameActive);
const getTaskForGame = computed(() => {
    nextTick();
    return GAMETask.value;
});
const startTaskSelector = async (form: ChooseTaskStarterModelData) => {
    const tasksIds = await getTasksIdsFromQuery(form);
    if (tasksIds.length > 0) {
        startGame(tasksIds, form);
        isTaskStarterModalOpen.value = false;
    } else {
        notify({
            type: "notification-warning",
            title: `no tasks following your current state`,
        });
    }

    clearErrors();
}
const selectTaskFromGame = () => {
    debugger;
}
const validateChooseTaskStarter =
    (form: ChooseTaskStarterModelData) => {
        let noErrors = true;
        clearErrors();
        if (!form.howMuchEnergy) {
            chooseErrors.value.howMuchEnergy = 'please choose level of energy';
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
</script>