import { LAYOUT_DEFAULT } from '@/router/routes'

export function transWrapLayout(routes: SaberRouteType.AppRouteRecordRaw[]): SaberRouteType.AppRouteRecordRaw[] {
  function isLayoutRoute(route: SaberRouteType.AppRouteRecordRaw): boolean {
    return !route.children || route.children.length === 0
  }
  return routes.map(route => {
    const { name, path, component, children, ...rest } = route
    if (isLayoutRoute(route)) {
      return {
        path,
        name: name + 'Layout',
        component: LAYOUT_DEFAULT,
        meta: {
          title: route.meta?.title || 'No Title',
        },
        children: [
          {
            path: '',
            name,
            component,
            ...rest,
          },
        ] as SaberRouteType.AppRouteRecordRaw[],
      }
    } else if (component === 'layout') {
      return {
        name,
        path,
        component: LAYOUT_DEFAULT,
        children,
        ...rest,
      }
    } else {
      return route
    }
  })
}
