import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import Task, { type CreateTaskModelData, type HowHard } from '@/entities/Task';

export function useTasksManager() {
    const tasks = ref<Task[]>([]);
    let tasksObservable: Subscription;
    const createTask = async (formData: CreateTaskModelData)  => {
      debugger;
      const newTask = new Task(formData.title,formData.howHard as HowHard,Number(formData.howLong))
      db.tasks.add(newTask)
      return newTask;
    } ;
    const getTaskByUID = async (uidVal: string) => {
      debugger;
      return await db.tasks.where({uid: uidVal}).first();
    };
    const subscribeToDB = async () => {
      tasksObservable = 
        liveQuery(() => db.tasks.toArray())
        .subscribe(items => {
          tasks.value = items;
        });
    };
    const unsubscribeToDB = async () => {
      if (tasksObservable 
        && tasksObservable.closed == false) {
        tasksObservable.unsubscribe();
      }
    }

    return {
      createTask,
      getTaskByUID,
      tasks,
      subscribeToDB,
      unsubscribeToDB
    };
  }