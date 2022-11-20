import Dexie from 'dexie';
import type { Table } from 'dexie';
import type IApplicationSettings from "@/entities/interfaces/IApplicationSettings"
import Task from '@/entities/Task';
import Game from '@/entities/Game';
import List from '@/entities/List';
import { APP_DB_VERSION } from './constants';
export class DTIDixie extends Dexie {
  tasks!: Table<Task, string>;
  appSettings!: Table<IApplicationSettings, string>;
  Lists!: Table<List, string>;
  GAME!: Table<Game, string>;
  constructor() {
    super('dti-database');
    this.version(APP_DB_VERSION).stores({
      tasks: 'id, title, uid, howHard',
      appSettings: '',
      Lists: 'id,uid',
      GAME: 'id',
      // }).upgrade(trans => {
      //   return trans.db.table('tasks').toCollection().modify((task: Task) => {
      //     task.oneTime = false;
      //   });
    });
    this.tasks.mapToClass(Task);
    this.Lists.mapToClass(List);
    this.GAME.mapToClass(Game);
  }
}
export const db = new DTIDixie();

