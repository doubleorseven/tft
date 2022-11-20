import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Collection, type Subscription } from "dexie";
import Task, { HowMuchEnergyArray, HowHardArray, type ChooseTaskStarterModelData, type CreateTaskModelData, type HowHard, type ITask } from '@/entities/Task';
import { useListsManager } from '@/composables/useListsManager';
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
  const tasksCountByQuery = async (formData: ChooseTaskStarterModelData): Promise<number> => {
    const queryResults = await tasksForGameByQuery(formData);
    return queryResults.length;
  }
  const tasksForGameByQuery = async (formData: ChooseTaskStarterModelData): Promise<Task[]> => {
    const range = HowHardArray.slice(0, HowMuchEnergyArray.indexOf(formData.howMuchEnergy) + 1);
    const tasks = await db.tasks.where('howHard').startsWithAnyOf(range).and(x => x.howLong <= formData.howLong).toArray();
    return tasks.filter(x => !x.delayIt);
  }
  const getTasksIdsFromQuery = async (formData: ChooseTaskStarterModelData): Promise<string[]> => {
    const queryResults = await tasksForGameByQuery(formData);
    return queryResults.map(x => x.id);
  }
  const deleteTask = async (id: string, silent: boolean = false) => {
    await db.tasks.delete(id);
    if (silent == false) {
      notify({
        type: "notification-info",
        title: `task deleted!`,
      });
    }
  };
  const removeTaskList = async (id: string) => {
    db.tasks.update(id, {
      "ListId": undefined
    });
  }
  const updateTask = async (task: ITask, silent: boolean = false) => {
    await db.tasks.put(task as Task, (task as Task).id);
    if (silent == false)
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
  const getTaskForGame = async (idVal: string): Promise<Task | undefined> => {
    const task = await getTaskByID(idVal);
    if (task) {
      if (task.ListId) {
        const { getMeterialsListStats } = useListsManager();
        task.ListStats = await getMeterialsListStats(task.ListId);
      }
      return task;
    }
    return undefined;
  }
  const subscribeToDB = async () => {

    tasksObservable =
      liveQuery(() => db.table('tasks').toArray())
        .subscribe(items => {
          tasks.value = (items as Task[]).sort((a, b) => b.dateCreated - a.dateCreated);
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
    getTasksIdsFromQuery,
    createTask,
    deleteTask,
    updateTask,
    removeTaskList,
    getTaskByID,
    getTaskByUID,
    getTaskForGame,
    tasks,
    subscribeToDB,
    unsubscribeToDB
  };
}