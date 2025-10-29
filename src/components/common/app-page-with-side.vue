<script lang="ts" setup>
defineOptions({
  name: 'AppPageWithSide',
})
interface Props {}
const props = defineProps<Props>()
</script>
<template>
  <div class="absolute top-[var(--page-header-height)] left-0 right-0 bottom-0 flex">
    <el-scrollbar
      class="shrink-0 w-[200px] h-full bg-white dark:bg-dark-700 border-r border-gray-100 dark:border-dark-500 pr-2"
    >
      <div class="p-4">
        <slot name="aside"></slot>
      </div>
    </el-scrollbar>
    <el-scrollbar class="flex-1">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>
