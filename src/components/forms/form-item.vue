<script lang="ts" setup>
import { type ComponentMapKey, getComponentByWhich } from './utils'
import { h } from 'vue'

defineOptions({ name: 'SaberFormItem', inheritAttrs: false })

// 只声明必要的 props，不要继承过多的类型
interface SaberFormItemProps {
  formItemConfig?: Partial<Saber.AppForm.FormItemConfig>
  which: ComponentMapKey
  slots?: Record<
    string,
    {
      text?: string
      component?: any
      props?: any
      render?: (h: typeof import('vue').h) => any
    }
  >
  span?: number
  orderNum?: number
}

const model = defineModel({ type: [String, Number, Array, Object, Boolean], default: '' })

const props = withDefaults(defineProps<SaberFormItemProps>(), {
  formItemConfig: () => ({
    label: '',
  }),
})

// 简化过滤逻辑，只过滤明确声明的 props
const componentAttrs = computed(() => {
  const attrs = useAttrs()
  const { formItemConfig, which, span, slots, orderNum, ...rest } = attrs
  return rest
})

const currentComponent = computed(() => getComponentByWhich(props.which))
</script>

<template>
  <el-form-item v-bind="{ ...formItemConfig }" class="flex-shrink-0 saber" style="width: 100%">
    <template #label>
      <span class="inline-flex gap-2 items-baseline">
        <em class="not-italic flex-shrink-0">{{ formItemConfig.label }}</em>
        <cite class="not-italic text-[12px] opacity-50">{{ formItemConfig.sub }}</cite>
      </span>
    </template>
    <component :is="currentComponent" v-model="model" v-bind="componentAttrs">
      <template v-for="(slotConfig, slotName) in slots" :key="slotName" #[slotName]>
        <component v-if="slotConfig.render" :is="() => slotConfig.render!(h)" />
        <component v-else-if="slotConfig.component" :is="slotConfig.component" v-bind="slotConfig.props || {}" />
        <template v-else>{{ slotConfig.text }}</template>
      </template>
    </component>
  </el-form-item>
</template>
