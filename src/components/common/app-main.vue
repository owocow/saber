<script lang="ts" setup>
defineOptions({
  name: 'AppMain',
})
interface Props {
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>
<template>
  <main class="p-5 pt-4 w-full flex flex-col min-h-[calc(100vh-var(--page-header-height))]">
    <header class="flex-shrink-0">
      <div class="mb-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span v-if="title" class="text-[20px] text-gray-600">{{ title }}</span>
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
    <div class="flex-1 flex w-full">
      <slot />
    </div>
  </main>
</template>
