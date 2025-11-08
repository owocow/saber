<script lang="ts" setup>
defineOptions({ name: 'SaberRadios', inheritAttrs: false })
type RadioProps = import('element-plus').RadioProps
interface SaberCheckboxProps {
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  raidioConfig?: Partial<RadioProps>
  [key: string]: any
}
withDefaults(defineProps<SaberCheckboxProps>(), {
  options: () => [],
})
const model = defineModel({ type: [String, Number, Array, Object, Boolean], default: '' })

const radioGroupAttrs = computed(() => {
  const { raidioConfig, options, ...rest } = useAttrs()
  return rest
})
</script>
<template>
  <el-radio-group v-bind="radioGroupAttrs" v-model="model">
    <template v-if="radioGroupAttrs.type === 'button'">
      <el-radio-button
        v-for="item in options"
        v-bind="{ ...raidioConfig }"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="item in options"
        v-bind="{ ...raidioConfig }"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>
