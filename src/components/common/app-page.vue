<script lang="ts" setup>
import AppMain from './app-main.vue'
defineOptions({
  name: 'AppPage',
})
interface Props {
  siderWidth?: number
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  siderWidth: 200,
})
</script>
<template>
  <div
    class="absolute top-[var(--page-header-height)] left-0 right-0 bottom-0 flex overflow-hidden"
    v-if="$slots.sidebar"
  >
    <el-scrollbar
      :class="`shrink-0 h-full bg-white dark:bg-dark-700 border-r border-gray-100 dark:border-dark-500 pr-2`"
      :style="{ width: siderWidth + 'px' }"
    >
      <div class="p-4">
        <slot name="sidebar"></slot>
      </div>
    </el-scrollbar>
    <el-scrollbar class="flex-1">
      <AppMain :title="title">
        <template #extra>
          <slot name="extra">标题后面</slot>
        </template>
        <template #suffix>
          <slot name="suffix">尾部</slot>
        </template>
        <template #search>
          <slot name="search"></slot>
        </template>
        <template #toolbar>
          <slot name="toolbar"></slot>
        </template>
        <slot></slot>
      </AppMain>
    </el-scrollbar>
  </div>
  <div class="pt-[var(--page-header-height)]" v-else>
    <AppMain :title="title">
      <template #extra>
        <slot name="extra">标题后面</slot>
      </template>
      <template #suffix>
        <slot name="suffix">尾部</slot>
      </template>
      <template #search>
        <slot name="search"></slot>
      </template>
      <template #toolbar>
        <slot name="toolbar"></slot>
      </template>
      <slot></slot>
    </AppMain>
  </div>
</template>
