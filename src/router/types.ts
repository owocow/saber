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
  permissions?: string[]
  roles?: string[]
  orderNo?: number
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[] | any
  props?: Recordable
  fullPath?: string
  display?: boolean
  icon?: any
}

export type AppRouteModule = AppRouteRecordRaw
