import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/system',
    name: 'SystemLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/system/index',
    meta: {
      title: '系统设置',
      icon: 'solar:settings-line-duotone', // 添加图标
      iconSize: 18,
      keepAlive: true,
    },
    children: [
      {
        path: '/system/index',
        name: 'SystemIndex',
        component: () => import('./index.vue'),
        meta: {
          title: '角色部门菜单',
        },
      },
      {
        path: '/system/users',
        name: 'SystemUsers',
        component: () => import('./users/index.vue'),
        meta: {
          title: '用户管理',
        },
      },
      // {
      //   path: '/clients/detail',
      //   name: 'ClientsDetailIndex',
      //   component: () => import('./detail/index.vue'),
      //   meta: {
      //     title: '系统设置',
      //     hideInMenu: true,
      //   },
      // },
      // {
      //   path: '/clients/testing',
      //   name: 'ClientsTestingIndex',
      //   component: () => import('./roles/index.vue'),
      //   meta: {
      //     title: '角色管理',
      //   },
      // },
    ],
  },
]

export default systemsRouter
