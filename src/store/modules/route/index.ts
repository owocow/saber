import { computed, nextTick, ref, shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { useBoolean } from '@/packages/hooks'
import { type AppRouteRecordRaw } from '@/router/types'
import { router } from '@/router'
import { fetchGetRoutes } from '@/service/api'
import { humpToLine, isNotNull } from '@/utils/common'
import { SetupStoreId } from '@/enum'
import { createDynamicRoutes, createStaticRoutes } from '@/router/routes'
import { ROOT_ROUTE } from '@/router/routes/constants'
// import { getRouteName, getRoutePath } from '@/router/elegant/transform'
import { useAuthStore } from '../auth'
// import { useTabStore } from '../tab'
import {
  filterAuthRoutesByRoles,
  getBreadcrumbsByRoute,
  getCacheRouteNames,
  getGlobalMenusByAuthRoutes,
  getSelectedMenuKeyPathByKey,
  isRouteExistByRouteName,
  sortRoutesByOrder,
  transformMenuToSearchMenus,
  updateLocaleOfGlobalMenus,
} from './shared'

const defaultIcon = import.meta.env.VITE_MENU_ICON

export const useRouteStore = defineStore(SetupStoreId.Route, () => {
  const authStore = useAuthStore()
  // const tabStore = useTabStore()
  const { bool: isInitConstantRoute, setBool: setIsInitConstantRoute } = useBoolean()
  const { bool: isInitAuthRoute, setBool: setIsInitAuthRoute } = useBoolean()

  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)

  /** Home route key */
  const routeHome = ref(import.meta.env.VITE_ROUTE_HOME || 'home')

  /** constant routes */
  const constantRoutes = shallowRef<AppRouteRecordRaw[]>([])

  function addConstantRoutes(routes: AppRouteRecordRaw[]) {
    const constantRoutesMap = new Map<string, AppRouteRecordRaw>([])
    routes.forEach(route => {
      constantRoutesMap.set(route.name, route)
    })
    constantRoutes.value = Array.from(constantRoutesMap.values())
  }

  /** auth routes */
  const authRoutes = shallowRef<AppRouteRecordRaw[]>([])

  function addAuthRoutes(routes: AppRouteRecordRaw[]) {
    const authRoutesMap = new Map<string, AppRouteRecordRaw>([])

    routes.forEach(route => {
      if (authRouteMode.value === 'dynamic') {
        if (route.path === '/' && route.children?.length) {
          const child = route.children[0]
          child.hidden = route.hideInMenu
          parseRouter(child)
          child.name = Math.random().toString(36).slice(2, 12)
          Object.assign(route, child)
          delete route.children
          authRoutesMap.set(route.name, route)
          return
        }
        parseRouter(route)
      }
      authRoutesMap.set(route.name, route)
    })

    const dynamicRoutes = createDynamicRoutes()

    dynamicRoutes.authRoutes.forEach(route => {
      const parent = authRoutesMap.get(route.name)
      if (parent && route.children) {
        parent.children?.push(...route.children)
        return
      }
      authRoutesMap.set(route.name, route)
    })

    authRoutes.value = Array.from(authRoutesMap.values())
  }

  function parseRouter(route: AppRouteRecordRaw, parent?: AppRouteRecordRaw) {
    route.meta = route.meta ? route.meta : { title: route.name }
    const isLayout = route.component === 'Layout'
    const isFramePage = route.component === 'FrameView'
    const isParentLayout = route.component === 'ParentView'
    const isExternalLink = isNotNull(route.meta.link)

    route.path = route.path.startsWith('/') ? route.path : `/${route.path}`
    route.path = parent ? parent.path + route.path : route.path

    route.name = route
      .component!.replace(/\/index$/, '')
      .replace(/\//g, '_')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
    if (isLayout || isFramePage || isParentLayout) {
      const name = humpToLine(route.path.substring(1).replace('/', '_'))
      route.name = parent ? `${parent.name}_${name}` : name
    }

    if (!isNotNull(route.meta.icon)) {
      route.meta.icon = defaultIcon
    }
    route.meta.hideInMenu = route.hideInMenu
    if (route.meta.hideInMenu && parent && !route.meta.activeMenu) {
      route.meta.activeMenu = parent.name
    }
    // 是否需要keepAlive
    route.meta.keepAlive = !route.meta.noCache

    if (isFramePage) {
      if (isExternalLink) {
        route.meta.href = String(route.meta.link)
        const random = Math.random().toString(36).slice(2, 12)
        route.path = `/${random}`
        route.name = random
        route.component = 'layout.base$view.iframe-page'
      } else {
        route.props = {
          // @ts-expect-error no query field
          url: route.query,
        }
      }
      route.component = parent && !isExternalLink ? 'view.iframe-page' : 'layout.base$view.iframe-page'
    } else if (!isLayout && !isParentLayout) {
      route.component = parent ? `view.${route.name}` : `layout.base$view.${route.name}`
    } else {
      route.component = isParentLayout ? undefined : 'layout.base'
    }

    delete route.meta.link
    delete route.meta.noCache
    // @ts-expect-error no query field
    delete route.query
    // @ts-expect-error no hidden field
    delete route.hidden

    route.children?.forEach(child => parseRouter(child, route))
  }

  const removeRouteFns: (() => void)[] = []

  /** Global menus */
  const menus = ref<App.Global.Menu[]>([])
  const searchMenus = computed(() => transformMenuToSearchMenus(menus.value))

  /** Get global menus */
  function getGlobalMenus(routes: ElegantConstRoute[]) {
    menus.value = getGlobalMenusByAuthRoutes(routes)
  }

  /** Update global menus by locale */
  function updateGlobalMenusByLocale() {
    menus.value = updateLocaleOfGlobalMenus(menus.value)
  }

  /** Cache routes */
  const cacheRoutes = ref<RouteKey[]>([])

  /**
   * Exclude cache routes
   *
   * for reset route cache
   */
  const excludeCacheRoutes = ref<RouteKey[]>([])

  /**
   * Get cache routes
   *
   * @param routes Vue routes
   */
  function getCacheRoutes(routes: RouteRecordRaw[]) {
    cacheRoutes.value = getCacheRouteNames(routes)
  }

  /**
   * Reset route cache
   *
   * @default router.currentRoute.value.name current route name
   * @param routeKey
   */
  async function resetRouteCache(routeKey?: RouteKey) {
    const routeName = routeKey || (router.currentRoute.value.name as RouteKey)

    excludeCacheRoutes.value.push(routeName)

    await nextTick()

    excludeCacheRoutes.value = []
  }

  /** Global breadcrumbs */
  const breadcrumbs = computed(() => getBreadcrumbsByRoute(router.currentRoute.value, menus.value))

  /** Reset store */
  async function resetStore() {
    const routeStore = useRouteStore()

    routeStore.$reset()

    resetVueRoutes()

    // after reset store, need to re-init constant route
    await initConstantRoute()
  }

  /** Reset vue routes */
  function resetVueRoutes() {
    removeRouteFns.forEach(fn => fn())
    removeRouteFns.length = 0
  }

  /** init constant route */
  async function initConstantRoute() {
    if (isInitConstantRoute.value) return

    const staticRoute = createStaticRoutes()

    if (authRouteMode.value === 'static') {
      addConstantRoutes(staticRoute.constantRoutes)
    } else {
      addConstantRoutes(staticRoute.constantRoutes)
    }

    handleConstantAndAuthRoutes()

    setIsInitConstantRoute(true)

    // tabStore.initHomeTab()
  }

  /** Init auth route */
  async function initAuthRoute() {
    // check if user info is initialized
    if (!authStore.userInfo.user?.userId) {
      await authStore.initUserInfo()
    }

    if (authRouteMode.value === 'static') {
      initStaticAuthRoute()
    } else {
      await initDynamicAuthRoute()
    }

    // tabStore.initHomeTab()
  }

  /** Init static auth route */
  function initStaticAuthRoute() {
    const { authRoutes: staticAuthRoutes } = createStaticRoutes()

    if (authStore.isStaticSuper) {
      addAuthRoutes(staticAuthRoutes)
    } else {
      const filteredAuthRoutes = filterAuthRoutesByRoles(staticAuthRoutes, authStore.userInfo.roles)

      addAuthRoutes(filteredAuthRoutes)
    }

    handleConstantAndAuthRoutes()

    setIsInitAuthRoute(true)
  }

  /** Init dynamic auth route */
  async function initDynamicAuthRoute() {
    const { data, error } = await fetchGetRoutes()

    if (!error) {
      addAuthRoutes(data)

      handleConstantAndAuthRoutes()

      handleUpdateRootRouteRedirect(routeHome.value)

      setIsInitAuthRoute(true)
    } else {
      // if fetch user routes failed, reset store
      authStore.resetStore()
    }
  }

  /** handle constant and auth routes */
  function handleConstantAndAuthRoutes() {
    const allRoutes = [...constantRoutes.value, ...authRoutes.value]

    const sortRoutes = sortRoutesByOrder(allRoutes)

    const vueRoutes = getAuthVueRoutes(sortRoutes)

    resetVueRoutes()

    addRoutesToVueRouter(vueRoutes)

    getGlobalMenus(sortRoutes)

    getCacheRoutes(vueRoutes)
  }

  /**
   * Add routes to vue router
   *
   * @param routes Vue routes
   */
  function addRoutesToVueRouter(routes: RouteRecordRaw[]) {
    routes.forEach(route => {
      const removeFn = router.addRoute(route)
      addRemoveRouteFn(removeFn)
    })
  }

  /**
   * Add remove route fn
   *
   * @param fn
   */
  function addRemoveRouteFn(fn: () => void) {
    removeRouteFns.push(fn)
  }

  /**
   * Update root route redirect when auth route mode is dynamic
   *
   * @param redirectKey Redirect route key
   */
  function handleUpdateRootRouteRedirect(redirectKey: LastLevelRouteKey) {
    const redirect = getRoutePath(redirectKey)

    if (redirect) {
      const rootRoute: CustomRoute = { ...ROOT_ROUTE, redirect }

      router.removeRoute(rootRoute.name)

      const [rootVueRoute] = getAuthVueRoutes([rootRoute])

      router.addRoute(rootVueRoute)
    }
  }

  /**
   * Get is auth route exist
   *
   * @param routePath Route path
   */
  async function getIsAuthRouteExist(routePath: RouteMap[RouteKey]) {
    const routeName = getRouteName(routePath)

    if (!routeName) {
      return false
    }

    const { authRoutes: staticAuthRoutes } = createStaticRoutes()
    return isRouteExistByRouteName(routeName, staticAuthRoutes)
  }

  /**
   * Get selected menu key path
   *
   * @param selectedKey Selected menu key
   */
  function getSelectedMenuKeyPath(selectedKey: string) {
    return getSelectedMenuKeyPathByKey(selectedKey, menus.value)
  }

  async function onRouteSwitchWhenLoggedIn() {
    // await authStore.initUserInfo();
  }

  async function onRouteSwitchWhenNotLoggedIn() {
    // some global init logic if it does not need to be logged in
  }

  return {
    resetStore,
    routeHome,
    menus,
    searchMenus,
    updateGlobalMenusByLocale,
    cacheRoutes,
    excludeCacheRoutes,
    resetRouteCache,
    breadcrumbs,
    initConstantRoute,
    isInitConstantRoute,
    initAuthRoute,
    isInitAuthRoute,
    setIsInitAuthRoute,
    getIsAuthRouteExist,
    getSelectedMenuKeyPath,
    onRouteSwitchWhenLoggedIn,
    onRouteSwitchWhenNotLoggedIn,
  }
})
