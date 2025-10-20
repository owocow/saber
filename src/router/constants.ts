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

// get page layout
export const getParentLayout = (name?: string) => new Promise(resolve => resolve({ name: name || PARENT_LAYOUT_NAME }))

export const ROOT_ROUTE = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME || '/home',
  meta: {
    title: 'root',
    constant: true,
  },
}

const NOT_FOUND_ROUTE = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: PAGE_NOT_FOUND,
  meta: {
    title: '您访问的页面不存在',
    constant: true,
  },
}

export const constantRoutes = [ROOT_ROUTE, NOT_FOUND_ROUTE]
