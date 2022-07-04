import Dexie from 'dexie';
import type { Table } from 'dexie';
import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import Task from '@/entities/Task';
import MaterialsList from '@/entities/MaterialsList';
import { APP_DB_VERSION } from './constants';
export class TFTDixie extends Dexie {
  tasks!: Table<Task, string>;
  appSettings!: Table<IApplicationSettings, string>;
  materialsLists!: Table<MaterialsList, string>;
  constructor() {
    super('tft-database');
    this.version(APP_DB_VERSION).stores({
      tasks: 'id, title, uid',
      appSettings: '',
      materialsLists: 'id,uid',
    });
    this.tasks.mapToClass(Task);
    this.materialsLists.mapToClass(MaterialsList);
  }
}
export const db = new TFTDixie();

