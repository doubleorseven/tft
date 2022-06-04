
import {simpleHash, createUUID} from '@/lib/functions';

class Task {
    id: string;
    hid?: string;
    title: string;
    constructor(
        title: string,
    ) {
        this.title = title;
        this.id = createUUID();
        this.hid = simpleHash(this.id);
    }
}
export default Task;