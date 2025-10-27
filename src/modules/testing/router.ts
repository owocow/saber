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
          icon: 'solar:test-tube-line-duotone',
          keepAlive: true,
          storeInTabbar: false,
        },
      },
    ],
  },
]

export default systemsRouter
