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
    const subscribeToDB = async () => {

        gameObservable =
            liveQuery(() => db.table('GAME').toArray())
                .subscribe(items => {
                    if (items.length == 1) {
                        GAME.value = items[0]
                    };
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
        isGameActive,
        startGame,
        subscribeToDB,
        unsubscribeFromDB
    };
}