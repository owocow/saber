<script lang="ts" setup>
import { useLoading } from '@/packages/hooks'
import { fetchCreateMenu, fetchUpdateMenu } from '@/service/api/system'
import { permformItems, menuModel } from './model'
import { ElNotification } from 'element-plus'
import pick from 'lodash-es/pick'
const visible = defineModel({ type: Boolean, default: false })
interface Props {
  operationType: 'create' | 'edit'
  rawData?: any
  editData?: any
}
const props = defineProps<Props>()
const emits = defineEmits(['submit'])
const { loading, startLoading, endLoading } = useLoading()

const modalTitle = computed(() => (props.operationType === 'create' ? '新增菜单|目录' : '编辑菜单|目录'))

/**form part */
const formRef = ref<Saber.AppForm.FormInstance>()
const menuForm = reactive({ ...menuModel })

/** 初始化 */
function intials() {
  if (!props.rawData) return
  menuForm.parentId = props.rawData.menuId || 0
  menuForm.menuType = 'F' // 强制为按钮类型
  if (props.operationType === 'edit' && props.editData) {
    Object.assign(menuForm, pick(props.editData, ['menuName', 'perms', 'status']))
  }
}

/** mounted 加载 */
onMounted(() => intials())

/** 提交表单 */
const handleSubmit = async () => {
  startLoading()
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    if (props.operationType === 'create') {
      const { error } = await fetchCreateMenu(menuForm)
      if (error) return
      ElNotification.success('按钮权限创建成功')
    } else {
      const { error } = await fetchUpdateMenu({ ...menuForm, menuId: props.editData?.menuId })
      if (error) return
      ElNotification.success('按钮权限更新成功')
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
  <saber-dialog v-model="visible" width="560px" :title="modalTitle">
    <div
      class="mb-6 flex gap-12 border border-gray-200 dark:border-dark-600 rounded-lg px-3 pt-2.5 bg-gray-50 dark:bg-dark-700"
    >
      <saber-info label="当前菜单: " label-width="70px">{{ props.rawData?.menuName }}</saber-info>
      <saber-info label="权限字符串: " label-width="80px">{{ props.rawData?.perms || '-' }}</saber-info>
    </div>
    <el-form label-position="top" status-icon size="large" :model="menuForm" ref="formRef" :disabled="loading">
      <el-row :gutter="16">
        <template v-for="item in permformItems" :key="item.formItemConfig?.prop">
          <el-col :span="item.span || 24">
            <FormItem
              v-bind="item"
              size="large"
              v-model="menuForm[item.formItemConfig?.prop as keyof typeof menuForm]"
            />
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <el-button class="w-32 saber" size="large" :disabed="loading" @click="visible = false">取 消</el-button>
      <el-button class="w-32" size="large" type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </saber-dialog>
</template>
