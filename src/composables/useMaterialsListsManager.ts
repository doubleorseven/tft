import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import MaterialsList from '@/entities/MaterialsList';
import { useTasksManager } from '@/composables/useTasksManager';
import { notify } from "@kyvg/vue3-notification";
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
    const getMeterialsListByUID = async (uidVal: string) => {
        return await db.materialsLists.where({ uid: uidVal }).first();
    };
    const getMeterialsListByID = async (idVal: string) => {
        return await db.materialsLists.where({ id: idVal }).first();
    };
    const subscribeToDB = async () => {

        materialListsObservable =
            liveQuery(() => db.table('materialsLists').toArray())
                .subscribe(items => {
                    materialsLists.value = items as MaterialsList[];
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
        materialsLists,
        subscribeToDB,
        unsubscribeToDB
    };
}