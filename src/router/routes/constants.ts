// constant pages's name
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const PAGE_NO_PERMISSION_NAME = 'PageNoPermission'
type AppRouteRecordRaw = SaberRouteType.RouteRecordRaw
// basic page components
export const PAGE_LOGIN = () => import('@/modules/base/auth/index.vue')

// layouts
export const LAYOUT_DEFAULT = () => import('@/layouts/index.vue')

// get page layout
export const getParentLayout = (name?: string) => new Promise(resolve => resolve({ name: name || PARENT_LAYOUT_NAME }))

export const ROOT_ROUTE: AppRouteRecordRaw = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME || '/home',
  meta: {
    title: 'root',
    constant: true,
  },
}
export const ROUTE_PAGE_NOT_FOUND: AppRouteRecordRaw = {
  name: PAGE_NOT_FOUND_NAME,
  path: '/:pathMatch(.*)*',
  component: () => import('@/modules/base/404.vue'),
  meta: {
    title: '您访问的页面不存在',
    constant: true,
    hideInMenu: true,
  },
}

export const staticRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePageLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/home',
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: '/home',
        name: 'HomePage',
        component: () => import('@/modules/dashboard/views/index.vue'),
        meta: {
          title: 'Home',
        },
      },
    ],
  },
  {
    name: PAGE_NO_PERMISSION_NAME,
    path: '/403',
    component: () => import('@/modules/base/403.vue'),
    meta: {
      title: '您没有权限访问该页面',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: PAGE_NO_PERMISSION_NAME,
    path: '/429',
    component: () => import('@/modules/base/403.vue'),
    meta: {
      title: '您没有权限访问该页面',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: 'server-error',
    path: '/500',
    component: () => import('@/modules/base/500.vue'),
    meta: {
      title: '服务器出现错误',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: () => import('@/modules/base/auth/index.vue'),
    props: { modules: ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'] },
    meta: {
      title: '登录',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    path: '/',
    name: 'IframePageLayout',
    component: LAYOUT_DEFAULT,
    meta: {
      title: 'Dashboard',
    },
    children: [
      {
        path: '/iframe-page/:url',
        name: 'iframe-page',
        component: () => import('@/modules/base/iframe/index.vue'),
        props: true,
        meta: {
          title: 'Home',
        },
      },
    ],
  },
  {
    name: 'social-callback',
    path: '/social-callback',
    component: LAYOUT_DEFAULT,
    meta: {
      title: 'social-callback',
      i18nKey: 'route.social-callback',
      constant: true,
      hideInMenu: true,
      icon: 'simple-icons:authy',
    },
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: LAYOUT_DEFAULT,
    meta: {
      title: 'user-center',
      i18nKey: 'route.user-center',
      icon: 'material-symbols:account-circle-full',
      hideInMenu: true,
    },
  },
]

export const builtinRoutes = [ROOT_ROUTE, ...staticRoutes, ROUTE_PAGE_NOT_FOUND]
