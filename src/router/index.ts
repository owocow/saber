import { createRouter, createWebHistory } from 'vue-router'
import { asyncRoutes } from './routes'
import { constantRoutes } from './constants'
import IndexPage from '@/pages/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'Vite + Vue + TypeScript + Tailwind Starter Template',
    },
  },
  ...constantRoutes,
  ...asyncRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
