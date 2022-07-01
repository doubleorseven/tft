import Dexie from 'dexie';
import type { Table } from 'dexie';
import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import Task from '@/entities/Task';
import { APP_DB_VERSION } from './constants';
export class TFTDixie extends Dexie {
  tasks!: Table<Task, string>;
  appSettings!: Table<IApplicationSettings, string>;
  constructor() {
    super('tft-database');
    this.version(APP_DB_VERSION).stores({
      tasks: 'id, title, uid',
      appSettings: '',
    });
    this.tasks.mapToClass(Task);
  }
}
export const db = new TFTDixie();

