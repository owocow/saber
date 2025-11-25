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
      keepAlive: true,
    },
    children: [
      {
        path: '/system/index',
        name: 'SystemIndex',
        component: () => import('./dept-menu-perm/index.vue'),
        meta: {
          title: '角色部门菜单',
        },
      },
      {
        path: '/system/users',
        name: 'SystemUsers',
        component: () => import('./users/index.vue'),
        meta: {
          keepAlive: true,
          title: '用户管理',
        },
      },
      {
        path: '/system/notices',
        name: 'SystemNotices',
        component: () => import('./notices/index.vue'),
        meta: {
          keepAlive: true,
          title: '通知公告',
        },
      },
    ],
  },
]

export default systemsRouter
