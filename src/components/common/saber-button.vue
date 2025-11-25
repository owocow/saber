<script setup lang="ts">
defineOptions({ name: 'SaberButton' })
interface Props {
  icon?: string
  iconSize?: number
  btnType?: 'edit' | 'delete' | 'add' | 'search' | 'refresh' | 'save' | 'back' | 'forward' | 'confirm' | 'cancel'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
}
const props = withDefaults(defineProps<Props>(), {
  iconSize: 20,
})

const iconMap: Record<string, string> = {
  edit: 'solar:pen-new-square-linear',
  delete: 'solar:trash-bin-trash-linear',
  add: 'ep:plus',
  search: 'solar:minimalistic-magnifer-linear',
  refresh: 'solar:refresh-linear',
  save: 'solar:check-read-linear',
  back: 'solar:arrow-left-linear',
  forward: 'solar:arrow-right-linear',
  confirm: 'ep:check',
  cancel: 'ep:close',
}

const iconName = computed(() => {
  if (props.icon) {
    return props.icon
  }
  return props.btnType ? iconMap[props.btnType] : null
})
</script>
<template>
  <el-button :class="type ? '' : 'saber'" v-bind="$attrs" :type="type">
    <template #icon v-if="iconName">
      <slot name="icon">
        <Icon :icon="iconName" :style="{ fontSize: iconSize + 'px' }" />
      </slot>
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </el-button>
</template>
