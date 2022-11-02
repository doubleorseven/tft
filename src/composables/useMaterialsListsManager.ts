import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import MaterialsList from '@/entities/MaterialsList';
import { useTasksManager } from '@/composables/useTasksManager';
import { notify } from "@kyvg/vue3-notification";
import type MaterialsListStats from '@/entities/interfaces/MaterialsListStats';
export function useMaterialsListsManager() {
    const materialsLists = ref<MaterialsList[]>([]);
    const { getTaskByID } = useTasksManager();
    let materialListsObservable: Subscription;
    const createMaterialsList = async (taskId?: string) => {
        let newMaterialList: MaterialsList;
        if (taskId) {

            const task = await getTaskByID(taskId);
            newMaterialList = new MaterialsList(task?.id, task?.title);
        }
        else {
            newMaterialList = new MaterialsList('', '');
        }
        db.materialsLists.add(newMaterialList)
        notify({
            type: "notification-success",
            title: `Meterial list created!`,
        });
        return newMaterialList;
    };
    const deleteMaterialsList = async (id: string) => {
        await db.materialsLists.delete(id);
        notify({
            type: "notification-info",
            title: `Meterial list deleted!`,
        });
    };
    const updateMeterialsList = async (materialsList: MaterialsList, silent: boolean = false) => {
        await db.materialsLists.put(materialsList, materialsList.id);
        if (silent == false) {
            notify({

                type: "notification-success",
                title: `Meterial list updated!`,
            });
        }

    }
    const getMeterialsListByUID = async (uidVal: string): Promise<MaterialsList | undefined> => {
        return await db.materialsLists.where({ uid: uidVal }).first();
    };
    const getMeterialsListByID = async (idVal: string): Promise<MaterialsList | undefined> => {

        return await db.materialsLists.where({ id: idVal }).first();
    };
    const getMeterialsListStats = async (idVal: string): Promise<MaterialsListStats | undefined> => {
        const ml = await getMeterialsListByID(idVal);
        if (ml) {
            return ml.Stats;
        }
        return undefined;

    }
    const subscribeToDB = async () => {

        materialListsObservable =
            liveQuery(() => db.table('materialsLists').toArray())
                .subscribe(items => {
                    materialsLists.value = (items as MaterialsList[]).sort((a, b) => b.dateCreated - a.dateCreated);;
                });
    };
    const unsubscribeToDB = async () => {
        if (materialListsObservable
            && materialListsObservable.closed == false) {
            materialListsObservable.unsubscribe();
        }
    }

    return {
        createMaterialsList,
        deleteMaterialsList,
        updateMeterialsList,
        getMeterialsListByUID,
        getMeterialsListByID,
        getMeterialsListStats,
        materialsLists,
        subscribeToDB,
        unsubscribeToDB
    };
}