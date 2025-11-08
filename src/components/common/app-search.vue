<script lang="ts" setup>
import { jsonClone } from '@/packages/utils'
import { getComponentByWhich } from '../forms/utils'
interface AppSearchProps {
  searchOptions: Saber.AppForm.SearchFormItemType[] | (() => Saber.AppForm.SearchFormItemType[])
  searchModel: Record<string, any>
  transformFn?: (model: Record<string, any>) => Record<string, any>
  showSubmitBtn?: boolean
}
const props = withDefaults(defineProps<AppSearchProps>(), {
  searchOptions: () => [],
  searchModel: () => ({}),
  showSubmitBtn: false,
})

const emits = defineEmits(['change', 'submit', 'reset'])
const options = computed(() => {
  return typeof props.searchOptions === 'function' ? props.searchOptions() : props.searchOptions
})

const searchForm = reactive<Record<string, any>>({ ...jsonClone(props.searchModel) })

const resetForm = () => {
  Object.assign(searchForm, jsonClone(props.searchModel))
  emits('reset')
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
    return props.searchModel[key] === searchForm[key]
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
    <div>
      <el-button class="saber" @click="resetForm">重置</el-button>
    </div>
    <div v-if="showSubmitBtn">
      <el-button class="saber" type="primary" @click="handleSubmit">搜索</el-button>
    </div>
    <slot name="append" />
  </div>
</template>
