import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'Clients',
    component: LAYOUT_DEFAULT,
    redirect: '/clients/index',
    meta: {
      title: '系统设置',
      icon: 'solar:settings-line-duotone', // 添加图标
      iconSize: 18,
      keepAlive: true,
    },
    children: [
      {
        path: '/clients/index',
        name: 'ClientsIndex',
        component: () => import('./index.vue'),
        meta: {
          title: '系统设置',
        },
      },
      {
        path: '/clients/detail',
        name: 'ClientsDetailIndex',
        component: () => import('./detail/index.vue'),
        meta: {
          title: '系统设置',
          hideInMenu: true,
        },
      },
      {
        path: '/clients/testing',
        name: 'ClientsTestingIndex',
        component: () => import('./roles/index.vue'),
        meta: {
          title: '角色管理',
        },
      },
    ],
  },
]

export default systemsRouter
