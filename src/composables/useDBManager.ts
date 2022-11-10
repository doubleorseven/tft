import { db } from '@/lib/db';
import "dexie-export-import";
import { notify } from "@kyvg/vue3-notification";
export function useDBManager() {

    const importDB = async () => {
        const f = '/dummy.json';
        await fetch(f)
            .then((response) => response.blob())
            .then(async (blob) => {
                await db.tasks.clear();
                await db.GAME.clear();
                await db.materialsLists.clear();
                await db.appSettings.clear();
                await db.import(blob);
                notify({
                    type: "notification-success",
                    title: `Database loaded successfully!`,
                });
            });
    }
    const clearDB = () => {
        db.delete().then(() => {
            notify({
                type: "notification-success",
                title: `Database deleted successfully!`,
            });
            setTimeout(() => {
                window.location.href = '/';
            }, (1000));
        }).catch((err) => {
            notify({
                type: "notification-error",
                title: `Could not delete database`,
            });
        });
    }
    const exportDB = async () => {
        const blob = await db.export();
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", URL.createObjectURL(blob));
        downloadAnchorNode.setAttribute("download", `dtidb-${Date.now()}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    return {
        clearDB,
        exportDB,
        importDB
    }
}