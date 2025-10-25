import type { Router } from 'vue-router'

/**
 * Get all tabs
 *
 * @param tabs Tabs
 * @param homeTab Home tab
 */
export function getAllTabs(tabs: App.Global.Tab[], homeTab?: App.Global.Tab) {
  if (!homeTab) {
    return []
  }

  const filterHomeTabs = tabs.filter(tab => tab.id !== homeTab.id)

  const fixedTabs = filterHomeTabs.filter(isFixedTab).sort((a, b) => a.fixedIndex! - b.fixedIndex!)

  const remainTabs = filterHomeTabs.filter(tab => !isFixedTab(tab))

  const allTabs = [homeTab, ...fixedTabs, ...remainTabs]

  return updateTabsLabel(allTabs)
}

/**
 * Is fixed tab
 *
 * @param tab
 */
function isFixedTab(tab: App.Global.Tab) {
  return tab.fixedIndex !== undefined && tab.fixedIndex !== null
}

/**
 * Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: App.Global.TabRoute) {
  const { path, query = {}, meta } = route

  let id = path

  if (meta.multiTab) {
    const queryKeys = Object.keys(query).sort()
    const qs = queryKeys.map(key => `${key}=${query[key]}`).join('&')

    id = `${path}?${qs}`
  }

  return id
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: App.Global.TabRoute) {
  const { name, path, fullPath = path, meta } = route

  const { title, fixedIndexInTab } = meta

  const label = title || 'No-Title'

  const tab: App.Global.Tab = {
    id: getTabIdByRoute(route),
    label,
    routeKey: name as string,
    routePath: path as string,
    fullPath,
    fixedIndex: fixedIndexInTab,
  }

  return tab
}
/**
 * Get default home tab
 *
 * @param router
 * @param homeRouteName routeHome in useRouteStore
 */
export function getDefaultHomeTab() {
  const homeRouteName = import.meta.env.VITE_HOME_NAME || '工作台'
  const homeRoutePath = import.meta.env.VITE_ROUTE_HOME || '/home'
  const homeTab: App.Global.Tab = {
    id: homeRoutePath,
    // id: getRoutePath(homeRouteName),
    label: homeRouteName,
    routeKey: 'HomePage',
    routePath: homeRoutePath,
    fullPath: homeRoutePath,
  }

  //   const routes = router.getRoutes()
  //   const homeRoute = routes.find(route => route.name === homeRouteName)
  //   if (homeRoute) {
  //     homeTab = getTabByRoute(homeRoute)
  //   }

  return homeTab
}

/**
 * Is tab in tabs
 *
 * @param tab
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId)
}

/**
 * Filter tabs by id
 *
 * @param tabId
 * @param tabs
 */
export function filterTabsById(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.id !== tabId)
}

/**
 * Filter tabs by ids
 *
 * @param tabIds
 * @param tabs
 */
export function filterTabsByIds(tabIds: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => !tabIds.includes(tab.id))
}

/**
 * extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(router: Router, tabs: App.Global.Tab[]) {
  const routes = router.getRoutes()

  const routeNames = routes.map(route => route.name)

  return tabs.filter(tab => routeNames.includes(tab.routeKey))
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(isFixedTab)
}

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs)

  return fixedTabs.map(tab => tab.id)
}

/**
 * Update tabs label
 *
 * @param tabs
 */
function updateTabsLabel(tabs: App.Global.Tab[]) {
  const updated = tabs.map(tab => ({
    ...tab,
    label: tab.newLabel || tab.oldLabel || tab.label,
  }))

  return updated
}

/**
 * Update tab by i18n key
 *
 * @param tab
 */
export function updateTabByI18nKey(tab: App.Global.Tab) {
  const { label } = tab

  return {
    ...tab,
    label,
  }
}

/**
 * Update tabs by i18n key
 *
 * @param tabs
 */
export function updateTabsByI18nKey(tabs: App.Global.Tab[]) {
  return tabs.map(tab => updateTabByI18nKey(tab))
}

/**
 * find tab by route name
 *
 * @param name
 * @param tabs
 */
// export function findTabByRouteName(name: string, tabs: App.Global.Tab[]) {
//   const routePath = getRoutePath(name)

//   const tabId = routePath
//   const multiTabId = `${routePath}?`

//   return tabs.find(tab => tab.id === tabId || tab.id.startsWith(multiTabId))
// }

export function findTabByRoutePath(routePath: string, tabs: App.Global.Tab[]) {
  //   const routePath = getRoutePath(name)

  const tabId = routePath
  const multiTabId = `${routePath}?`

  return tabs.find(tab => tab.id === tabId || tab.id.startsWith(multiTabId))
}
