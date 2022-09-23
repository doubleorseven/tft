import { simpleHash, createUUID } from '@/lib/functions';

export default class BaseClass {
    public dateCreated: number;
    public id: string;
    public uid: string;
    constructor() {
        this.id = createUUID();
        this.uid = simpleHash(this.id);
        this.dateCreated = new Date().getTime();
    }
    public get DateCreatedFormatted() {
        return new Date(this.dateCreated).toLocaleDateString();
    }
}