import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '@/lib/db';
import { liveQuery, type Subscription } from "dexie";
import Task from '@/entities/Task';

export function useTasksManager() {
    const tasks = ref<Task[]>([]);
    let tasksObservable: Subscription;
    const createTask = async (event: any) => {
      if (event) {
        event.preventDefault();
      }
      db.tasks.add(new Task('newtask'))
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