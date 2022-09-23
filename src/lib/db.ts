import Dexie from 'dexie';
import type { Table } from 'dexie';
import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import Task from '@/entities/Task';
import Game from '@/entities/Game';
import MaterialsList from '@/entities/MaterialsList';
import { APP_DB_VERSION } from './constants';
export class TFTDixie extends Dexie {
  tasks!: Table<Task, string>;
  appSettings!: Table<IApplicationSettings, string>;
  materialsLists!: Table<MaterialsList, string>;
  GAME!: Table<Game, string>;
  constructor() {
    super('tft-database');
    this.version(APP_DB_VERSION).stores({
      tasks: 'id, title, uid, howHard',
      appSettings: '',
      materialsLists: 'id,uid',
      GAME: 'id',
    });
    this.tasks.mapToClass(Task);
    this.materialsLists.mapToClass(MaterialsList);
    this.GAME.mapToClass(Game);
  }
}
export const db = new TFTDixie();

