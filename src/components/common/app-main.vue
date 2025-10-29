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
        <div class="flex">
          <span v-if="title" class="text-[20px] text-gray-600 mr-6">{{ title }}</span>
          <div>
            <slot name="extra">标题后面</slot>
          </div>
        </div>
        <div>
          <slot name="suffix">尾部</slot>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <slot name="search"></slot>
        </div>
        <div>
          <slot name="toolbar"></slot>
        </div>
      </div>
    </header>
    <slot></slot>
  </main>
</template>
