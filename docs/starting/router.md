# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

```tree
saber/
├── .vitepress/
│   ├── config.ts
│   └── theme/
│       ├── index.ts
│       └── custom.css
├── docs/
│   ├── public/
│   │   ├── icon.png
│   │   ├── logo.svg
│   │   ├── hero-image.png        # 首页右侧图片
│   │   ├── hero-image-light.png  # 浅色模式图片
│   │   └── hero-image-dark.png   # 深色模式图片
│   └── index.md
└── package.json
```

````typescript
// src/modules/testing/router.ts
import { LAYOUT_DEFAULT } from '@/router/routes'

const testingRouter: SaberRouteType.AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'TestingLayout',
    component: LAYOUT_DEFAULT,
    redirect: '/testing',
    meta: {
      title: '',
    },
    children: [
      {
        path: '/testing',
        name: 'Testing',
        component: () => import('./index.vue'),
        meta: {
          title: '测试菜单',
          icon: 'solar:test-tube-line-duotone',
          keepAlive: true,
          storeInTabbar: false,
        },
      },
    ],
  },
]

expor

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
````

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
