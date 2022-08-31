import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import Task, { type ChooseTaskStarterkModelData, type CreateTaskModelData, type HowHard } from '@/entities/Task';
import { notify } from "@kyvg/vue3-notification";
export function useTasksManager() {
  const tasks = ref<Task[]>([]);
  let tasksObservable: Subscription;
  const hasTasks = (): Boolean => {
    return tasks.value.length > 0;
  }
  const createTask = async (formData: CreateTaskModelData) => {
    const newTask = new Task(formData.title, formData.howHard as HowHard, Number(formData.howLong))
    db.tasks.add(newTask)
    notify({
      type: "notification-success",
      title: `${newTask.title} Created!`,
    });
    return newTask;
  };
  const tasksCountByQuery = async (formData: ChooseTaskStarterkModelData): Promise<number> => {
    return db.tasks.where('howHard').equals(formData.howHard).and(x => x.howLong <= formData.howLong).count();
  }
  const deleteTask = async (id: string) => {
    await db.tasks.delete(id);
    notify({
      type: "notification-info",
      title: `task deleted!`,
    });
  };
  const updateTask = async (task: Task) => {
    await db.tasks.put(task, task.id);
    notify({
      type: "notification-success",
      title: `task updated!`,
    });
  }
  const getTaskByUID = async (uidVal: string): Promise<Task | undefined> => {
    return await db.tasks.where({ uid: uidVal }).first();
  };
  const getTaskByID = async (idVal: string): Promise<Task | undefined> => {
    return await db.tasks.where({ id: idVal }).first();
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
    hasTasks,
    tasksCountByQuery,
    createTask,
    deleteTask,
    updateTask,
    getTaskByID,
    getTaskByUID,
    tasks,
    subscribeToDB,
    unsubscribeToDB
  };
}