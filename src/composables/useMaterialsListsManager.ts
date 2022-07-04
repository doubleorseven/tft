import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import MaterialsList from '@/entities/MaterialsList';
import { notify } from "@kyvg/vue3-notification";
export function useMaterialsListsManager() {
    const materialsLists = ref<MaterialsList[]>([]);
    let materialListsObservable: Subscription;
    const createMaterialsList = async () => {
        const newMaterialList = new MaterialsList('')
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
    const updateMeterialsList = async (materialsList: MaterialsList) => {
        await db.materialsLists.put(materialsList, materialsList.id);
        notify({
            type: "notification-success",
            title: `Meterial list updated!`,
        });
    }
    const getMeterialsListByUID = async (uidVal: string) => {
        return await db.materialsLists.where({ uid: uidVal }).first();
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
        materialsLists,
        subscribeToDB,
        unsubscribeToDB
    };
}