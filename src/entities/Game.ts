import BaseClass from "./BaseClass";
import type { ChooseTaskStarterModelData } from "./Task";

export default class Game extends BaseClass {
    public choosenTaskId?: string;
    public gameActive: boolean = true;
    public taskStarted: boolean = false;
    public estimatedEndDate?: number;
    private tasksIds: string[];
    private cursor: number = 0;
    public data: ChooseTaskStarterModelData;
    constructor(tasksIds: string[], data: ChooseTaskStarterModelData) {
        super();
        this.tasksIds = tasksIds;
        this.data = data;
    }
    loadNextTask(): string {
        if (++this.cursor >= this.tasksIds.length) {
            this.cursor = 0;
        }
        return this.getCurrentTask();
    }
    loadPreviousTask(): string {
        if (--this.cursor < 0) {
            this.cursor = this.tasksIds.length - 1;
        }
        return this.getCurrentTask();
    }
    getCurrentTask(): string {
        return this.tasksIds[this.cursor];
    }
    getTaskLocation() {
        return [this.cursor + 1, this.tasksIds.length] as const;
    }
    startTask(estimatedEndDate: number) {
        this.estimatedEndDate = estimatedEndDate;
        this.choosenTaskId = this.getCurrentTask();
        this.taskStarted = true;
        this.gameActive = false;
    }
}