import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
]

export default routes
