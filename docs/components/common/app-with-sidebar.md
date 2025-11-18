# AppWithSidebar 侧边栏布局组件

带侧边栏的页面布局容器组件，适用于需要左侧导航或树形结构的页面。

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| siderWidth | 侧边栏宽度（像素） | `number` | `200` |

## Slots

| 名称 | 说明 |
|------|------|
| sidebar | 侧边栏内容 |
| default | 主内容区域 |

## 源码

```vue
<script lang="ts" setup>
defineOptions({
  name: 'AppWithSide',
})
interface Props {
  siderWidth?: number
}
withDefaults(defineProps<Props>(), {
  siderWidth: 200,
})
</script>
<template>
  <div class="h-full w-full relative">
    <div
      class="flex-shrink-0 h-full bg-white dark:bg-dark-900 border-r border-gray-150 dark:border-dark-800 pr-2 absolute left-0 top-0 bottom-0"
      :style="{ width: siderWidth + 'px' }"
    >
      <el-scrollbar class="h-full">
        <div class="p-6">
          <slot name="sidebar" />
        </div>
      </el-scrollbar>
    </div>
    <div class="absolute right-0 top-0 bottom-0" :style="{ left: siderWidth + 'px' }">
      <slot />
    </div>
  </div>
</template>
```

## 基础用法

```vue
<template>
  <app-with-sidebar>
    <template #sidebar>
      <div>这是侧边栏内容</div>
    </template>
    
    <div>这是主内容区域</div>
  </app-with-sidebar>
</template>
```

## 自定义侧边栏宽度

```vue
<template>
  <app-with-sidebar :sider-width="300">
    <template #sidebar>
      <div>宽度为 300px 的侧边栏</div>
    </template>
    
    <div>主内容</div>
  </app-with-sidebar>
</template>
```

## 结合树形组件使用

```vue
<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    label: '技术部',
    children: [
      { id: 11, label: '前端组' },
      { id: 12, label: '后端组' }
    ]
  },
  {
    id: 2,
    label: '产品部'
  }
])

const handleNodeClick = (node) => {
  console.log('点击节点:', node)
}
</script>

<template>
  <app-with-sidebar :sider-width="240">
    <template #sidebar>
      <el-tree
        :data="treeData"
        :indent="8"
        highlight-current
        :expand-on-click-node="false"
        node-key="id"
        default-expand-all
        @node-click="handleNodeClick"
      />
    </template>
    
    <div>根据树节点显示的内容</div>
  </app-with-sidebar>
</template>
```

## 完整示例（部门用户管理）

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchGetDeptTree, fetchGetUserList } from '@/service/api/system'

const treeLoading = ref(false)
const deptTree = ref([])
const currentDeptName = ref('')
const userData = ref([])

// 加载部门树
const loadDeptTree = async () => {
  try {
    treeLoading.value = true
    const { data } = await fetchGetDeptTree()
    deptTree.value = data || []
  } finally {
    treeLoading.value = false
  }
}

// 部门节点点击
const handleDeptClick = (node) => {
  currentDeptName.value = node.label
  loadUsersByDept(node.id)
}

// 根据部门加载用户
const loadUsersByDept = async (deptId) => {
  const { data } = await fetchGetUserList({ deptId })
  userData.value = data || []
}

onMounted(() => {
  loadDeptTree()
})
</script>

<template>
  <app-with-sidebar :sider-width="240">
    <!-- 左侧部门树 -->
    <template #sidebar>
      <el-tree
        :indent="8"
        :loading="treeLoading"
        class="h-full"
        item-size="40"
        highlight-current
        :expand-on-click-node="false"
        :data="deptTree"
        node-key="id"
        default-expand-all
        @node-click="handleDeptClick"
      />
    </template>
    
    <!-- 右侧用户列表 -->
    <app-main title="用户管理">
      <template #extra v-if="currentDeptName">
        {{ currentDeptName }}
      </template>
      
      <template #suffix>
        <el-button type="primary">新增用户</el-button>
      </template>

      <app-table :data="userData" :columns="columns" />
    </app-main>
  </app-with-sidebar>
</template>
```

## 布局说明

```
┌─────────────────────────────────────────────────┐
│ <div> (relative, h-full, w-full)               │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  侧边栏       │  主内容区域                       │
│  (absolute)  │  (absolute)                      │
│              │                                  │
│  ┌────────┐  │  ┌────────────────────────────┐  │
│  │ scroll │  │  │                            │  │
│  │        │  │  │  <slot />                  │  │
│  │ sidebar│  │  │                            │  │
│  │        │  │  │                            │  │
│  └────────┘  │  └────────────────────────────┘  │
│              │                                  │
│ siderWidth   │  right: 0                        │
│              │  left: siderWidth                │
└──────────────┴──────────────────────────────────┘
```

## 核心特性

### 1. 固定侧边栏宽度
- 通过 `siderWidth` prop 自定义侧边栏宽度
- 主内容区域自动适配剩余空间

### 2. 内置滚动容器
- 侧边栏使用 `el-scrollbar` 包裹，支持美化滚动条
- 内容超出时自动显示滚动条

### 3. 绝对定位布局
- 使用 `absolute` 定位确保侧边栏和主内容区域都占满容器高度
- 响应式适配不同宽度

## 样式说明

### 侧边栏样式
- 背景色：`bg-white dark:bg-dark-900`
- 右边框：`border-r border-gray-150 dark:border-dark-800`
- 内边距：`p-6`（24px）
- 右内边距：`pr-2`（8px，用于滚动条空间）

### 布局特点
- 父容器：`relative` 定位
- 侧边栏：`absolute` 定位，固定宽度
- 主内容：`absolute` 定位，占据剩余空间

## 注意事项

1. **父容器高度**：组件本身是 `h-full`，需要确保父容器有明确的高度
2. **侧边栏宽度单位**：`siderWidth` 参数单位是像素（px），只传数字即可
3. **滚动容器**：侧边栏内容超出时自动滚动，主内容区域需要自行处理滚动

## 常用宽度建议

- **窄侧边栏**（导航菜单）：`200px` - `240px`
- **中等侧边栏**（树形结构）：`240px` - `300px`
- **宽侧边栏**（详细信息）：`300px` - `400px`

```vue
<!-- 窄侧边栏 -->
<app-with-sidebar :sider-width="200">

<!-- 中等侧边栏（推荐） -->
<app-with-sidebar :sider-width="240">

<!-- 宽侧边栏 -->
<app-with-sidebar :sider-width="320">
```

## 相关组件

- `AppMain` - 主内容区容器（常与本组件配合使用）
- `AppTable` - 表格组件
- `AppSearch` - 搜索表单组件
- Element Plus `ElTree` - 树形组件
