import Dexie from 'dexie';
import type { Table } from 'dexie';
import Task from '@/entities/Task';

export class TFTDixie extends Dexie {
  tasks!: Table<Task, string>;

  constructor() {
    super('tft-database');
    this.version(1).stores({
      tasks: 'id, title, uid'
    });
    this.tasks.mapToClass(Task);

  }
}
export const db = new TFTDixie();

