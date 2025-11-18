<script lang="ts" setup>
import { fetchGetExcludeDeptList, fetchGetDeptList, fetchCreateDept, fetchUpdateDept } from '@/service/api/system/dept'
import { handleTree } from '@/utils/common'
import { useLoading } from '@/packages/hooks'
import { departmentModel, getFormItems } from './model'
import pick from 'lodash-es/pick'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'DepartmentForm' })
interface Props {
  rawData?: Api.System.Dept | null
  operationType?: 'add' | 'edit'
  createByScratch?: boolean
}
/** props and emits */
const props = defineProps<Props>()
const emits = defineEmits(['submit'])
const visible = defineModel({ type: Boolean, default: false })
/** form data and refs */
const deptFormRef = ref<Saber.AppForm.FormInstance>()
const { loading, startLoading, endLoading } = useLoading()
const deptForm = reactive({ ...departmentModel })

const modalTitle = computed(() => {
  return props.operationType === 'add' ? '添加部门' : '编辑部门'
})

const deptTree = ref<Array<any>>([])

const initialData = async () => {
  try {
    startLoading()
    /** 如果是新建 */
    if (props.operationType === 'add') {
      const { data, error } = await fetchGetDeptList()
      if (error) return
      deptTree.value = handleTree(data, { idField: 'deptId' })
      if (!props.createByScratch && props.rawData) {
        const { deptId } = props.rawData
        deptForm.parentId = deptId
      }
    } else {
      /** 如果是编辑 */
      if (props.rawData) {
        const { deptId } = props.rawData
        const { data, error } = await fetchGetExcludeDeptList(deptId)
        if (error) return
        deptTree.value = handleTree(data, { idField: 'deptId' })
        const deptData = pick(props.rawData, Object.keys(departmentModel))
        Object.assign(deptForm, deptData)
      }
    }
  } finally {
    endLoading()
  }
}
onMounted(() => initialData())

/** submit */
async function handleSubmit() {
  startLoading()
  try {
    const valid = await deptFormRef.value?.validate()
    if (!valid) return
    if (props.operationType === 'add') {
      const { error } = await fetchCreateDept(deptForm)
      if (error) return
      ElMessage.success('添加成功')
    } else if (props.operationType === 'edit') {
      const data = { ...deptForm, deptId: props.rawData?.deptId }
      const { error } = await fetchUpdateDept(data)
      if (error) return
      ElMessage.success('更新成功')
    }
    emits('submit')
    visible.value = false
  } catch (error) {
    return
  } finally {
    endLoading()
  }
}
</script>
<template>
  <saber-dialog v-model="visible" width="560px" :title="modalTitle" :loading="loading">
    <el-form label-position="top" status-icon size="large" :model="deptForm" ref="deptFormRef" :disabled="loading">
      <el-row :gutter="16">
        <template v-for="item in getFormItems({ departments: deptTree })" :key="item.formItemConfig?.prop">
          <el-col :span="item.span || 24">
            <FormItem
              v-bind="item"
              size="large"
              v-model="deptForm[item.formItemConfig?.prop as keyof typeof deptForm]"
            />
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <el-button class="saber w-32" @click="visible = false" size="large">取 消</el-button>
      <el-button type="primary" class="w-32" size="large" @click="handleSubmit">确 定</el-button>
    </template>
  </saber-dialog>
</template>
