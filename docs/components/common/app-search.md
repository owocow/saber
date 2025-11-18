# AppSearch 搜索表单组件

用于页面的搜索条件表单组件，支持多种表单控件，提供自动重置、实时搜索等功能。

## 组件说明

`AppSearch` 是一个动态搜索表单组件，通过配置化的方式快速构建搜索区域，支持 Element Plus 的各种表单组件，并提供智能重置、实时搜索等功能。

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| searchOptions | 搜索表单配置项 | `SearchFormItemType[] \| (() => SearchFormItemType[])` | `[]` |
| searchModel | 搜索表单数据模型 | `Record<string, any>` | `{}` |
| transformFn | 提交前的数据转换函数 | `(model: Record<string, any>) => Record<string, any>` | - |
| showSubmitBtn | 是否显示提交按钮 | `boolean` | `false` |

#### SearchFormItemType 配置项

| 属性 | 说明 | 类型 | 是否必填 |
|------|------|------|----------|
| which | 表单组件类型 | `ComponentMapKey` | 是 |
| prop | 绑定的数据字段 | `string` | 是 |
| placeholder | 占位提示文本 | `string` | 否 |
| clearable | 是否可清空 | `boolean` | 否 |
| style | 组件样式 | `CSSProperties` | 否 |
| slots | 插槽配置 | `Record<string, SlotConfig>` | 否 |
| ... | 其他组件原生属性 | - | 否 |

#### ComponentMapKey 支持的组件类型

- `el-input` - 输入框
- `el-select` - 选择器
- `el-date-picker` - 日期选择器
- `el-input-number` - 数字输入框
- `el-input-tag` - 标签输入框
- `el-radio` - 单选框
- `el-rate` - 评分
- `el-slider` - 滑块
- `el-switch` - 开关
- `el-time-picker` - 时间选择器
- `el-tree-select` - 树形选择器
- `el-upload` - 上传
- `el-autocomplete` - 自动完成
- `el-cascader` - 级联选择器
- `el-checkbox` - 多选框
- `saber-checkbox` - 自定义多选框组
- `saber-radios` - 自定义单选框组

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 任一表单项值改变时触发（会自动提交） | `{ prop: string, value: any }` |
| submit | 点击搜索按钮或表单项改变时触发 | `Record<string, any>` |
| reset | 点击重置按钮时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| prepend | 搜索表单项前置内容 |
| append | 搜索表单项后置内容 |

### 源码

```vue
<script lang="ts" setup>
import { jsonClone } from '@/packages/utils'
import { getComponentByWhich } from '../forms/utils'
interface AppSearchProps {
  searchOptions: Saber.AppForm.SearchFormItemType[] | (() => Saber.AppForm.SearchFormItemType[])
  searchModel: Record<string, any>
  transformFn?: (model: Record<string, any>) => Record<string, any>
  showSubmitBtn?: boolean
}
const props = withDefaults(defineProps<AppSearchProps>(), {
  searchOptions: () => [],
  searchModel: () => ({}),
  showSubmitBtn: false,
})

const emits = defineEmits(['change', 'submit', 'reset'])
const options = computed(() => {
  return typeof props.searchOptions === 'function' ? props.searchOptions() : props.searchOptions
})

const searchForm = reactive<Record<string, any>>({ ...jsonClone(props.searchModel) })

const resetForm = () => {
  Object.assign(searchForm, jsonClone(props.searchModel))
  emits('reset')
}

const handleChange = (prop: string, value: any) => {
  emits('change', { prop, value })
  const _form = jsonClone(searchForm)
  emits('submit', props.transformFn ? props.transformFn(_form) : _form)
}
const handleSubmit = () => {
  const _form = jsonClone(searchForm)
  emits('submit', props.transformFn ? props.transformFn(_form) : _form)
}

const disableReset = computed(() => {
  return Object.keys(props.searchModel).every(key => {
    const modelValue = props.searchModel[key]
    const formValue = searchForm[key]

    // 判断是否为空值
    const isEmpty = (val: any) => {
      if (val === null || val === undefined || val === '') return true
      if (Array.isArray(val) && val.length === 0) return true
      return false
    }

    // 两个都是空值,视为相等
    if (isEmpty(modelValue) && isEmpty(formValue)) {
      return true
    }

    // 数组需要深度比较
    if (Array.isArray(modelValue) && Array.isArray(formValue)) {
      return JSON.stringify(modelValue) === JSON.stringify(formValue)
    }

    // 其他情况正常比较
    return modelValue === formValue
  })
})
</script>
<template>
  <div class="flex flex-wrap gap-2">
    <slot name="prepend" />
    <div class="flex-shrink-0" v-for="{ which, prop, slots, ...rest } in options">
      <component
        :is="getComponentByWhich(which)"
        v-model="searchForm[prop]"
        v-bind="rest"
        @change="handleChange(prop, searchForm[prop])"
      >
        <template v-for="(slotConfig, slotName) in slots" :key="slotName" #[slotName]>
          <component v-if="slotConfig.render" :is="() => slotConfig.render!(h)" />
          <component v-else-if="slotConfig.component" :is="slotConfig.component" v-bind="slotConfig.props || {}" />
          <template v-else>{{ slotConfig.text }}</template>
        </template>
      </component>
    </div>
    <el-button class="saber" :disabled="disableReset" @click="resetForm">重置</el-button>
    <div v-if="showSubmitBtn">
      <el-button class="saber" type="primary" @click="handleSubmit">搜索</el-button>
    </div>
    <slot name="append" />
  </div>
</template>
```

## 使用场景

### 场景一：基础用法（实时搜索）

```vue
<script setup lang="ts">
import { ref } from 'vue'

// 搜索模型
const userSearchModel = {
  userName: '',
  nickName: '',
  status: ''
}

// 搜索配置
const searchFormItems = [
  {
    which: 'el-input',
    placeholder: '请输入用户名称',
    prop: 'userName',
    clearable: true,
    style: { width: '220px' }
  },
  {
    which: 'el-input',
    placeholder: '请输入用户昵称',
    prop: 'nickName',
    clearable: true,
    style: { width: '220px' }
  },
  {
    which: 'el-select',
    placeholder: '用户状态',
    prop: 'status',
    clearable: true,
    options: [
      { label: '启用', value: '0' },
      { label: '停用', value: '1' }
    ],
    style: { width: '140px' }
  }
]

// 搜索提交
const handleSearch = (params) => {
  console.log('搜索参数:', params)
  // 调用接口查询数据
}

// 重置搜索
const handleReset = () => {
  console.log('重置搜索')
  // 重新加载数据
}
</script>

<template>
  <app-search
    :search-options="searchFormItems"
    :search-model="userSearchModel"
    @submit="handleSearch"
    @reset="handleReset"
  />
</template>
```

### 场景二：带提交按钮（手动触发搜索）

```vue
<template>
  <app-search
    :search-options="searchFormItems"
    :search-model="searchModel"
    :show-submit-btn="true"
    @submit="handleSearch"
    @reset="handleReset"
  />
</template>
```

**说明**：
- 不设置 `showSubmitBtn` 时，表单项值改变会自动触发搜索（实时搜索）
- 设置 `showSubmitBtn="true"` 时，需要手动点击"搜索"按钮才触发搜索

### 场景三：使用插槽配置前缀图标

```tsx
import { Icon } from '@iconify/vue'

export const searchFormItems = [
  {
    which: 'el-input',
    placeholder: '请输入用户名称',
    prop: 'userName',
    clearable: true,
    style: { width: '220px' },
    // 配置前缀插槽
    slots: {
      prefix: {
        component: Icon,
        props: {
          icon: 'solar:shield-user-linear',
          width: '18',
          height: '18',
          inline: true
        }
      }
    }
  },
  {
    which: 'el-select',
    placeholder: '用户状态',
    prop: 'status',
    clearable: true,
    options: [
      { label: '启用', value: '0' },
      { label: '停用', value: '1' }
    ],
    style: { width: '140px' },
    slots: {
      prefix: {
        component: Icon,
        props: {
          icon: 'solar:masks-linear',
          width: '18',
          height: '18',
          inline: true
        }
      }
    }
  }
]
```

### 场景四：使用数据转换函数

```vue
<script setup lang="ts">
const searchModel = {
  dateRange: [],
  keyword: ''
}

const searchFormItems = [
  {
    which: 'el-date-picker',
    prop: 'dateRange',
    type: 'daterange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    style: { width: '240px' }
  },
  {
    which: 'el-input',
    prop: 'keyword',
    placeholder: '关键字',
    clearable: true,
    style: { width: '200px' }
  }
]

// 转换函数：将日期范围拆分为 startDate 和 endDate
const transformSearch = (model) => {
  const { dateRange, ...rest } = model
  return {
    ...rest,
    startDate: dateRange?.[0] || '',
    endDate: dateRange?.[1] || ''
  }
}

const handleSearch = (params) => {
  console.log('转换后的参数:', params)
  // 结果: { keyword: 'xxx', startDate: '2024-01-01', endDate: '2024-01-31' }
}
</script>

<template>
  <app-search
    :search-options="searchFormItems"
    :search-model="searchModel"
    :transform-fn="transformSearch"
    @submit="handleSearch"
  />
</template>
```

### 场景五：使用前置和后置插槽

```vue
<template>
  <app-search
    :search-options="searchFormItems"
    :search-model="searchModel"
    @submit="handleSearch"
  >
    <!-- 前置内容 -->
    <template #prepend>
      <el-button type="primary">高级搜索</el-button>
    </template>
    
    <!-- 后置内容 -->
    <template #append>
      <el-button type="warning">导出</el-button>
      <el-button type="danger">批量删除</el-button>
    </template>
  </app-search>
</template>
```

### 场景六：完整示例（结合表格使用）

```vue
<script setup lang="ts">
import { fetchGetUserList } from '@/service/api/system'
import { useTable } from '@/composables/use-table'

// 搜索模型
const userSearchModel = {
  userName: '',
  nickName: '',
  status: ''
}

// 搜索配置
const searchFormItems = [
  {
    which: 'el-input',
    placeholder: '请输入用户名称',
    prop: 'userName',
    clearable: true,
    style: { width: '220px' }
  },
  {
    which: 'el-input',
    placeholder: '请输入用户昵称',
    prop: 'nickName',
    clearable: true,
    style: { width: '220px' }
  },
  {
    which: 'el-select',
    placeholder: '用户状态',
    prop: 'status',
    clearable: true,
    options: [
      { label: '启用', value: '0' },
      { label: '停用', value: '1' }
    ],
    style: { width: '140px' }
  }
]

// 使用表格 hook
const { data, getData, pagination, resetSearchParams, updateSearchParams } = useTable({
  apiFn: fetchGetUserList,
  apiParams: userSearchModel,
  paginConfig: {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100]
  }
})
</script>

<template>
  <app-main title="用户管理">
    <template #search>
      <app-search
        :search-options="searchFormItems"
        :search-model="userSearchModel"
        @reset="resetSearchParams"
        @submit="updateSearchParams"
      />
    </template>

    <app-table
      :data="data"
      :columns="columns"
      :pagination="pagination"
      @page-change="getData"
    />
  </app-main>
</template>
```

## 核心特性

### 1. 实时搜索 vs 手动搜索

```vue
<!-- 实时搜索：表单项改变立即触发 -->
<app-search
  :search-options="searchFormItems"
  :search-model="searchModel"
  @submit="handleSearch"
/>

<!-- 手动搜索：需要点击搜索按钮 -->
<app-search
  :search-options="searchFormItems"
  :search-model="searchModel"
  :show-submit-btn="true"
  @submit="handleSearch"
/>
```

### 2. 智能重置按钮

重置按钮会自动判断表单是否有修改：
- 当表单值与初始值相同时，按钮禁用
- 支持数组、对象等复杂数据类型的比较
- 空值智能判断（`null`、`undefined`、`''`、`[]` 都视为空）

```typescript
// 智能判断逻辑
const disableReset = computed(() => {
  return Object.keys(props.searchModel).every(key => {
    const modelValue = props.searchModel[key]
    const formValue = searchForm[key]

    // 空值判断
    const isEmpty = (val: any) => {
      if (val === null || val === undefined || val === '') return true
      if (Array.isArray(val) && val.length === 0) return true
      return false
    }

    // 两个都是空值，视为相等
    if (isEmpty(modelValue) && isEmpty(formValue)) {
      return true
    }

    // 数组深度比较
    if (Array.isArray(modelValue) && Array.isArray(formValue)) {
      return JSON.stringify(modelValue) === JSON.stringify(formValue)
    }

    return modelValue === formValue
  })
})
```

### 3. 插槽配置系统

支持三种插槽配置方式：

```typescript
slots: {
  // 方式一：使用组件 + props
  prefix: {
    component: Icon,
    props: {
      icon: 'solar:search-linear',
      width: '18'
    }
  },
  
  // 方式二：使用渲染函数
  suffix: {
    render: (h) => h('span', '后缀')
  },
  
  // 方式三：纯文本
  append: {
    text: '追加内容'
  }
}
```

### 4. 数据转换

使用 `transformFn` 在提交前转换数据：

```typescript
// 示例：日期范围拆分
const transformFn = (model) => {
  const { dateRange, ...rest } = model
  return {
    ...rest,
    startDate: dateRange?.[0],
    endDate: dateRange?.[1]
  }
}
```

## 布局说明

组件使用 Flexbox 布局，支持自动换行：

```vue
<div class="flex flex-wrap gap-2">
  <slot name="prepend" />
  <!-- 表单项 -->
  <el-button>重置</el-button>
  <el-button v-if="showSubmitBtn">搜索</el-button>
  <slot name="append" />
</div>
```

- `flex flex-wrap`：自动换行
- `gap-2`：间距 8px
- `flex-shrink-0`：表单项不收缩

## 注意事项

1. **searchModel 必须是响应式对象**
   ```typescript
   // ✅ 正确
   const searchModel = reactive({ name: '' })
   const searchModel = ref({ name: '' })
   
   // ❌ 错误
   const searchModel = { name: '' }
   ```

2. **searchOptions 可以是函数**
   ```typescript
   // 静态配置
   const searchFormItems = [...]
   
   // 动态配置（可以访问响应式数据）
   const searchFormItems = () => [
     {
       which: 'el-select',
       options: computedOptions.value
     }
   ]
   ```

3. **change 事件会自动触发 submit**
   - 如果不需要实时搜索，使用 `showSubmitBtn`
   - change 事件先触发，然后自动触发 submit

4. **重置行为**
   - 点击重置按钮只触发 `reset` 事件
   - 需要在 `reset` 事件中手动重新加载数据
   ```vue
   <app-search
     @reset="resetSearchParams"
     @submit="updateSearchParams"
   />
   ```

## 类型定义

```typescript
// 搜索表单项配置
interface SearchFormItemType {
  which: ComponentMapKey
  prop: string
  placeholder?: string
  clearable?: boolean
  style?: CSSProperties
  slots?: Record<string, SlotConfig>
  [key: string]: any
}

// 插槽配置
interface SlotConfig {
  component?: Component
  props?: Record<string, any>
  render?: (h: typeof import('vue').h) => VNode
  text?: string
}

// 组件 Props
interface AppSearchProps {
  searchOptions: SearchFormItemType[] | (() => SearchFormItemType[])
  searchModel: Record<string, any>
  transformFn?: (model: Record<string, any>) => Record<string, any>
  showSubmitBtn?: boolean
}
```

## 最佳实践

### ✅ 推荐做法

```vue
<script setup lang="ts">
// 1. 将搜索配置抽离到单独的文件
import { searchFormItems, searchModel } from './model'

// 2. 使用 useTable hook 管理数据
const { data, getData, resetSearchParams, updateSearchParams } = useTable({
  apiFn: fetchGetUserList,
  apiParams: searchModel
})
</script>

<template>
  <!-- 3. 配合 app-main 使用 -->
  <app-main title="用户管理">
    <template #search>
      <app-search
        :search-options="searchFormItems"
        :search-model="searchModel"
        @reset="resetSearchParams"
        @submit="updateSearchParams"
      />
    </template>
    
    <app-table :data="data" />
  </app-main>
</template>
```

### ❌ 不推荐做法

```vue
<script setup lang="ts">
// ❌ 不要在模板中定义配置
// ❌ 不要使用普通对象作为 searchModel
</script>

<template>
  <app-search
    :search-options="[
      { which: 'el-input', prop: 'name' }
    ]"
    :search-model="{ name: '' }"
  />
</template>
```

## 相关组件

- `AppMain` - 主内容区容器
- `AppTable` - 表格组件
- `useTable` - 表格数据管理 hook
- Element Plus 各类表单组件
