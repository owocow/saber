// constant pages's name
import { type AppRouteRecordRaw } from '../types'
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const PAGE_NO_PERMISSION_NAME = 'PageNoPermission'

// basic page components
export const PAGE_LOGIN = () => import('@/modules/sys/login/login.vue')

// layouts
export const LAYOUT_DEFAULT = () => import('@/layouts/index.vue')
export const LAYOUT_BLANK = () => import('@/layouts/blank.vue')

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
  component: import('@/views/404.vue'),
  meta: {
    title: '您访问的页面不存在',
    constant: true,
    hideInMenu: true,
  },
}

export const dynamicRoutes: AppRouteRecordRaw[] = [
  {
    name: PAGE_NO_PERMISSION_NAME,
    path: '/403',
    component: import('@/views/403.vue'),
    meta: {
      title: '您没有权限访问该页面',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: 'server-error',
    path: '/500',
    component: import('@/views/500.vue'),
    meta: {
      title: '服务器出现错误',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: import('@/views/auth/index.vue'),
    props: true,
    meta: {
      title: '登录',
      constant: true,
      hideInMenu: true,
    },
  },
  {
    name: 'iframe-page',
    path: '/iframe-page/:url',
    component: LAYOUT_DEFAULT,
    props: true,
    meta: {
      title: 'iframe-page',
      i18nKey: 'route.iframe-page',
      constant: true,
      hideInMenu: true,
      keepAlive: true,
      icon: 'i-gg-website',
    },
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

export const builtinRoutes = [ROOT_ROUTE, ROUTE_PAGE_NOT_FOUND]
