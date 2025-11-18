# SaberTabLayout 选项卡布局组件（简明说明）

`SaberTabLayout` 是一个轻量的选项卡式布局组件，用于在同一区域根据菜单切换不同子组件；支持 keep-alive 缓存指定子组件。

## 何时使用

适合页面内需要在同一个区域切换多个子视图的场景（例如：详情页的不同面板、配置页的多个子表单等）。

## Props

| 名称 | 说明 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| menus | 菜单数组，定义每个 tab 的 key/label/component/keepalive | `Array<MenuType>` | 是 | - |
| activeTab | 初始激活的 tab key | `string` | 否 | 首个菜单的 key（若传入则使用该值） |

### MenuType

```ts
interface MenuType {
  key: string             // 唯一标识，用于切换
  label: string           // 显示在 tab 上的文本
  component: Component    // 对应渲染的组件（传组件对象）
  keepalive?: boolean    // 是否在 KeepAlive 中缓存该组件
}
```

## 行为说明

- 顶部显示一排 tab（由 `menus` 决定），点击 tab 会切换当前渲染的子组件。
- 如果传入 `activeTab`，组件挂载时会优先使用该值作为初始 tab；否则默认选中 `menus[0]`。
- 组件内部使用 Vue 的 `<KeepAlive :include="...">`，通过 `keepalive` 字段控制缓存。`include` 使用的是子组件的 `name` 字段。

## 使用示例

```vue
<script setup lang="ts">
import FooPanel from './FooPanel.vue'
import BarPanel from './BarPanel.vue'

const menus = [
  { key: 'foo', label: 'Foo', component: FooPanel, keepalive: true },
  { key: 'bar', label: 'Bar', component: BarPanel }
]
</script>

<template>
  <saber-tab-layout :menus="menus" active-tab="bar" />
</template>
```

## 注意事项

- 子组件如果需要被 `KeepAlive` 缓存，请确保子组件有 `name` 字段（`component.name`），否则 `include` 无法匹配。
- `menus` 中的 `component` 应直接传组件对象（不要传字符串路由名），例如 `import X from './X.vue'` 后传 `component: X`。
- 该组件没有插槽接口；所有内容由 `menus` 的 `component` 控制渲染。

## 建议

- 当子组件切换频繁且初始化昂贵时，将 `keepalive: true` 用于需要缓存状态的面板。
- 若需更多功能（例如可关闭 tab、带菜单图标、异步加载组件等），可以在本组件上做二次扩展。

```vue
<!-- 简洁示例 -->
<saber-tab-layout :menus="menus" />
```

---

文档简洁覆盖常用场景与注意点，如需补充 API 表或示例截图我可以继续完善。