<script lang="ts" setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue'
import { jsonClone } from '@/packages/utils'
import { userModel, getFormOptions } from './model'
import { ElNotification } from 'element-plus'
import { fetchCreateUser, fetchUpdateUser, fetchGetUserInfo } from '@/service/api/system'
import { useLoading } from '@/packages/hooks'
import { _sortAsc } from '@/utils/common'

/** Props */
interface Props {
  operationType: 'edit' | 'add'
  departments?: Api.Common.CommonTreeRecord
  deptId?: number | null
  userId?: number | string | null
}

const props = defineProps<Props>()
const { operationType, deptId, userId } = toRefs(props)

/** Emits and define models */
const emits = defineEmits(['submitted', 'closed'])
const visible = defineModel({ type: Boolean, default: false })

/** Modal标题 */
const modalTitle = computed(() => {
  return operationType.value === 'add' ? '添加新用户' : '编辑用户'
})

/** 数据项 */
const roles = ref<Array<any>>([])

/** 表单数据及基础 */
const getInitialFormData = () => ({
  ...jsonClone(userModel),
  ...(deptId?.value != null && { deptId: deptId.value }),
})

const userForm = reactive(getInitialFormData())
const userFormRef = ref<Saber.AppForm.FormInstance>()
const { loading, startLoading, endLoading } = useLoading()

/** 获取用户数据(仅编辑模式) */
const loadEditData = async () => {
  startLoading()
  try {
    const { data, error } = (await fetchGetUserInfo(userId.value || '/')) as any
    if (error) return

    const { user, roles: userRoles, roleIds } = data || {}
    roles.value = userRoles || []
    Object.assign(userForm, user, {
      roleIds: roleIds || [],
    })
  } finally {
    endLoading()
  }
}

/** 创建或编辑用户 */
const handleCreateUser = async () => {
  const valid = await userFormRef.value?.validate()
  if (!valid) return
  startLoading()
  try {
    const apiFn = operationType.value === 'add' ? fetchCreateUser : fetchUpdateUser
    const { error } = await apiFn(userForm)
    if (error) return
    ElNotification.success({
      title: '成功',
      message: operationType.value === 'add' ? '用户创建成功' : '用户修改成功',
    })
    emits('submitted')
    visible.value = false
  } finally {
    endLoading()
  }
}

/** 组件挂载时加载数据 */
onMounted(() => {
  loadEditData()
})
</script>

<template>
  <el-dialog modal-class="saber" width="560" append-to-body v-model="visible" align-center :title="modalTitle">
    <el-form label-position="top" status-icon size="large" :model="userForm" ref="userFormRef" :disabled="loading">
      <el-row :gutter="16">
        <template
          v-for="item in _sortAsc(getFormOptions({ roles, departments, operationType }))"
          :key="item.formItemConfig?.prop"
        >
          <el-col :span="item.span || 24">
            <FormItem v-bind="item" v-model="userForm[item.formItemConfig?.prop as keyof typeof userForm]" />
          </el-col>
        </template>
      </el-row>
    </el-form>

    <template #footer>
      <div class="flex justify-center gap-3">
        <el-button class="saber w-36" size="large" plain @click="visible = false" :disabled="loading"> 取消 </el-button>
        <el-button type="primary" class="w-36" size="large" @click="handleCreateUser" :loading="loading">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
