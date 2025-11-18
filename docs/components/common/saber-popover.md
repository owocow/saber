# SaberPopover 气泡弹出框 [已弃用]

此组件已弃用，使用 el-popover 组件，并添加 transition 自定义属性值： `slide-up`  
这个组件有待扩展，可以改造成 ElementPlus, 这样使用场景更广，不过可以直接使用 elementPlus的 popover组件

## 弹出位置

通过 `placement` 属性设置弹出位置。

```vue
<template>
  <SaberPopover placement="top" content="顶部弹出">
    <el-button>顶部</el-button>
  </SaberPopover>

  <SaberPopover placement="bottom" content="底部弹出">
    <el-button>底部</el-button>
  </SaberPopover>

  <SaberPopover placement="left" content="左侧弹出">
    <el-button>左侧</el-button>
  </SaberPopover>

  <SaberPopover placement="right" content="右侧弹出">
    <el-button>右侧</el-button>
  </SaberPopover>
</template>
```

## 自定义内容

使用默认插槽自定义弹出内容。

```vue
<template>
  <SaberPopover>
    <template #default>
      <div>
        <p>自定义内容标题</p>
        <p>这是详细的内容描述</p>
      </div>
    </template>
    <template #reference>
      <el-button>自定义内容</el-button>
    </template>
  </SaberPopover>
</template>
```

## API

### Props

| 属性名    | 说明     | 类型                                            | 默认值     |
| --------- | -------- | ----------------------------------------------- | ---------- |
| placement | 出现位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| ...` | `'bottom'` |
| offset-x  | 偏移距离 | `number`                                        | `0`        |
| offset-y  | 偏移距离 | `number`                                        | `0`        |

### Slots

| 插槽名    | 说明                          |
| --------- | ----------------------------- |
| default   | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

## 注意事项

- 确保触发元素是一个有效的 DOM 元素
- 注意样式可能需要额外调整

## 示例场景

### 确认操作

```vue
<template>
  <SaberPopover class="w-full" placement="top" :offset-y="6">
    <template #reference>
      <div
        class="w-full rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:bg-dark-700 dark:hover:bg-dark-600 pt-2"
      >
        <div class="flex items-center">
          <el-avatar :size="26" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
          <span class="ml-2">{{ userInfo.user?.nickName }}</span>
        </div>
        <el-icon :size="15">
          <Icon icon="ic:baseline-code" />
        </el-icon>
      </div>
    </template>
    <!-- slot 部分 -->
    <div
      class="bg-white dark:bg-dark-700 w-[226px] shadow-lg dark:shadow-2xl border border-gray-200 dark:border-dark-600 p-4 rounded-lg"
    >
      <dl class="flex justify-between items-center mb-2 border-b border-gray-150 dark:border-dark-600 pb-4">
        <dt class="flex items-center">
          <el-avatar :size="32" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
          <div class="ml-2 flex flex-col">
            <span>{{ userInfo.user?.nickName }}</span>
            <span class="text-xs text-gray-400">[销售总监]</span>
          </div>
        </dt>
        <dd
          @click="toggleDark()"
          class="p-3 cursor-pointer flex items-center justify-center transition hover:bg-gray-150 dark:hover:bg-dark-600 rounded-lg -mr-1"
        >
          <el-icon :size="16" v-if="!isDark">
            <Icon icon="line-md:moon-alt-to-sunny-outline-loop-transition" />
          </el-icon>
          <el-icon :size="16" v-else>
            <Icon icon="line-md:moon-rising-filled-alt-loop" />
          </el-icon>
        </dd>
      </dl>
      <div class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md">
        <el-icon>
          <Icon icon="ep:setting" />
        </el-icon>
        <span class="ml-3">系统设置</span>
      </div>
      <div
        class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md"
        @click="logoutSys"
      >
        <el-icon>
          <Icon icon="solar:logout-2-line-duotone" />
        </el-icon>
        <span class="ml-3">退出登录</span>
      </div>
    </div>
    <!-- slot 部分结束 -->
  </SaberPopover>
</template>
```
