<script lang="ts" setup>
defineOptions({ name: 'SaberCheckbox' })
interface SaberCheckboxProps<S = string, N = number> {
  title?: S
  popWidth?: N
  icon?: S
  iconSize?: N
  options?: Array<{ label: S; value: any }>
}
const props = withDefaults(defineProps<SaberCheckboxProps>(), {
  title: '',
  popWidth: 150,
  options: () => [],
})

const model = defineModel({ type: Array<any>, default: () => [] })
const emits = defineEmits(['change'])

const selectedOptions = computed(() => {
  return props.options.filter(option => model.value.includes(option.value))
})

const classes = [
  'border-1',
  'border-dashed',
  'h-[32px]',
  'dark:hover:border-dark-400',
  'flex-shrink-0',
  'bg-white',
  'border-gray-300',
  'dark:border-dark-450',
  'rounded-[8px]',
  'pl-3',
  'pr-[3px]',
  'flex',
  'items-center',
  'dark:hover:bg-transparent',
  'dark:bg-transparent',
  'transition-all',
  'cursor-pointer',
  'gap-2',
  'transition-all',
  'hover:border-gray-400',
  'dark:hover:border-dark-400',
]
</script>
<template>
  <el-popover
    trigger="click"
    transition="slide-up"
    :show-arrow="false"
    placement="bottom"
    :width="popWidth || 160"
    :offset="8"
  >
    <template #reference>
      <div v-bind="$attrs" :class="classes">
        <el-icon v-if="icon" :size="iconSize || 15">
          <Icon :icon="icon" />
        </el-icon>
        <span class="">{{ title }}</span>
        <span class="w-[1px] h-[12px] bg-gray-300 dark:bg-dark-500" v-if="selectedOptions.length" />
        <div class="flex items-center gap-1">
          <span
            class="bg-gray-200 h-[24px] dark:bg-dark-600 flex items-center px-2 rounded-sm flex-shrink-0"
            v-if="selectedOptions.length > 2"
            >已选: {{ selectedOptions.length }}项</span
          >
          <template v-else>
            <span
              v-for="item in selectedOptions"
              class="bg-gray-200 h-[24px] dark:bg-dark-600 flex items-center px-2 rounded-sm flex-shrink-0"
              >{{ item.label }}</span
            >
          </template>
        </div>
      </div>
    </template>

    <el-checkbox-group v-model="model" @change="emits('change', model)">
      <div class="flex flex-col -m-[8px]">
        <label
          v-for="option in options"
          :key="option.value"
          class="hover:bg-gray-100 dark:hover:bg-dark-600 px-2 rounded cursor-pointer"
        >
          <el-checkbox :style="{ 'font-weight': 'normal' }" :label="option.label" :value="option.value" />
        </label>
      </div>
    </el-checkbox-group>
  </el-popover>
</template>
