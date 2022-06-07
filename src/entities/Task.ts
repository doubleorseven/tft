
import {simpleHash, createUUID} from '@/lib/functions';

class Task {
    public id: string;
    public hid?: string;
    public title: string;
    public howHard: HowHard;
    public howLong: number;
    constructor(
        title: string,
        howHard: HowHard,
        howLong: number
    ) {
        this.title = title;
        this.howHard = howHard;
        this.howLong = howLong;
        this.id = createUUID();
        this.hid = simpleHash(this.id);
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

export default Task;