# AppTable 表格组件

基于 Element Plus Table 封装的表格组件，提供分页、列筛选、多选等功能。

## Props

| 参数              | 说明                     | 类型                                      | 默认值  |
| ----------------- | ------------------------ | ----------------------------------------- | ------- |
| columns           | 表格列配置               | `ColumnsType[]`                           | `[]`    |
| data              | 表格数据                 | `any[]`                                   | `[]`    |
| loading           | 加载状态                 | `boolean`                                 | `false` |
| selected          | 选中的行数据（v-model）  | `any[]`                                   | `[]`    |
| showSelection     | 是否显示多选框           | `boolean`                                 | `false` |
| showActions       | 是否显示操作列           | `boolean`                                 | `true`  |
| actionsWidth      | 操作列宽度               | `number \| string`                        | `150`   |
| defaultBtnText    | 默认操作按钮文本         | `string`                                  | `查看`  |
| disablePagination | 是否禁用分页             | `boolean`                                 | `false` |
| hidePageSizes     | 是否隐藏每页条数选择器   | `boolean \| string`                       | `false` |
| pagination        | 分页配置                 | `Pagination`                              | `{}`    |
| meta              | 表格元信息（用于列筛选） | `{ tableId: string, initials: string[] }` | -       |
| ...               | element-table 其他属性   | -                                         | -       |

## ColumnsType 配置

| 属性   | 说明                               | 类型                  | 必填 |
| ------ | ---------------------------------- | --------------------- | ---- |
| key    | 列的唯一标识                       | `string`              | 是   |
| label  | 列标题                             | `string`              | 是   |
| width  | 列宽度                             | `number \| string`    | 否   |
| render | 自定义渲染函数（TSX）              | `(row: any) => VNode` | 否   |
| ...    | Element Plus Table Column 其他属性 | -                     | 否   |

## Pagination 配置

| 属性              | 说明                   | 类型                     |
| ----------------- | ---------------------- | ------------------------ |
| currentPage       | 当前页码               | `number`                 |
| pageSize          | 每页条数               | `number`                 |
| total             | 总条数                 | `number`                 |
| pageSizes         | 每页条数选项           | `number[]`               |
| hidePageSizes     | 是否隐藏每页条数选择器 | `boolean`                |
| currentPageChange | 页码改变回调           | `(page: number) => void` |
| sizeChange        | 每页条数改变回调       | `(size: number) => void` |

## Events

| 事件名     | 说明                   | 回调参数   |
| ---------- | ---------------------- | ---------- |
| item-click | 点击默认操作按钮时触发 | `row: any` |

## Slots

| 名称    | 说明                 | 作用域参数 |
| ------- | -------------------- | ---------- |
| header  | 表格头部自定义内容   | -          |
| actions | 操作列自定义内容     | `{ row }`  |
| tips    | 分页区域左侧提示信息 | -          |

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
])

const columns = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄', width: 80 },
  { key: 'email', label: '邮箱' },
]

const pagination = {
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 25, 50, 100],
  currentPageChange: page => {
    pagination.currentPage = page
    getData()
  },
  sizeChange: size => {
    pagination.pageSize = size
    getData()
  },
}

const getData = () => {
  // 加载数据
}
</script>

<template>
  <app-table v-model:loading="loading" v-model:data="data" :columns="columns" :pagination="pagination" />
</template>
```

## 自定义渲染（TSX）

```tsx
import { ElSwitch, ElTag } from 'element-plus'

const columns = [
  {
    key: 'name',
    label: '用户',
    render: row => (
      <div class="flex flex-col">
        <span class="font-medium">{row.userName}</span>
        <span class="text-sm text-gray-500">{row.nickName}</span>
      </div>
    ),
  },
  {
    key: 'status',
    label: '状态',
    width: 100,
    render: row => <ElSwitch modelValue={row.status === '0'} activeText="启用" inactiveText="停用" inline-prompt />,
  },
]
```

## 多选功能

```vue
<script setup lang="ts">
const selectedUsers = ref([])

const handleBatchDelete = () => {
  if (selectedUsers.value.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }
  console.log('选中的数据:', selectedUsers.value)
}
</script>

<template>
  <app-table v-model:selected="selectedUsers" :show-selection="true" :columns="columns" :data="data" />

  <el-button @click="handleBatchDelete">批量删除</el-button>
</template>
```

## 自定义操作列

```vue
<template>
  <app-table :columns="columns" :data="data" :actions-width="180">
    <template #actions="{ row }">
      <div class="flex gap-1.5 justify-end">
        <el-button size="small" circle @click="handleEdit(row)">
          <template #icon>
            <Icon icon="solar:pen-new-square-linear" />
          </template>
        </el-button>
        <el-button size="small" circle @click="handleDelete(row)">
          <template #icon>
            <Icon icon="solar:trash-bin-trash-linear" />
          </template>
        </el-button>
      </div>
    </template>
  </app-table>
</template>
```

## 列筛选功能

```vue
<script setup lang="ts">
const meta = {
  tableId: 'system-users-table', // 唯一标识，用于缓存
  initials: ['name', 'age', 'email', 'status'], // 默认显示的列
}

const columns = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄' },
  { key: 'email', label: '邮箱' },
  { key: 'status', label: '状态' },
  { key: 'phone', label: '手机号' },
]
</script>

<template>
  <app-table :columns="columns" :data="data" :meta="meta" />
</template>
```

**说明**：设置 `meta` 后，操作列表头会显示"列设置"按钮，用户可以自定义显示哪些列，配置会缓存到本地。

## 隐藏每页条数选择器

```vue
<template>
  <!-- 只写属性名，不传值 -->
  <app-table hidePageSizes :columns="columns" :data="data" :pagination="pagination" />

  <!-- 或者明确传 true -->
  <app-table :hidePageSizes="true" :columns="columns" :data="data" :pagination="pagination" />
</template>
```

**说明**：设置 `hidePageSizes` 后，分页器只显示 `total, prev, pager, next`，不显示每页条数选择器。

## 禁用分页

```vue
<template>
  <app-table :columns="columns" :data="data" :disable-pagination="true" />
</template>
```

## 表格头部和底部插槽

```vue
<template>
  <app-table :columns="columns" :data="data" :pagination="pagination">
    <!-- 表格头部 -->
    <template #header>
      <div class="flex justify-between items-center">
        <span>共 {{ data.length }} 条数据</span>
        <el-button size="small">导出</el-button>
      </div>
    </template>

    <!-- 分页区域提示信息 -->
    <template #tips>
      <span class="text-sm text-gray-500">已选择 {{ selected.length }} 项</span>
    </template>
  </app-table>
</template>
```

## 完整示例

```vue
<script setup lang="ts">
import { useTable } from '@/composables/use-table'
import { fetchGetUserList, fetchBatchDeleteUser } from '@/service/api/system'
import { ElMessage } from 'element-plus'

// 表格配置
const meta = {
  tableId: 'system-users-table',
  initials: ['nickName', 'deptName', 'phone', 'email', 'status'],
}

// 使用 useTable hook
const { data, getData, pagination, loading } = useTable({
  apiFn: fetchGetUserList,
  apiParams: {},
  paginConfig: {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  },
})

// 选中的数据
const selectedUsers = ref([])

// 列配置
const columns = [
  {
    key: 'nickName',
    label: '用户',
    render: row => (
      <div class="flex flex-col">
        <span class="font-medium">{row.userName}</span>
        <span class="text-sm text-gray-500">{row.nickName}</span>
      </div>
    ),
  },
  { key: 'deptName', label: '部门' },
  { key: 'email', label: '邮箱' },
  { key: 'phone', label: '手机号' },
]

// 编辑
const handleEdit = row => {
  console.log('编辑', row)
}

// 删除
const handleDelete = async row => {
  const { error } = await fetchBatchDeleteUser([row.userId])
  if (!error) {
    ElMessage.success('删除成功')
    getData()
  }
}
</script>

<template>
  <app-main title="用户管理">
    <template #search>
      <app-search :search-options="searchFormItems" :search-model="searchModel" @submit="getData" />
    </template>

    <app-table
      v-model:selected="selectedUsers"
      :columns="columns"
      :data="data"
      :loading="loading"
      :show-selection="true"
      :pagination="pagination"
      :meta="meta"
      :actions-width="180"
    >
      <template #actions="{ row }">
        <div class="flex gap-1.5 justify-end">
          <el-button size="small" circle @click="handleEdit(row)">
            <template #icon>
              <Icon icon="solar:pen-new-square-linear" />
            </template>
          </el-button>
          <el-button size="small" circle @click="handleDelete(row)">
            <template #icon>
              <Icon icon="solar:trash-bin-trash-linear" />
            </template>
          </el-button>
        </div>
      </template>

      <template #tips>
        <span v-if="selectedUsers.length"> 已选择 {{ selectedUsers.length }} 项 </span>
      </template>
    </app-table>
  </app-main>
</template>
```

## 核心特性

### 1. 列筛选缓存

- 用户自定义显示列后，配置会保存到 localStorage
- 下次打开页面时会自动恢复之前的列显示设置
- 缓存 key：`app-table_${tableId}`

### 2. 多选功能

- 使用 `v-model:selected` 双向绑定选中数据
- 支持跨页保留选中状态（使用 `reserve-selection`）
- 自动处理数据深拷贝，避免响应式问题

### 3. 自定义渲染

- 支持 TSX 语法的 `render` 函数
- 可以使用任何 Vue 组件和逻辑
- 如果不需要自定义渲染，直接使用 `key` 属性即可

### 4. 响应式分页

- 自动处理分页布局（支持隐藏每页条数选择器）
- 分页器在底部居中显示
- 如果有 `tips` 插槽，分页器会靠右显示

## 注意事项

1. **data 必须使用 v-model**：组件内部会修改 data，需要双向绑定
2. **columns 中的 key 必须唯一**：用于列筛选和缓存
3. **meta.tableId 必须全局唯一**：用于区分不同表格的列配置缓存
4. **render 函数使用 TSX**：需要在 `.tsx` 或 `.jsx` 文件中定义 columns

## 相关组件

- `AppMain` - 主内容区容器
- `AppSearch` - 搜索表单组件
- `useTable` - 表格数据管理 hook
