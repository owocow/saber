import { createRouter, createWebHistory } from 'vue-router'
import { asyncRoutes } from './routes'
import { constantRoutes } from './constants'

const routes = [...constantRoutes, ...asyncRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
