<script lang="ts" setup>
defineOptions({ name: 'SaberStatus' })
interface Props {
  size?: 'small' | 'medium' | 'large'
  label: string
  labelPosition?: 'left' | 'top'
  labelWidth?: string
  bottom?: string
}
const props = withDefaults(defineProps<Props>(), {
  bottom: '8px',
})

/**注入父组件提供的配置 */
const provider = inject(
  'saberInfoProvider',
  null as null | {
    labelPosition: ComputedRef<'left' | 'top'>
    labelWidth: ComputedRef<string>
    bottom: ComputedRef<string>
  }
)

const finalLabelPosition = computed(() => {
  return props.labelPosition || provider?.labelPosition?.value || 'left'
})
const finalLabelWidth = computed(() => {
  return props.labelWidth || provider?.labelWidth?.value || '80px'
})
const finalBottom = computed(() => {
  return props.bottom || provider?.bottom?.value || '8px'
})
const topClass = computed(() => {
  return finalLabelPosition.value === 'top' ? 'flex-col' : ''
})
</script>
<template>
  <div :class="['flex gap-2', topClass]" :style="{ marginBottom: finalBottom }">
    <span class="text-gray-400 dark:text-dark-600 flex-shrink-0" :style="{ width: finalLabelWidth }">
      {{ label }}
    </span>
    <slot />
  </div>
</template>
