# SaberButton 组件（简明使用说明）

用于项目统一风格的按钮封装，基于 Element Plus 的 `el-button`，内置常用图标映射并支持插槽自定义图标与文本。

## 快速示例

```vue
<template>
  <!-- 使用内置类型图标 -->
  <saber-button btn-type="add">添加</saber-button>

  <!-- 指定自定义 icon（Iconify 名称或组件） -->
  <saber-button icon="solar:pen-new-square-linear">编辑</saber-button>

  <!-- 仅图标（圆形按钮） -->
  <saber-button btn-type="delete" circle />

  <!-- 传递原生 el-button 属性 -->
  <saber-button type="primary" size="small">确认</saber-button>
</template>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| icon | 自定义图标名称或组件（优先） | `string` | - |
| iconSize | 图标大小（px） | `number` | `20` |
| btnType | 内置图标类型（快速使用） | `string`（可选值：`edit`, `delete`, `add`, `search`, `refresh`, `save`, `back`, `forward`, `confirm`, `cancel`） | - |

> 备注：`icon` 优先于 `btnType`，即若同时提供 `icon` 则使用 `icon`。

## 插槽

| 名称 | 说明 |
|------|------|
| default | 按钮文本或自定义内容 |
| icon | 自定义图标插槽（覆盖内置图标） |

## 支持的特性

- 继承 `el-button` 的所有原生属性（如 `type`, `size`, `disabled`, `loading`, `circle` 等），直接写在 `saber-button` 上即可。
- 内置常用 iconMap，可以通过 `btnType` 快速使用常见操作图标。
- 支持在 `icon` 插槽中完全自定义图标内容（例如使用 `Icon` 组件或 SVG）。

## 使用建议

- 若需要主题色或交互样式，请通过 `el-button` 的 `type` 与 `class`（例如 `class="saber"` 已内置）进行控制。
- 当按钮仅需图标时，可配合 `circle` 属性使用，提升视觉一致性。

## 源码摘录（核心实现）

```vue
<el-button class="saber" v-bind="$attrs">
  <template #icon v-if="iconName">
    <slot name="icon">
      <Icon :icon="iconName" :style="{ fontSize: iconSize + 'px' }" />
    </slot>
  </template>
  <template v-if="$slots.default" #default>
    <slot />
  </template>
</el-button>
```

## 常见用法示例

- 带图标与文本：`<saber-button btn-type="refresh">刷新</saber-button>`
- 自定义图标：`<saber-button icon="ep:close">关闭</saber-button>`
- 圆形图标按钮：`<saber-button btn-type="back" circle size="small" />`

---

文档简洁覆盖常用场景，如需更详细的样式或交互示例（例如 loading 状态或按键交互），我可以继续补充。