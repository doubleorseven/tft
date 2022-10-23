import { db } from '@/lib/db';
import "dexie-export-import";
import { notify } from "@kyvg/vue3-notification";
export function useDBManager() {

    const importDB = () => {

    }
    const clearDB = () => {
        db.delete().then(() => {
            notify({
                type: "notification-success",
                title: `Database deleted successfuly!`,
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
        downloadAnchorNode.setAttribute("download", `tft-${Date.now()}.json`);
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