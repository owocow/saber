<script lang="ts" setup>
defineOptions({ name: 'AppPage' })
interface Props {
  title?: string
  siderWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>
<template>
  <div class="app-page">
    <slot name="appPageTitle">
      <div class="app-page-title">
        <slot name="title">test</slot>
      </div>
    </slot>
    <slot name="default">ddd</slot>
  </div>
</template>
