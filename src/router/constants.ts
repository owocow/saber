// constant pages's name
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const PAGE_LOGIN_NAME = 'PageLogin'
export const PAGE_TESTING_NAME = 'PageTesting'

// basic page components
export const PAGE_LOGIN = () => import('@/modules/sys/login.vue')
export const PAGE_NOT_FOUND = () => import('@/modules/sys/404.vue')
export const PAGE_TESTING = () => import('@/modules/sys/testing.vue')

// layouts
export const LAYOUT_DEFAULT = () => import('@/layouts/index.vue')
export const LAYOUT_BLANK = () => import('@/layouts/blank.vue')
