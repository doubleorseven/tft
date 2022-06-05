import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import Task, { type CreateTaskModelData, type HowHard } from '@/entities/Task';

export function useTasksManager() {
    const tasks = ref<Task[]>([]);
    let tasksObservable: Subscription;
    const createTask = async (formData: CreateTaskModelData) => {
      const newTask = new Task(formData.title,formData.howHard as unknown as HowHard,formData.howLong)
      db.tasks.add(newTask)
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

  onMounted(subscribeToDB);
  onUnmounted(unsubscribeToDB)
    return {
      createTask,
      tasks,
    };
  }