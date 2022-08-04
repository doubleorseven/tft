
import { simpleHash, createUUID } from '@/lib/functions';
import type IListItem from './interfaces/IListItem';

export default class MaterialsList {
    public taskId?: string;
    public title: string;
    public id: string;
    public uid: string;
    public dateCreated: number;
    public items: Array<IListItem>;
    constructor(
        taskId?: string,
        title?: string
    ) {
        if (taskId) {
            this.taskId = taskId;
        }

        this.id = createUUID();
        this.uid = simpleHash(this.id);
        this.title = `${title} - materials list ` || `materials list - ${this.uid}`;
        this.dateCreated = new Date().getTime();
        this.items = [];
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}
