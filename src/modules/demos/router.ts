import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'TestingLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/testing',
    meta: {
      title: '',
      order: 999,
    },
    children: [
      {
        path: '/testing',
        name: 'Testing',
        component: () => import('./index.vue'),
        meta: {
          title: 'DEMOs',
          icon: 'solar:alarm-add-line-duotone',
          keepAlive: true,

          storeInTabbar: false,
        },
      },
    ],
  },
]

export default systemsRouter
