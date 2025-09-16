import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT_DEFAULT } from '@/router/constants'
const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePageLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/home',
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('./views/index.vue'),
        meta: {
          title: 'Home',
        },
      },
    ],
  },
]

export default routes
