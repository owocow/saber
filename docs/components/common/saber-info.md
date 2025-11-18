# SaberInfo 信息展示组件

用于展示标签-内容格式的信息项，支持横向和纵向两种布局方式。

## 组件说明

### SaberInfo

信息展示的基础组件，用于显示单个信息项。

#### Props

| 参数          | 说明     | 类型              | 可选值         | 默认值 |
| ------------- | -------- | ----------------- | -------------- | ------ |
| label         | 标签文本 | `string`          | -              | -      |
| labelPosition | 标签位置 | `'left' \| 'top'` | `left` / `top` | `left` |
| labelWidth    | 标签宽度 | `string`          | -              | `80px` |
| bottom        | 底部间距 | `string`          | -              | `8px`  |

说明：如果labelPostion的计算值为 left, 则bottom 不生效

#### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 信息内容 |

#### 基础用法

```vue
<template>
  <saber-info label="用户名">张三</saber-info>
  <saber-info label="年龄">25</saber-info>
  <saber-info label="邮箱" label-position="top">test@example.com</saber-info>
</template>
```

### SaberInfoProvider

信息展示的容器组件，用于统一配置内部所有 `SaberInfo` 组件的样式。通过 `provide/inject` 机制向子组件传递配置。

#### Props

| 参数          | 说明     | 类型              | 可选值         | 默认值 |
| ------------- | -------- | ----------------- | -------------- | ------ |
| labelPosition | 标签位置 | `'left' \| 'top'` | `left` / `top` | `left` |
| labelWidth    | 标签宽度 | `string`          | -              | `80px` |
| bottom        | 底部间距 | `string`          | -              | `8px`  |

#### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 包裹的内容 |

#### 源码

```vue
<script lang="ts" setup>
defineOptions({ name: 'SaberInfoProvider' })
interface Props {
  labelPosition?: 'left' | 'top'
  labelWidth?: string
  bottom?: string
}
const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'left',
  labelWidth: '80px',
  bottom: '8px',
})
provide('saberInfoProvider', {
  labelPosition: computed(() => props.labelPosition),
  labelWidth: computed(() => props.labelWidth),
  bottom: computed(() => props.bottom),
})
</script>
<template>
  <slot name="default" />
</template>
```

## 使用场景

### 场景一：基础信息展示

```vue
<template>
  <saber-info label="用户名">张三</saber-info>
  <saber-info label="年龄">25</saber-info>
  <saber-info label="手机号">13800138000</saber-info>
</template>
```

### 场景二：使用 Provider 统一配置

```vue
<template>
  <saber-info-provider label-width="100px" bottom="12px">
    <saber-info label="用户名">张三</saber-info>
    <saber-info label="年龄">25</saber-info>
    <saber-info label="手机号">13800138000</saber-info>
  </saber-info-provider>
</template>
```

### 场景三：结合 Element Plus 布局

```vue
<template>
  <saber-info-provider label-width="80px">
    <el-row :gutter="24">
      <el-col :span="12">
        <saber-info label="菜单类型">目录</saber-info>
      </el-col>
      <el-col :span="12">
        <saber-info label="显示状态">显示</saber-info>
      </el-col>
      <el-col :span="12">
        <saber-info label="是否外链">否</saber-info>
      </el-col>
      <el-col :span="12">
        <saber-info label="是否缓存">是</saber-info>
      </el-col>
      <el-col :span="24">
        <saber-info label="路由地址">/system/user</saber-info>
      </el-col>
      <el-col :span="24">
        <saber-info label="权限字符串">system:user:list</saber-info>
      </el-col>
    </el-row>
  </saber-info-provider>
</template>
```

### 场景四：纵向布局

```vue
<template>
  <saber-info-provider label-position="top" label-width="100%">
    <saber-info label="详细地址"> 北京市朝阳区某某街道某某小区某某号楼某某单元某某室 </saber-info>
    <saber-info label="个人简介"> 这是一段很长的个人简介内容，使用纵向布局可以更好地展示... </saber-info>
  </saber-info-provider>
</template>
```

### 场景五：覆盖 Provider 配置

```vue
<template>
  <saber-info-provider label-width="100px">
    <!-- 使用 Provider 配置：标签宽度 100px -->
    <saber-info label="用户名">张三</saber-info>
    <saber-info label="年龄">25</saber-info>

    <!-- 覆盖 Provider 配置：自定义标签宽度 60px -->
    <saber-info label="性别" label-width="60px">男</saber-info>

    <!-- 覆盖 Provider 配置：使用纵向布局 -->
    <saber-info label="详细地址" label-position="top"> 北京市朝阳区某某街道 </saber-info>
  </saber-info-provider>
</template>
```

## 工作原理

1. **Provider 组件**：使用 Vue 的 `provide` API 向下传递配置
2. **Info 组件**：使用 `inject` API 接收父组件配置
3. **优先级**：子组件自身的 props > Provider 提供的配置 > 默认值

```vue
<!-- Info 组件内部实现 -->
<script lang="ts" setup>
const provider = inject('saberInfoProvider', null)

const finalLabelWidth = computed(() => {
  return props.labelWidth || provider?.labelWidth?.value || '80px'
})
</script>
```

## 样式说明

- 标签颜色：`text-gray-400 dark:text-dark-600`（浅灰色，暗黑模式下为深灰色）
- 标签不换行：`flex-shrink-0`
- 布局方式：
  - `labelPosition="left"`：使用 `flex` 横向排列
  - `labelPosition="top"`：使用 `flex-col` 纵向排列

## 注意事项

1. **Provider 是可选的**：可以单独使用 `SaberInfo` 组件，不一定要用 `SaberInfoProvider` 包裹
2. **嵌套使用**：多个 `SaberInfoProvider` 嵌套时，子组件会使用最近的 Provider 配置
3. **响应式配置**：Provider 的 props 是响应式的，修改后会自动更新所有子组件
4. **宽度单位**：`labelWidth` 可以使用任何 CSS 宽度单位（`px`、`%`、`rem` 等）

## 最佳实践

### 推荐做法

```vue
<template>
  <!-- ✅ 使用 Provider 统一管理多个信息项 -->
  <saber-info-provider label-width="100px">
    <el-row :gutter="24">
      <el-col :span="12">
        <saber-info label="用户名">张三</saber-info>
      </el-col>
      <el-col :span="12">
        <saber-info label="年龄">25</saber-info>
      </el-col>
    </el-row>
  </saber-info-provider>
</template>
```

### 不推荐做法

```vue
<template>
  <!-- ❌ 每个组件都设置相同的配置 -->
  <saber-info label="用户名" label-width="100px">张三</saber-info>
  <saber-info label="年龄" label-width="100px">25</saber-info>
  <saber-info label="邮箱" label-width="100px">test@example.com</saber-info>
</template>
```
