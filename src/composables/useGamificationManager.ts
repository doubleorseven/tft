import { ref, toRaw } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import type ChooseTaskStarterkModelData from '@/entities/Task';
import Game from '@/entities/Game';
import type Task from '@/entities/Task';
import { useTasksManager } from './useTasksManager';
const { getTaskByID } = useTasksManager();

export function useGamificationManager() {
    let gameObservable: Subscription;
    const GAME = ref<Game>();
    const TASK = ref<Task>();
    const startGame = (tasks: string[], data: ChooseTaskStarterkModelData): string => {
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
    const endGame = (): void => {
        db.GAME.clear();
    }
    const loadNextTask = async (): Promise<void> => {
        const taskId = (GAME.value as Game).loadNextTask();
        TASK.value = await getTaskByID(taskId);
        updateGame();
    }
    const getCurrentTask = (): Task => {
        return TASK.value as Task;
    }
    const updateGame = async (): Promise<void> => {
        const g = toRaw(GAME.value as Game);
        db.GAME.put(g, g.id)
    }
    const subscribeToDB = async (): Promise<void> => {
        gameObservable =
            liveQuery(() => db.table('GAME').toArray())
                .subscribe(items => {
                    if (items.length == 1) {
                        const dbGAME = items[0] as Game;
                        if (GAME.value == undefined || dbGAME.id != GAME.value.id) {
                            GAME.value = items[0]
                        }
                    }
                    else if (items.length == 0) {
                        GAME.value = undefined;
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

    return {
        endGame,
        loadNextTask,
        getCurrentTask,
        isGameActive,
        startGame,
        subscribeToDB,
        unsubscribeFromDB
    };
}