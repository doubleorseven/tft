
import { simpleHash, createUUID } from '@/lib/functions';

export default class MaterialsList {
    public taskId?: string;
    public id: string;
    public uid: string;
    public dateCreated: number;
    constructor(
        taskId: string
    ) {
        if (taskId) {
            this.taskId = taskId;
        }
        this.id = createUUID();
        this.uid = simpleHash(this.id);
        this.dateCreated = new Date().getTime();
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}
