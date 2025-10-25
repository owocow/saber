import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'TestingLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/testing',
    meta: {
      title: '',
    },
    children: [
      {
        path: '/testing',
        name: 'Testing',
        component: () => import('./index.vue'),
        meta: {
          title: '测试菜单',
          icon: 'solar:settings-line-duotone', // 添加图标
          iconSize: 18,
          keepAlive: true,
        },
      },
    ],
  },
]

export default systemsRouter
