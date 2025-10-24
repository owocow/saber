import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

type Recordable<T = any> = Record<string, T>

export type Component<T extends any = any> = ReturnType<typeof defineComponent> | (() => Promise<T>)

export interface MenuRecord extends RouteMeta {
  children?: MenuRecord[]
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  roles?: string[]
  orderNo?: number
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[] | any
  props?: Recordable | boolean
  fullPath?: string
  constant?: boolean
  display?: boolean
  icon?: any
  iconSize?: number
  hideInMenu?: boolean
}

export type AppRouteModule = AppRouteRecordRaw
