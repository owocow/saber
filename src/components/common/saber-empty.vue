<script lang="ts" setup>
defineOptions({ name: 'SaberEmpty' })

interface Props {
  icon?: string
  iconSize?: number
  note?: string
  extraClass?: string
}
withDefaults(defineProps<Props>(), {
  icon: 'solar:mask-sad-linear',
  iconSize: 24,
  note: '暂无相关数据',
})
</script>
<template>
  <div class="flex flex-col w-full items-center p-4 text-gray-400 dark:text-dark-600">
    <el-icon :size="iconSize">
      <Icon :icon="icon" />
    </el-icon>
    <p class="text-sm mt-2">{{ note }}</p>
    <slot name="default" />
  </div>
</template>
