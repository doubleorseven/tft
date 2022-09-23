
import BaseClass from './BaseClass';
import type IListItem from './interfaces/IListItem';
export default class MaterialsList extends BaseClass {
    public taskId?: string;
    public title: string;
    public items: Array<IListItem>;
    constructor(
        taskId?: string,
        title?: string
    ) {
        super();
        if (taskId) {
            this.taskId = taskId;
        }


        this.title = `${title} - materials list ` || `materials list - ${this.uid}`;
        this.items = [];
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}
