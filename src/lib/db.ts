import Dexie from 'dexie';
import type { Table } from 'dexie';
import  type Task  from '@/entities/Task';

export class TFTDixie extends Dexie {
  tasks!: Table<Task>; 

  constructor() {
    super('tft-database');
    this.version(1).stores({
      tasks: 'id, title, uid'
    });
  }
}

export const db = new TFTDixie();
