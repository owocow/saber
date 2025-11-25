# Modules 模块开发

::: warning 提示
模块一般需要包含：`api.ts 本模块的api方法`, `router.ts 本模块的路由配置`, `index.vue 本模块的入口组件`
:::

模块的目录路径如下：

```tree
Project/
├── src/
├── ├── modules
├── ├── ├── dashboard
├── ├── ├── system
├── ├── ├── ├── api.ts  如有相关接口，请全部建在这里，尽量一个 api.ts 文件
├── ├── ├── ├── router.ts  此路由会自动加载并添加的路由
├── ├── ├── ├── enum.ts   [可选]
├── ├── ├── ├── index.vue  [可选]
├── ├── ├── ├── users  子模块
├── ├── ├── ├── ├── mods
├── ├── ├── ├── ├── index.vue
├── ├── ├── ├── ├── model.tsx
├── ├── ├── ├── ...
└── ...
```

### 模块目录及结构说明

模块大部分都包含子模块，如上面 system 模块，包含 后台用户子模块、部门子模块、权限角色菜单子模块等，这里把 权限、部门、及菜单放在一起了，可查看项目具体实现

- mods 目录: 用作一些 form, detail, 相对比较独立的逻辑放这里
- index.vue 子模块的入口组件
- model.ts 子模块的一些配置及模型，如表格配置、实体配置、搜索配置 等等

### 模块的路由说明

- router.ts 文件  
  `router.ts`会自动添加到 vue-router 里，router.ts 需要添加角色信息，因为本项目使用前端路由，并且需要跟后台数据库权限匹配，路由最终对应左侧菜单及子菜单，也既是模块及子模块的路由体现
  如下为，system 模块的路由配置如下

```js
import { LAYOUT_DEFAULT } from '@/router/routes'
const systemsRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/system',
    name: 'SystemLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/system/index',
    meta: {
      title: '系统设置',
      icon: 'solar:settings-line-duotone', // 添加图标
      keepAlive: true,
    },
    children: [
      {
        path: '/system/index',
        name: 'SystemIndex',
        component: () => import('./dept-menu-perm/index.vue'),
        meta: {
          title: '角色部门菜单',
        },
      },
      {
        path: '/system/users',
        name: 'SystemUsers',
        component: () => import('./users/index.vue'),
        meta: {
          keepAlive: true,
          title: '用户管理',
        },
      },
      {
        path: '/system/notices',
        name: 'SystemNotices',
        component: () => import('./notices/index.vue'),
        meta: {
          keepAlive: true,
          title: '通知公告',
        },
      },
    ],
  },
]

export default systemsRouter
```

- types

```typescript
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
```

### 模块目录下的其他文件

如有需要，可添加一些 本模块独有的 utils 方法等  
一些公共逻辑也可以体现在这里
