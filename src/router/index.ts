import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from '@/components/Tasks/TasksPage.vue'
import Task from '@/components/Tasks/Task.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage
    },
    {
      path: '/task/:uid',
      name: 'task',
      component: Task
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
