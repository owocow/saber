declare namespace SaberRouteType {
  type RouteRecordRaw = import('vue-router').RouteRecordRaw
  type Component = import('vue').DefineComponent<any, any, any> | (() => Promise<any>)

  type Recordable<T = any> = Record<string, T>

  interface RouteMeta {
    title: string
    roles?: string[]
    keepAlive?: boolean | null
    constant?: boolean | null
    permissions?: string[]
    icon?: any
    iconSize?: number
    localIcon?: string
    iconFontSize?: number
    order?: number | null
    href?: string | null
    hideInMenu?: boolean | null
    // activeMenu?: import('@elegant-router/types').RouteKey | null
    multiTab?: boolean | null
    fixedIndexInTab?: number | null
    query?: { key: string; value: string }[] | null
    storeInTabbar?: boolean | null
  }

  interface AppRouteRecordRaw extends RouteRecordRaw {
    redirect?: string
    path?: string
    name: string
    meta: RouteMeta
    orderNo?: number
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable | boolean
    fullPath?: string
  }
}
