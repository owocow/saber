import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT_DEFAULT } from '@/router/constants'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT_DEFAULT,
    meta: {
      title: 'Dashboard',
    },
  },
]

export default routes
