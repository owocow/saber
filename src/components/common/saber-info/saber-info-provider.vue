<script lang="ts" setup>
defineOptions({ name: 'SaberInfoProvider' })
interface Props {
  labelPosition?: 'left' | 'top'
  labelWidth?: string
  bottom?: string
}
const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'left',
  labelWidth: '80px',
  bottom: '8px',
})
provide('saberInfoProvider', {
  labelPosition: computed(() => props.labelPosition),
  labelWidth: computed(() => props.labelWidth),
  bottom: computed(() => props.bottom),
})
</script>
<template>
  <slot name="default" />
</template>
