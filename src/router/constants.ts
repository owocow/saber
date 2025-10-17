// constant pages's name
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const PAGE_LOGIN_NAME = 'PageLogin'
export const PAGE_TESTING_NAME = 'PageTesting'

// basic page components
export const PAGE_LOGIN = () => import('@/modules/sys/login/login.vue')
export const PAGE_NOT_FOUND = () => import('@/modules/sys/404.vue')
export const PAGE_TESTING = () => import('@/modules/sys/testing.vue')

// layouts
export const LAYOUT_DEFAULT = () => import('@/layouts/index.vue')
export const LAYOUT_BLANK = () => import('@/layouts/blank.vue')

// login
export const loginRoute = {
  path: '/login',
  component: PAGE_LOGIN,
  name: PAGE_LOGIN_NAME,
  meta: {
    title: '登录系统',
  },
}

// 404
export const pageNotFoundRoute = {
  path: '/404',
  component: PAGE_NOT_FOUND,
  name: PAGE_NOT_FOUND_NAME,
  meta: {
    title: '您访问的页面不存在',
  },
}

// get page layout
export const getParentLayout = (name?: string) => new Promise(resolve => resolve({ name: name || PARENT_LAYOUT_NAME }))

export const constantRoutes = [loginRoute, pageNotFoundRoute]
