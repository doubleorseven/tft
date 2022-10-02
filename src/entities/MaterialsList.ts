
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


        this.title = (title) ? `${title} - materials list ` : `new materials list`;
        this.items = [];
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}
.7