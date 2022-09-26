import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import type ChooseTaskStarterkModelData from '@/entities/Task';
import Game from '@/entities/Game';
export function useGamificationManager() {
    let gameObservable: Subscription;
    const GAME = ref<Game>();
    const startGame = (tasks: string[], data: ChooseTaskStarterkModelData) => {
        if (tasks.length > 0) {
            endGame();
            const game = new Game(tasks, data);
            db.GAME.add(game);
            GAME.value = game;
        }
    };
    const endGame = () => {
        db.GAME.clear();
    }
    const loadNextTask = () => {
        GAME.value?.loadNextTask();
        db.GAME.put(GAME.value as Game, GAME.value?.id);
    }
    const subscribeToDB = async () => {

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
    const unsubscribeFromDB = async () => {
        if (gameObservable
            && gameObservable.closed == false) {
            gameObservable.unsubscribe();
        }
    }
    const isGameActive = () => {
        return (GAME.value?.gameActive);
    }

    return {
        GAME,
        endGame,
        loadNextTask,
        isGameActive,
        startGame,
        subscribeToDB,
        unsubscribeFromDB
    };
}