import { ref, toRaw } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import type { ChooseTaskStarterModelData } from '@/entities/Task';
import Game from '@/entities/Game';
import { useTasksManager } from './useTasksManager';
import _default from '@kyvg/vue3-notification';
import type Task from '@/entities/Task';
import { datetime } from '@intlify/core-base';
const { getTaskForGame, updateTask, deleteTask } = useTasksManager();

export function useGamificationManager() {
    let gameObservable: Subscription;
    const GAME = ref<Game>();
    const GAMETask = ref<Task>();
    const startGame = (tasks: string[], data: ChooseTaskStarterModelData): string => {
        if (tasks.length > 0) {
            endGame();
            const game = new Game(tasks, data);
            game.loadNextTask();
            db.GAME.add(game);
            GAME.value = game;
            return game.getCurrentTask();
        }
        return '';
    };
    const endGame = async (result: Boolean = false): Promise<void> => {
        if (GAMETask.value?.title) {
            const gt = (GAMETask.value as Task);
            if (gt.oneTime) {
                deleteTask(gt.id, true);
            } else {
                if (result) {
                    gt.statistics.succeed++;
                    gt.statistics.lastTimeSelected = Date.now();
                } else {
                    gt.statistics.failed++;
                }
                saveGameTask();
            }
        }
        db.GAME.clear();
    }
    const loadNextTask = async (): Promise<void> => {
        updateCurrentTask((GAME.value as Game).loadNextTask());
    }
    const loadPreviousTask = async (): Promise<void> => {
        updateCurrentTask((GAME.value as Game).loadPreviousTask());
    }
    const selectTask = async (): Promise<void> => {
        const estimatedEndDate = Date.now() + (GAMETask.value?.howLong as number * 60000);
        GAME.value?.startTask(estimatedEndDate);
        saveGame();

    }
    const updateCurrentTask = async (taskId: string): Promise<void> => {
        if (GAMETask.value?.title) {
            (GAMETask.value as Task).statistics.skipped++;
            await saveGameTask();
        }
        GAMETask.value = await getTaskForGame(taskId);
        saveGame();
    }
    const saveGameTask = async (): Promise<void> => {
        await updateTask(toRaw(GAMETask.value as Task), true);
    }
    const saveGame = async (): Promise<void> => {
        const g = toRaw(GAME.value as Game);
        db.GAME.put(g, g.id)
    }
    const subscribeToDB = async (): Promise<void> => {
        gameObservable =
            liveQuery(() => db.table('GAME').toArray())
                .subscribe(async (items) => {
                    if (items.length == 1) {
                        const dbGAME = items[0] as Game;
                        if (GAME.value == undefined || dbGAME.id != GAME.value.id) {
                            GAME.value = items[0];
                            if (GAME.value?.taskStarted) {
                                const dbgt = await getTaskForGame(GAME.value.choosenTaskId as string);
                                if (dbgt) {
                                    GAMETask.value = dbgt;
                                }
                            }
                        }
                    }
                    else if (items.length == 0) {
                        GAME.value = undefined;
                        GAMETask.value = undefined;
                    }
                });
    };
    const unsubscribeFromDB = async (): Promise<void> => {
        if (gameObservable
            && gameObservable.closed == false) {
            gameObservable.unsubscribe();
        }
    }
    const isGameActive = (): boolean => {
        if (GAME.value) {
            return GAME.value.gameActive;
        }
        return false;
    }
    const isTaskStarted = (): boolean => {
        if (GAME.value) {
            return GAME.value.taskStarted;
        }
        return false;
    }

    return {
        endGame,
        loadNextTask,
        loadPreviousTask,
        GAMETask,
        isGameActive,
        isTaskStarted,
        selectTask,
        startGame,
        subscribeToDB,
        unsubscribeFromDB,
    };
}