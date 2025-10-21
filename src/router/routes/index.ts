import { type AppRouteRecordRaw } from '../types'
import { dynamicRoutes } from './constants'
const customRoutes: AppRouteRecordRaw[] = []
// async routes
const modules: any = import.meta.glob('@/modules/**/router.ts', { eager: true })

const generatedRoutes: AppRouteRecordRaw[] = []

for (const path in modules) {
  const mod = modules[path].default
  if (Array.isArray(mod)) {
    generatedRoutes.push(...mod)
  } else {
    generatedRoutes.push(mod)
  }
}

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: AppRouteRecordRaw[] = []
  const authRoutes: AppRouteRecordRaw[] = []

  ;[...customRoutes, ...generatedRoutes, ...dynamicRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item)
    } else {
      authRoutes.push(item)
    }
  })
  return {
    constantRoutes,
    authRoutes,
  }
}

/** create routes when the auth route mode is dynamic */
export function createDynamicRoutes() {
  const constantRoutes: AppRouteRecordRaw[] = []
  const authRoutes: AppRouteRecordRaw[] = []
  ;[...customRoutes, ...dynamicRoutes, ...generatedRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item)
    } else {
      authRoutes.push(item)
    }
  })

  return {
    constantRoutes,
    authRoutes,
  }
}
