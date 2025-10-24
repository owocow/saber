import { computed, nextTick, ref, shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { useBoolean } from '@/packages/hooks'
import { type AppRouteRecordRaw } from '@/router/types'
import { router } from '@/router'
import { SetupStoreId } from '@/enum'
import { staticAuthRoutes } from '@/router/routes'
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
  const { bool: isInitAuthRoute, setBool: setIsInitAuthRoute } = useBoolean()

  /** Home route key */
  const routeHome = ref(import.meta.env.VITE_ROUTE_HOME || 'home')

  /** auth routes */
  const authRoutes = shallowRef<AppRouteRecordRaw[]>([])

  function addAuthRoutes(routes: AppRouteRecordRaw[]) {
    console.log('Adding auth routes:', routes) // 添加调试信息
    const authRoutesMap = new Map<string, AppRouteRecordRaw>([])

    routes.forEach(route => {
      authRoutesMap.set(route.name, route)
    })

    staticAuthRoutes.forEach(route => {
      const parent = authRoutesMap.get(route.name)
      if (parent && route.children) {
        parent.children?.push(...route.children)
        return
      }
      authRoutesMap.set(route.name, route)
    })

    authRoutes.value = Array.from(authRoutesMap.values())
  }

  const removeRouteFns: (() => void)[] = []

  /** Global menus */
  const menus = ref<App.Global.Menu[]>([])
  const searchMenus = computed(() => transformMenuToSearchMenus(menus.value))

  /** Get global menus */
  function getGlobalMenus(routes: AppRouteRecordRaw[]) {
    menus.value = getGlobalMenusByAuthRoutes(routes)
  }

  /** Update global menus by locale */
  function updateGlobalMenusByLocale() {
    menus.value = updateLocaleOfGlobalMenus(menus.value)
  }

  /** Cache routes */
  const cacheRoutes = ref<string[]>([])

  /**
   * Exclude cache routes
   *
   * for reset route cache
   */
  const excludeCacheRoutes = ref<string[]>([])

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
  async function resetRouteCache(routeKey?: string) {
    const routeName = routeKey || (router.currentRoute.value.name as string)

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
  }

  /** Reset vue routes */
  function resetVueRoutes() {
    removeRouteFns.forEach(fn => fn())
    removeRouteFns.length = 0
  }

  /** Init auth route */
  async function initAuthRoute() {
    // check if user info is initialized
    if (!authStore.userInfo.user?.userId) {
      await authStore.initUserInfo()
    }
    initStaticAuthRoute()

    // tabStore.initHomeTab()
  }

  /** Init static auth route */
  function initStaticAuthRoute() {
    if (authStore.isStaticSuper) {
      addAuthRoutes(staticAuthRoutes)
    } else {
      const filteredAuthRoutes = filterAuthRoutesByRoles(staticAuthRoutes, authStore.userInfo.roles)
      addAuthRoutes(filteredAuthRoutes)
    }
    handleConstantAndAuthRoutes()
    setIsInitAuthRoute(true)
  }

  /** handle constant and auth routes */
  function handleConstantAndAuthRoutes() {
    const sortRoutes = sortRoutesByOrder(authRoutes.value)
    const vueRoutes = sortRoutes
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
   * Get is auth route exist
   *
   * @param routePath Route path
   */
  async function getIsAuthRouteExist(routeName?: string) {
    if (!routeName) {
      return false
    }
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
    await authStore.initUserInfo()
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
    initAuthRoute,
    isInitAuthRoute,
    setIsInitAuthRoute,
    getIsAuthRouteExist,
    getSelectedMenuKeyPath,
    onRouteSwitchWhenLoggedIn,
    onRouteSwitchWhenNotLoggedIn,
  }
})
