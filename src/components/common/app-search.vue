<script lang="ts" setup>
import { jsonClone } from '@/packages/utils'
import { getComponentByWhich } from '../forms/utils'
import { useRouteQuery } from '@vueuse/router'
interface AppSearchProps {
  searchOptions: Saber.AppForm.SearchFormItemType[] | (() => Saber.AppForm.SearchFormItemType[])
  searchModel: Record<string, any>
  transformFn?: (model: Record<string, any>) => Record<string, any>
  showSubmitBtn?: boolean
  syncToRoute?: boolean | string
}
const props = withDefaults(defineProps<AppSearchProps>(), {
  searchOptions: () => [],
  searchModel: () => ({}),
  showSubmitBtn: false,
  syncToRoute: false,
})

const emits = defineEmits(['change', 'submit', 'reset'])
const options = computed(() => {
  return typeof props.searchOptions === 'function' ? props.searchOptions() : props.searchOptions
})

// 修改 searchForm 的初始化逻辑
const searchForm = reactive<Record<string, any>>({})

// 初始化时，将 searchModel 中的每个 key 映射到 useRouteQuery
Object.keys(props.searchModel).forEach(key => {
  const defaultValue = props.searchModel[key]

  if (props.syncToRoute) {
    // useRouteQuery(key, defaultValue)
    // 注意：useRouteQuery 返回的是 Ref，需要通过 .value 访问，但在 reactive 中会自动解包
    // transform 选项用于处理类型转换，因为 URL 参数默认都是字符串

    // 简单的类型推断，如果默认值是数字，尝试转换回数字
    const isNumber = typeof defaultValue === 'number'

    searchForm[key] = useRouteQuery(key, defaultValue, {
      transform: val => {
        if (isNumber && val !== null) return Number(val)
        return val
      },
    })
  } else {
    searchForm[key] = defaultValue
  }
})

const resetForm = () => {
  // 重置时，直接赋值回默认值，useRouteQuery 会自动更新 URL
  const defaults = props.searchModel
  Object.keys(defaults).forEach(key => {
    searchForm[key] = defaults[key]
  })
  emits('reset')
  // 重置后通常也需要触发一次搜索，让列表更新
  handleSubmit()
}

const handleChange = (prop: string, value: any) => {
  emits('change', { prop, value })
  const _form = jsonClone(searchForm)
  emits('submit', props.transformFn ? props.transformFn(_form) : _form)
}
const handleSubmit = () => {
  const _form = jsonClone(searchForm)
  emits('submit', props.transformFn ? props.transformFn(_form) : _form)
}

const disableReset = computed(() => {
  return Object.keys(props.searchModel).every(key => {
    const modelValue = props.searchModel[key]
    const formValue = searchForm[key]

    // 判断是否为空值
    const isEmpty = (val: any) => {
      if (val === null || val === undefined || val === '') return true
      if (Array.isArray(val) && val.length === 0) return true
      return false
    }

    // 两个都是空值,视为相等
    if (isEmpty(modelValue) && isEmpty(formValue)) {
      return true
    }

    // 数组需要深度比较
    if (Array.isArray(modelValue) && Array.isArray(formValue)) {
      return JSON.stringify(modelValue) === JSON.stringify(formValue)
    }

    // 其他情况正常比较
    return modelValue === formValue
  })
})
</script>
<template>
  <div class="flex flex-wrap gap-2">
    <slot name="prepend" />
    <div class="flex-shrink-0" v-for="{ which, prop, slots, ...rest } in options">
      <component
        :is="getComponentByWhich(which)"
        v-model="searchForm[prop]"
        v-bind="rest"
        @change="handleChange(prop, searchForm[prop])"
      >
        <template v-for="(slotConfig, slotName) in slots" :key="slotName" #[slotName]>
          <component v-if="slotConfig.render" :is="() => slotConfig.render!(h)" />
          <component v-else-if="slotConfig.component" :is="slotConfig.component" v-bind="slotConfig.props || {}" />
          <template v-else>{{ slotConfig.text }}</template>
        </template>
      </component>
    </div>
    <el-button class="saber" :disabled="disableReset" @click="resetForm">重置</el-button>
    <div v-if="showSubmitBtn">
      <el-button class="saber" type="primary" @click="handleSubmit">搜索</el-button>
    </div>
    <slot name="append" />
  </div>
</template>
