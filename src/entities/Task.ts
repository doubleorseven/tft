
import BaseClass from './BaseClass';
import type MaterialsListStats from './interfaces/MaterialsListStats';


export interface ITask {
    title: string;
    howHard: HowHard;
    howLong: number;
    statistics: TaskStatistics;
}

export default class Task extends BaseClass implements ITask {
    public title: string;
    public howHard: HowHard;
    public howLong: number;
    public materialsListId?: string;
    public materialsListStats?: MaterialsListStats;
    public statistics: TaskStatistics;
    constructor(
        title: string,
        howHard: HowHard,
        howLong: number
    ) {
        super();
        this.title = title;
        this.howHard = howHard;
        this.howLong = howLong;
        this.statistics = new TaskStatistics();
    }
}
export class TaskStatistics {
    public succeed: number = 0;
    public failed: number = 0;
    public skipped: number = 0;
    public get views(): number {
        return this.started + this.skipped;
    }
    public get started(): number {
        return this.failed + this.succeed;
    }
}

export enum HowHard {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}
export const HowHardArray = ["Easy", "Medium", "Hard"];
export enum HowMuchEnergy {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}
export const HowMuchEnergyArray = ["Low", "Medium", "High"];
export type CreateTaskModelData = {
    title: string,
    howHard: string,
    howLong: number,
}
export type ChooseTaskStarterModelData = {
    howMuchEnergy: string,
    howLong: number,
}
