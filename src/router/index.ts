import { createRouter, createWebHistory } from 'vue-router'
import TasksPage from '@/components/Tasks/TasksPage.vue'
import Task from '@/components/Tasks/Task.vue';
import MaterialsListsPage from '@/components/Materials/MaterialsListsPage.vue';
import MaterialsList from '@/components/Materials/MaterialsList.vue';
import Home from '@/components/Home.vue';
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
      path: '/materials-lists',
      name: 'materials-lists',
      component: MaterialsListsPage
    },
    {
      path: '/materials-list/:uid',
      name: 'materials-list',
      component: MaterialsList,
      props: true
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
