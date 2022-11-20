import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import List from '@/entities/List';
import { useTasksManager } from '@/composables/useTasksManager';
import { notify } from "@kyvg/vue3-notification";
import type ListStats from '@/entities/interfaces/ListStats';
export function useListsManager() {
    const Lists = ref<List[]>([]);
    const { getTaskByID } = useTasksManager();
    let ListsObservable: Subscription;
    const createList = async (taskId?: string) => {
        let newList: List;
        if (taskId) {

            const task = await getTaskByID(taskId);
            newList = new List(task?.id, task?.title);
        }
        else {
            newList = new List('', '');
        }
        db.Lists.add(newList)
        notify({
            type: "notification-success",
            title: `Meterial list created!`,
        });
        return newList;
    };
    const deleteList = async (id: string) => {
        await db.Lists.delete(id);
        notify({
            type: "notification-info",
            title: `Meterial list deleted!`,
        });
    };
    const updateMeterialsList = async (List: List, silent: boolean = false) => {
        await db.Lists.put(List, List.id);
        if (silent == false) {
            notify({

                type: "notification-success",
                title: `Meterial list updated!`,
            });
        }

    }
    const getMeterialsListByUID = async (uidVal: string): Promise<List | undefined> => {
        return await db.Lists.where({ uid: uidVal }).first();
    };
    const getMeterialsListByID = async (idVal: string): Promise<List | undefined> => {

        return await db.Lists.where({ id: idVal }).first();
    };
    const getMeterialsListStats = async (idVal: string): Promise<ListStats | undefined> => {
        const ml = await getMeterialsListByID(idVal);
        if (ml) {
            return ml.Stats;
        }
        return undefined;

    }
    const subscribeToDB = async () => {

        ListsObservable =
            liveQuery(() => db.table('Lists').toArray())
                .subscribe(items => {
                    Lists.value = (items as List[]).sort((a, b) => b.dateCreated - a.dateCreated);;
                });
    };
    const unsubscribeToDB = async () => {
        if (ListsObservable
            && ListsObservable.closed == false) {
            ListsObservable.unsubscribe();
        }
    }

    return {
        createList,
        deleteList,
        updateMeterialsList,
        getMeterialsListByUID,
        getMeterialsListByID,
        getMeterialsListStats,
        Lists,
        subscribeToDB,
        unsubscribeToDB
    };
}