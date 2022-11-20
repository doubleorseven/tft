<template>
    <div class="flex flex-wrap flex-col h-full lg:w-1/3 w-full break-words "
        :class="{ 'place-items-center': $isMobile }">
        <h2>Hey!</h2>
        <template v-if="isTaskStarted() && getTaskForGame">
            <p>You've choosen to do a task!</p>

            <GAMETaskView :task="getTaskForGame" @end="endGame"></GAMETaskView>
        </template>
        <template v-else-if="hasTasks() && isTaskStarted() == false">
            <p>Are you here to do something for yourself?</p>
            <p>Because it looks like you've got some tasks to do.</p>
            <CreateButton @clicked="isTaskStarterModalOpen = true" class="mt-4">
                Select a Task
            </CreateButton>
        </template>
        <template v-else>
            <div>

                <p><span class="font-bold">DTI</span> is a simple app to help you do the tasks that you postpone
                    everyday.</p>
                <p>You just create a task, set how much time you estimate it's gonna take and combine that with how much
                    energy you'll need to do it.</p>
                <p>A task can be a one time thing or it can be something you do on a regular basis.</p>
                <p>Maybe you need things to get it done? no problem! Every task can have a List list with
                    checkboxes!
                </p>
                <p>Now every time that you feel it's a good time to do your tasks, just start the tasks selector, tell
                    it
                    how much energy and time you have, and go through the optional tasks and find the one you're going
                    to
                    do.</p>
                <p>Easy right?</p>
                <br>
                <p>it seems you have'nt created any task yet.</p>
                <p>let's go to the <RouterLink @click.native="$isMobile ? changeDrawerState : undefined" to="/tasks"
                        class="underline font-semibold">tasks page</RouterLink>.
                </p>

                <p class="mt-6">just want to see how it goes?</p>
                <p>
                    <CreateButton @clicked="importDB">
                        Populate me with some data
                    </CreateButton>
                </p>
            </div>
        </template>
        <FormModal :button-text="'I wanna choose!'" :submit="startTaskSelector" :validate="validateChooseTaskStarter"
            header-text="Let's set our goals" :isModalOpen="isTaskStarterModalOpen" :model="{}" :errors="chooseErrors"
            :component-name="chooseTaskStarterForm" @close="chooseTaskStarterModalClosed">
        </FormModal>

        <component v-if="checkIfGameIsActive" :is="gameModal" :isModalOpen="checkIfGameIsActive" :task="getTaskForGame"
            @end="endGame" @next="loadNextTask" @select="selectTask" @previous="loadPreviousTask" />
    </div>
</template>
<script setup lang="ts">
import { useTasksManager } from '@/composables/useTasksManager';
import { useApplicationSettings } from '@/composables/useApplicationSettings';
import CreateButton from '@/components/shared/Actions/CreateButton.vue';
import { ref, defineAsyncComponent, onMounted, onUnmounted, computed, nextTick } from "vue";
import type IChooseTaskFormModalError from "@/entities/interfaces/IChooseTaskFormModalError";
import type { ChooseTaskStarterModelData } from "@/entities/Task";
import FormModal from '@/components/shared/Forms/FormModal.vue';
import { useGamificationManager } from '@/composables/useGamificationManager';
import { notify } from '@kyvg/vue3-notification';
import GAMETaskView from '@/components/GAME/GAMETaskView.vue';
import { useDBManager } from '@/composables/useDBManager';
const { changeDrawerState } = useApplicationSettings();
const { importDB } = useDBManager();
const { startGame,
    endGame,
    selectTask,
    isTaskStarted,
    loadNextTask,
    loadPreviousTask,
    GAMETask,
    isGameActive,
    subscribeToDB: subscribeToGAMEDB,
    unsubscribeFromDB: unsubscribeToGAMEDB
} = useGamificationManager();
const { hasTasks,
    subscribeToDB: subscribeToTasksDB,
    unsubscribeToDB: unsubscribeToTasksDB,
    getTasksIdsFromQuery
} = useTasksManager();
const chooseTaskStarterForm = defineAsyncComponent(() => import("./Tasks/ChooseTaskStarter.vue"));
const gameModal = defineAsyncComponent(() => import("./GAME/GAMEModal.vue"));
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