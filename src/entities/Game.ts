import BaseClass from "./BaseClass";
import type { ChooseTaskStarterModelData } from "./Task";

export default class Game extends BaseClass {
    public choosenTaskId?: string;
    public gameActive: boolean = true;
    public gameStarted: boolean = false;
    public estimatedEndDate?: number;
    public tasksIds: string[];
    public data: ChooseTaskStarterModelData;
    constructor(tasksIds: string[], data: ChooseTaskStarterModelData) {
        super();
        this.tasksIds = tasksIds;
        this.data = data;
    }
}