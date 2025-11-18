# Logo 组件（精简说明）

小巧的品牌 Logo 组件（SVG），用于导航栏、登录页、侧边栏等位置。

## 快速使用

```vue
<template>
  <!-- 默认样式 -->
  <logo />

  <!-- 自定义高度与颜色 -->
  <logo :height="40" icon-color="#409EFF" text-color="#222" />
</template>
```

## Props

| 名称       | 说明       | 类型               | 默认值      |
|------------|------------|--------------------|-------------|
| height     | SVG 高度   | `number \| string` | `30`        |
| iconColor  | 图形主色   | `string`           | `#0064FA`   |
| textColor  | 文本颜色   | `string`           | `#1E293B`   |

## 说明与建议

- `height` 支持数字（视为 px）或字符串（如 `"2rem"`）。
- `iconColor` 控制 Logo 中图形部分的填充色，`textColor` 控制文字部分的颜色。
- 适合在任意需要展示品牌标识的地方使用，可直接放入导航栏组件或登录页。

## 示例（放在导航）

```vue
<template>
  <header class="h-12 flex items-center px-4">
    <logo :height="36" icon-color="#1E90FF" text-color="#0F172A" />
  </header>
</template>
```

简洁且易定制，若需主题切换请通过父级样式或变量传入不同颜色值。