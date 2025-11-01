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
  <main class="p-6 pt-4">
    <header class="mb-4">
      <div class="mb-4 flex justify-between items-center">
        <div class="flex items-center">
          <span v-if="title" class="text-[20px] text-gray-600 mr-6">{{ title }}</span>
          <div v-if="$slots.extra">
            <slot name="extra" />
          </div>
        </div>
        <div v-if="$slots.suffix">
          <slot name="suffix" />
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div v-if="$slots.search">
          <slot name="search" />
        </div>
        <div v-if="$slots.toolbar">
          <slot name="toolbar" />
        </div>
      </div>
    </header>
    <slot></slot>
  </main>
</template>
