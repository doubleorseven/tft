import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import Task, { type CreateTaskModelData, type HowHard } from '@/entities/Task';

export function useTasksManager() {
  const tasks = ref<Task[]>([]);
  let tasksObservable: Subscription;
  const createTask = async (formData: CreateTaskModelData) => {
    const newTask = new Task(formData.title, formData.howHard as HowHard, Number(formData.howLong))
    db.tasks.add(newTask)
    return newTask;
  };
  const deleteTask = async (id: string) => {
    await db.tasks.delete(id);
  };
  const getTaskByUID = async (uidVal: string) => {
    return await db.tasks.where({ uid: uidVal }).first();
  };
  const subscribeToDB = async () => {

    tasksObservable =
      liveQuery(() => db.table('tasks').toArray())
        .subscribe(items => {
          tasks.value = items as Task[];
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
    deleteTask,
    getTaskByUID,
    tasks,
    subscribeToDB,
    unsubscribeToDB
  };
}