
import { simpleHash, createUUID } from '@/lib/functions';


export interface ITask {
    id: string;
    uid: string;
    title: string;
    howHard: HowHard;
    howLong: number;
    dateCreated: number;
}

class Task implements ITask {
    public id: string;
    public uid: string;
    public title: string;
    public howHard: HowHard;
    public howLong: number;
    public materialsListId?: string;
    public dateCreated: number;
    constructor(
        title: string,
        howHard: HowHard,
        howLong: number
    ) {
        this.title = title;
        this.howHard = howHard;
        this.howLong = howLong;
        this.id = createUUID();
        this.uid = simpleHash(this.id);
        this.dateCreated = new Date().getTime();
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}
export enum HowHard {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}

export type CreateTaskModelData = {
    title: string,
    howHard: string,
    howLong: number,
}
export type ChooseTaskStarterkModelData = {
    howHard: string,
    howLong: number,
}

export default Task;