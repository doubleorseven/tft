import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from '@/components/Tasks/TasksPage.vue'
import Task from '@/components/Tasks/Task.vue';
import ListsPage from '@/components/Lists/ListsPage.vue';
import List from '@/components/Lists/List.vue';
import Home from '@/components/Home.vue';
import Settings from '@/components/Settings/Settings.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/task/:uid',
      name: 'task',
      component: Task
    },
    {
      path: '/lists',
      name: 'lists',
      component: ListsPage
    },
    {
      path: '/list/:uid',
      name: 'list',
      component: List,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Settings
    }
  ]
})

export default router
