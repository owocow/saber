<script lang="ts" setup>
defineOptions({ name: 'SaberStatus' })
interface Props {
  disabledValue?: string | number
  enabledValue?: string | number
  disabledText?: string
  enabledText?: string
  size?: 'small' | 'medium' | 'large'
  status: string | number
}

const props = withDefaults(defineProps<Props>(), {
  disabledValue: '1',
  enabledValue: '0',
  disabledText: '已停用',
  enabledText: '正常',
})

const label = computed(() => {
  return props.status === props.enabledValue ? props.enabledText : props.disabledText
})

const sizeMap = {
  small: 'text-sm px-2.5 pt-[2px] pb-[3px]',
  medium: 'text-base px-4 pt-[5px] pb-[6px]',
  large: 'text-lg px-4 pt-[7px] pb-[8px]',
}

const size = computed(() => {
  return sizeMap[props.size || 'small']
})

const statusClassMap = {
  [props.enabledValue!]: 'border-teal-500 text-teal-500 bg-teal-500/5',
  [props.disabledValue!]: 'border-gray-300 text-gray-400 dark:border-dark-750 dark:text-dark-700',
}
const statusClass = computed(() => {
  return statusClassMap[props.status]
})
</script>
<template>
  <div :class="[`border border-gray-200 rounded-full  text-gray-400`, size, statusClass]">
    {{ label }}
  </div>
</template>
