import { setTransitionHooks } from "vue";
import BaseClass from "./BaseClass";
import type { ChooseTaskStarterModelData } from "./Task";

export default class Game extends BaseClass {
    public choosenTaskId?: string;
    public gameActive: boolean = true;
    public gameStarted: boolean = false;
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
    getCurrentTask(): string {
        return this.tasksIds[this.cursor];
    }
    getTaskLocation() {
        return [this.cursor + 1, this.tasksIds.length] as const;
    }
}