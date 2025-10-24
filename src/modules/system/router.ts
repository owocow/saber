// src/modules/system/router.ts
import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT_DEFAULT } from '@/router/routes'

const systemsRouter: AppRouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients', // 修改名称避免冲突
    component: LAYOUT_DEFAULT,
    redirect: '/clients/index',
    meta: {
      title: 'Clients Management',
      icon: 'ep:notebook', // 添加图标
    },
    children: [
      {
        path: 'index',
        name: 'ClientsIndex', // 修改名称避免冲突
        component: () => import('@/modules/system/index.vue'), // 确保组件路径正确
        meta: {
          title: 'Clients List',
        },
      },
    ],
  },
]

export default systemsRouter
