# AppMain 主内容区组件

页面的主内容区域容器组件，提供统一的布局结构和插槽，包括标题、搜索区、工具栏等功能区域。

## 组件说明

`AppMain` 是页面内容的主容器组件，提供了标准化的页面布局结构，包含页面标题、额外信息、搜索区域、工具栏以及主内容区域。

### Props

| 参数       | 说明             | 类型                | 可选值           | 默认值  |
| ---------- | ---------------- | ------------------- | ---------------- | ------- |
| title      | 页面标题         | `string`            | -                | `''`    |
| scrollable | 内容区是否可滚动 | `boolean \| string` | `true` / `false` | `false` |

### Slots

| 名称    | 说明                               | 作用域参数 |
| ------- | ---------------------------------- | ---------- |
| default | 主内容区域                         | -          |
| extra   | 标题右侧的额外信息（如部门名称）   | -          |
| suffix  | 标题行右侧的操作按钮区域           | -          |
| search  | 搜索表单区域                       | -          |
| toolbar | 工具栏区域（如批量操作、刷新按钮） | -          |

### 源码

```vue
<script lang="ts" setup>
defineOptions({
  name: 'AppMain',
})
interface Props {
  title?: string
  scrollable?: boolean | string
}
withDefaults(defineProps<Props>(), {
  title: '',
  scrollable: false,
})
</script>
<template>
  <main class="p-6 flex flex-col h-full">
    <header class="flex-shrink-0">
      <div class="mb-4 flex justify-between items-center" v-if="title || $slots.extra || $slots.suffix">
        <div class="flex items-center gap-3">
          <span v-if="title" class="text-[20px]">{{ title }}</span>
          <template v-if="$slots.extra">
            <span class="w-[1px] h-5 bg-gray-300 dark:bg-dark-500"></span>
            <slot name="extra" />
          </template>
        </div>
        <div v-if="$slots.suffix">
          <slot name="suffix" />
        </div>
      </div>
      <div class="flex justify-between items-center mb-4" v-if="$slots.search || $slots.toolbar">
        <div v-if="$slots.search">
          <slot name="search" />
        </div>
        <div v-if="$slots.toolbar" class="flex-shrink-0">
          <slot name="toolbar" />
        </div>
      </div>
    </header>
    <el-scrollbar class="flex-1 overflow-hidden -mr-6 pr-6" v-if="scrollable">
      <slot />
    </el-scrollbar>
    <div class="flex-1 overflow-hidden" v-else>
      <slot />
    </div>
  </main>
</template>
```

## 使用场景

### 场景一：基础用法（仅标题和内容）

```vue
<template>
  <app-main title="用户管理">
    <div>这里是页面主内容</div>
  </app-main>
</template>
```

### 场景二：带标题额外信息

```vue
<template>
  <app-main title="用户管理">
    <template #extra>技术部</template>
    <div>显示技术部的用户列表</div>
  </app-main>
</template>
```

渲染效果：`用户管理 | 技术部`

### 场景三：完整功能示例

```vue
<script setup lang="ts">
import { ref } from 'vue'

const searchModel = ref({
  username: '',
  status: '',
})

const handleSearch = () => {
  console.log('搜索', searchModel.value)
}

const handleReset = () => {
  searchModel.value = { username: '', status: '' }
}

const handleAdd = () => {
  console.log('新增用户')
}

const handleBatchDelete = () => {
  console.log('批量删除')
}

const handleRefresh = () => {
  console.log('刷新数据')
}
</script>

<template>
  <app-main title="用户管理">
    <!-- 标题额外信息 -->
    <template #extra>技术部</template>

    <!-- 标题右侧操作按钮 -->
    <template #suffix>
      <el-button type="primary" @click="handleAdd">
        <template #icon>
          <Icon icon="solar:add-circle-linear" />
        </template>
        新增用户
      </el-button>
    </template>

    <!-- 搜索区域 -->
    <template #search>
      <app-search
        :search-options="searchFormItems"
        :search-model="searchModel"
        @reset="handleReset"
        @submit="handleSearch"
      />
    </template>

    <!-- 工具栏 -->
    <template #toolbar>
      <div class="flex gap-2">
        <el-button @click="handleBatchDelete">
          <template #icon>
            <Icon icon="solar:trash-bin-trash-linear" />
          </template>
          批量删除
        </el-button>
        <el-button @click="handleRefresh">
          <template #icon>
            <Icon icon="solar:refresh-linear" />
          </template>
          刷新
        </el-button>
      </div>
    </template>

    <!-- 主内容区 -->
    <app-table :columns="columns" :data="tableData" :loading="loading" />
  </app-main>
</template>
```

### 场景四：可滚动内容区

```vue
<template>
  <app-main title="数据详情" :scrollable="true">
    <div style="height: 2000px;">这里是很长的内容，会出现滚动条</div>
  </app-main>
</template>
```

### 场景五：结合侧边栏使用

```vue
<template>
  <app-with-sidebar :sider-width="240">
    <template #sidebar>
      <el-tree :data="deptTree" @node-click="handleDeptClick" />
    </template>

    <app-main title="用户管理">
      <template #extra v-if="currentDeptName">
        {{ currentDeptName }}
      </template>

      <template #suffix>
        <el-button @click="handleAdd">新增用户</el-button>
      </template>

      <template #search>
        <app-search :search-options="searchFormItems" :search-model="searchModel" />
      </template>

      <template #toolbar>
        <el-button @click="handleRefresh">刷新</el-button>
      </template>

      <app-table :data="tableData" />
    </app-main>
  </app-with-sidebar>
</template>
```

## 布局结构

```
┌─────────────────────────────────────────────────────┐
│ <main> (p-6, flex flex-col, h-full)                │
├─────────────────────────────────────────────────────┤
│ <header> (flex-shrink-0)                            │
│  ┌───────────────────────────────────────────────┐  │
│  │ 标题行 (flex justify-between)                  │  │
│  │  ┌─────────────────┐  ┌──────────────────┐   │  │
│  │  │ 标题 + extra    │  │ suffix (按钮)     │   │  │
│  │  └─────────────────┘  └──────────────────┘   │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │ 搜索和工具栏行 (flex justify-between)         │  │
│  │  ┌────────────┐  ┌────────────────────────┐  │  │
│  │  │ search     │  │ toolbar                │  │  │
│  │  └────────────┘  └────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│ 主内容区 (flex-1)                                   │
│  ┌───────────────────────────────────────────────┐  │
│  │ <slot> (默认插槽)                              │  │
│  │                                               │  │
│  │  当 scrollable=true 时：                      │  │
│  │  <el-scrollbar> 包裹                          │  │
│  │                                               │  │
│  │  当 scrollable=false 时：                     │  │
│  │  <div> 包裹，overflow-hidden                  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 样式说明

### 容器样式

- `p-6`：内边距 24px
- `flex flex-col`：纵向 flex 布局
- `h-full`：高度 100%

### 标题区样式

- 标题字号：`text-[20px]`（20px）
- 标题和 extra 之间有分隔线：`w-[1px] h-5 bg-gray-300 dark:bg-dark-500`
- 左右间距：`gap-3`（12px）

### 内容区样式

- **不可滚动**（默认）：`overflow-hidden`
- **可滚动**：使用 `el-scrollbar` 组件，并设置 `-mr-6 pr-6` 处理滚动条占位

## 插槽使用说明

### title + extra + suffix

```vue
<app-main title="用户管理">
  <template #extra>技术部</template>
  <template #suffix>
    <el-button>新增</el-button>
  </template>
</app-main>
```

渲染为：

```
用户管理 | 技术部                         [新增按钮]
```

### search + toolbar

```vue
<app-main>
  <template #search>
    <!-- 搜索表单，靠左 -->
  </template>
  <template #toolbar>
    <!-- 工具按钮，靠右 -->
  </template>
</app-main>
```

渲染为：

```
[搜索表单]                             [工具按钮]
```

## 响应式显示逻辑

组件采用智能显示逻辑，只在需要时才渲染对应区域：

1. **标题行**：当有 `title` prop 或 `extra`/`suffix` 插槽时才显示
2. **搜索工具栏行**：当有 `search` 或 `toolbar` 插槽时才显示

```vue
<!-- 只有内容，没有标题和工具栏 -->
<app-main>
  <div>纯内容</div>
</app-main>

<!-- 有标题，自动显示标题行 -->
<app-main title="用户管理">
  <div>内容</div>
</app-main>

<!-- 有搜索区，自动显示搜索工具栏行 -->
<app-main>
  <template #search>搜索表单</template>
  <div>内容</div>
</app-main>
```

## 注意事项

1. **高度管理**：组件本身占满父容器高度（`h-full`），确保父容器有明确的高度
2. **滚动条处理**：
   - `scrollable=false`：内容区不滚动，适合固定高度的表格等组件
   - `scrollable=true`：使用 `el-scrollbar` 实现美化的滚动条
3. **Padding 调整**：可滚动时使用 `-mr-6 pr-6` 来处理滚动条的占位问题
4. **插槽灵活性**：所有插槽都是可选的，按需使用

## 最佳实践

### ✅ 推荐做法

```vue
<template>
  <!-- 结构清晰，各区域职责明确 -->
  <app-main title="用户管理">
    <template #extra>当前部门</template>
    <template #suffix>
      <el-button>新增</el-button>
    </template>
    <template #search>
      <app-search />
    </template>
    <template #toolbar>
      <el-button>批量操作</el-button>
    </template>
    <app-table />
  </app-main>
</template>
```

### ❌ 不推荐做法

```vue
<template>
  <!-- 不要在 default 插槽中放置标题和工具栏 -->
  <app-main>
    <div class="custom-header">
      <h1>用户管理</h1>
      <button>新增</button>
    </div>
    <div class="custom-search">搜索</div>
    <app-table />
  </app-main>
</template>
```

### 配合其他组件使用

```vue
<template>
  <!-- 配合 app-with-sidebar 和 app-table 使用 -->
  <app-with-sidebar>
    <template #sidebar>
      <el-tree />
    </template>

    <app-main title="数据管理">
      <template #search>
        <app-search />
      </template>

      <app-table />
    </app-main>
  </app-with-sidebar>
</template>
```

## 相关组件

- `AppWithSidebar`：带侧边栏的布局容器
- `AppSearch`：搜索表单组件
- `AppTable`：表格组件
- `SaberButton`：按钮组件
