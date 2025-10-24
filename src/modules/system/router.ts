import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: AppRouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients',
    component: LAYOUT_DEFAULT,
    redirect: '/clients/index',
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: 'index',
        name: 'HomePaged',
        component: () => import('@/modules/dashboard/views/index.vue'),
        meta: {
          title: 'Home',
        },
      },
    ],
  },
]

export default systemsRouter
