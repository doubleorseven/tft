import { ref } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Collection, type Subscription } from "dexie";
import Task, { HowMuchEnergyArray, HowHardArray, type ChooseTaskStarterModelData, type CreateTaskModelData, type HowHard } from '@/entities/Task';
import { useMaterialsListsManager } from '@/composables/useMaterialsListsManager';
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
    return queryResults.count();
  }
  const tasksForGameByQuery = async (formData: ChooseTaskStarterModelData): Promise<Collection<Task, string>> => {
    const range = HowHardArray.slice(0, HowMuchEnergyArray.indexOf(formData.howMuchEnergy) + 1);
    return db.tasks.where('howHard').startsWithAnyOf(range).and(x => x.howLong <= formData.howLong);
  }
  const getTasksIdsFromQuery = async (formData: ChooseTaskStarterModelData): Promise<string[]> => {
    const queryResults = await tasksForGameByQuery(formData);
    return queryResults.primaryKeys();
  }
  const deleteTask = async (id: string) => {
    await db.tasks.delete(id);
    notify({
      type: "notification-info",
      title: `task deleted!`,
    });
  };
  const removeTaskMaterialsList = async (id: string) => {
    db.tasks.update(id, {
      "materialsListId": undefined
    });
  }
  const updateTask = async (task: Task, silent: boolean = false) => {
    await db.tasks.put(task, task.id);
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
      if (task.materialsListId) {
        const { getMeterialsListStats } = useMaterialsListsManager();
        task.materialsListStats = await getMeterialsListStats(task.materialsListId);
      }
      return task;
    }
    return undefined;
  }
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
    getTasksIdsFromQuery,
    createTask,
    deleteTask,
    updateTask,
    removeTaskMaterialsList,
    getTaskByID,
    getTaskByUID,
    getTaskForGame,
    tasks,
    subscribeToDB,
    unsubscribeToDB
  };
}