import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/risk-core',
    name: 'RiskCoreLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/risk-core/index',
    meta: {
      title: '风控模型',
      icon: 'solar:shield-bold', // 添加图标
      keepAlive: true,
    },
    children: [
      {
        path: '/risk-core/index',
        name: 'RiskCoreIndex',
        component: () => import('./index.vue'),
        meta: {
          title: '风控模型',
          icon: 'solar:shield-bold', // 添加图标
        },
      },
    ],
  },
]

export default systemsRouter
