<script lang="ts" setup>
import AppMain from './app-main.vue'
defineOptions({
  name: 'AppPage',
})
interface Props {
  siderWidth?: number
  title?: string
  flex?: boolean
}
withDefaults(defineProps<Props>(), {
  siderWidth: 200,
  flex: false,
})
</script>
<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 flex overflow-hidden" v-if="$slots.sidebar">
    <el-scrollbar
      class="shrink-0 h-full bg-white dark:bg-dark-900 border-r border-gray-150 dark:border-dark-800 pr-2"
      :style="{ width: siderWidth + 'px' }"
    >
      <div class="px-6 py-5">
        <slot name="sidebar"></slot>
      </div>
    </el-scrollbar>
    <el-scrollbar class="flex-1">
      <AppMain :title="title" :flex="flex">
        <template v-if="$slots.extra" #extra>
          <slot name="extra" />
        </template>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix" />
        </template>
        <template v-if="$slots.search" #search>
          <slot name="search" />
        </template>
        <template v-if="$slots.toolbar" #toolbar>
          <slot name="toolbar" />
        </template>
        <slot />
      </AppMain>
    </el-scrollbar>
  </div>
  <AppMain :title="title" v-else :flex="flex">
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="$slots.search" #search>
      <slot name="search" />
    </template>
    <template v-if="$slots.toolbar" #toolbar>
      <slot name="toolbar" />
    </template>
    <slot />
  </AppMain>
</template>
