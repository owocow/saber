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
