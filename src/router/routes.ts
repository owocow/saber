import { type RouteRecordRaw } from 'vue-router'
// import omit from 'lodash-es/omit'

// async routes
const modules: any = import.meta.glob('@/modules/**/router.ts', { eager: true })

const routeList: RouteRecordRaw[] = []

for (const path in modules) {
  const mod = modules[path].default
  if (Array.isArray(mod)) {
    routeList.push(...mod)
  } else {
    routeList.push(mod)
  }
}

export const asyncRoutes = routeList
