<script lang="ts" setup>
import { useLoading } from '@/packages/hooks'
import { ElNotification, type FormProps } from 'element-plus'
import SaberDialog from '@/components/common/saber-dialog.vue'
import SaberDrawer from '@/components/common/saber-drawer.vue'
import FormItem from '@/components/forms/form-item.vue'
import { _sortAsc } from '@/utils/common'
import pick from 'lodash-es/pick'

interface FormConfig {
  formItems?: Array<Saber.AppForm.FormItemType>
  formModel?: Record<string, any>
  createApi?: (data: Record<string, any>) => Promise<any>
  updateApi?: (data: Record<string, any>) => Promise<any>
  extraEditKeys?: string[]
}

interface Props {
  type: 'dialog' | 'drawer'
  data?: Record<string, any>
  formConfig: FormConfig
  titleBase: string
  operationType?: 'edit' | 'create'
  formProps?: Partial<FormProps>
  modalSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  operationType: 'create',
  formProps: () => ({
    labelPosition: 'top',
    labelWidth: '100px',
    size: 'large',
  }),
  modalSize: 560,
})

const emits = defineEmits(['submit'])
const visible = defineModel({ type: Boolean, default: false })
const formRef = ref<Saber.AppForm.FormInstance>()
const componentName = computed(() => (props.type === 'dialog' ? SaberDialog : SaberDrawer))
const isEdit = computed(() => props.operationType === 'edit')
const title = computed(() => (isEdit.value ? `编辑${props.titleBase}` : `添加${props.titleBase}`))
const { loading, startLoading, endLoading } = useLoading()

// 初始化表单数据
const form = reactive({
  ...props.formConfig.formModel,
})

// 监听编辑数据变化，自动填充表单
watchEffect(() => {
  if (isEdit.value && props.data) {
    const keysToPick = Object.keys(props.formConfig.formModel || {}).concat(props.formConfig.extraEditKeys || [])
    const initData = pick(props.data, keysToPick)
    Object.assign(form, initData)
  }
})

/** 提交表单 */
const handleSubmit = async () => {
  startLoading()
  try {
    console.log('表单数据：', form)
    console.log('operationType:', props.operationType)
    const isValid = await formRef.value?.validate()
    if (!isValid) return
    let response: any
    // 根据操作类型调用对应的 API
    if (isEdit.value && props.formConfig.updateApi) {
      response = await props.formConfig.updateApi(form)
    } else if (!isEdit.value && props.formConfig.createApi) {
      response = await props.formConfig.createApi(form)
    } else {
      console.error('未配置对应的 API 方法')
      return
    }
    const { error } = response
    if (error) return
    // 成功提示
    ElNotification({
      type: 'success',
      title: '成功提示',
      message: isEdit.value ? `${props.titleBase}更新成功` : `${props.titleBase}创建成功`,
    })
    // 触发提交事件
    emits('submit', form)
    visible.value = false
  } catch (error) {
    return
  } finally {
    endLoading()
  }
}
</script>

<template>
  <component
    :is="componentName"
    v-model="visible"
    :title="title"
    :size="type === 'drawer' ? modalSize : undefined"
    :width="type === 'dialog' ? `${modalSize}px` : undefined"
  >
    <el-form :model="form" ref="formRef" v-bind="formProps" :disabled="loading">
      <el-row :gutter="16">
        <template v-for="item in _sortAsc(formConfig?.formItems || [])" :key="item.formItemConfig?.prop">
          <el-col :span="item.span || 24">
            <FormItem v-bind="item" v-model="form[item.formItemConfig?.prop as keyof typeof form]" />
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <el-button class="saber w-32" size="large" @click="visible = false" :disabled="loading">取 消</el-button>
      <el-button type="primary" class="w-32" size="large" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </component>
</template>
