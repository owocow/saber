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
