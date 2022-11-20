
import BaseClass from './BaseClass';
import type IListItem from './interfaces/IListItem';
import type ListStats from './interfaces/ListStats';
export default class List extends BaseClass {
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


        this.title = (title) ? `${title} - List` : `new list`;
        this.items = [];
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
    public get Stats(): ListStats {
        return {
            markedAsDone: this.items.filter(x => x.done).length,
            totalItems: this.items.length,
        } as ListStats;
    }
}