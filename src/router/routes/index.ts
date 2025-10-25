// async routes
const modules: any = import.meta.glob('@/modules/**/router.ts', { eager: true })

const staticAuthRoutes: SaberRouteType.AppRouteRecordRaw[] = []

for (const path in modules) {
  const mod = modules[path].default
  if (Array.isArray(mod)) {
    staticAuthRoutes.push(...mod)
  } else {
    staticAuthRoutes.push(mod)
  }
}

export { staticAuthRoutes }
export * from './constants'
