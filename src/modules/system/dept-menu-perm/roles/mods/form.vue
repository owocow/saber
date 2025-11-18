<script lang="ts" setup>
import { formItems, roleModel } from './model'
import { ElNotification } from 'element-plus'
import { useLoading } from '@/packages/hooks'
import { fetchCreateRole, fetchUpdateRole } from '@/service/api/system/role'
import { fetchGetRoleMenuTreeSelect } from '@/service/api/system'
import { fetchGetMenuTreeSelect } from '@/service/api/system/menu'
/** Props */
interface Props {
  operationType: 'edit' | 'add'
  rawData?: Api.System.Role | null
}
const props = defineProps<Props>()

/** Emits and define models */
const emits = defineEmits(['submit'])
const visible = defineModel({ type: Boolean, default: false })

/** Modal标题 */
const modalTitle = computed(() => {
  return props.operationType === 'add' ? '添加新角色' : '编辑角色'
})
const roleForm = reactive({ ...roleModel })
const defaultCheckedKeys = ref<Array<string | number>>([])
const roleFormRef = ref<Saber.AppForm.FormInstance>()
const treeRef = ref<any>(null)
const treeData = ref<Array<any>>([])
const { loading, startLoading, endLoading } = useLoading()

/** 获取用户数据(仅编辑模式) */
const loadEditData = async () => {
  startLoading()
  if (props.operationType !== 'edit' || !props.rawData) {
    try {
      const { data, error } = (await fetchGetMenuTreeSelect()) as any
      if (error) return
      treeData.value = data || []
    } finally {
      endLoading()
    }
  } else {
    try {
      const { data, error } = (await fetchGetRoleMenuTreeSelect(props.rawData?.roleId)) as any
      if (error) return
      Object.assign(roleForm, props.rawData)
      treeData.value = data.menus || []
      defaultCheckedKeys.value = data.checkedKeys || []
    } finally {
      endLoading()
    }
  }
}

onMounted(async () => {
  await loadEditData()
})

async function handleSubmit() {
  const isValid = await roleFormRef.value?.validate()
  if (!isValid) return

  startLoading()
  try {
    let response: any
    if (props.operationType === 'add') {
      response = await fetchCreateRole(roleForm)
    } else {
      response = await fetchUpdateRole(roleForm)
    }
    const { error } = response
    if (error) return

    ElNotification({
      type: 'success',
      title: '操作成功',
      message: props.operationType === 'add' ? '角色创建成功' : '角色更新成功',
    })
    emits('submit')
    visible.value = false
  } finally {
    endLoading()
  }
}
/** 处理树形控件的选中状态变化 */
function handleTreeChange(_: any, selectedData: any) {
  const { checkedKeys } = selectedData
  roleForm.menuIds = checkedKeys
}
</script>
<template>
  <saber-drawer v-model="visible" size="560" :title="modalTitle">
    <el-form label-position="top" status-icon :model="roleForm" ref="roleFormRef" :disabled="loading">
      <el-row :gutter="16">
        <template v-for="item in formItems" :key="item.formItemConfig?.prop">
          <el-col :span="item.span || 24">
            <FormItem
              v-bind="item"
              size="large"
              v-model="roleForm[item.formItemConfig?.prop as keyof typeof roleForm]"
            />
          </el-col>
        </template>
        <el-col :span="24">
          <el-form-item label="菜单权限" prop="menuIds">
            <el-scrollbar class="border border-gray-200 dark:border-dark-700 rounded-lg p-2 w-full">
              <el-tree
                ref="treeRef"
                style="height: 280px"
                :data="treeData"
                show-checkbox
                @check="handleTreeChange"
                :default-checked-keys="defaultCheckedKeys"
                size="small"
                node-key="id"
                highlight-current
              />
            </el-scrollbar>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input size="large" v-model="roleForm.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button class="saber w-32" @click="visible = false" size="large">取 消</el-button>
      <el-button type="primary" class="w-32" size="large" @click="handleSubmit">确 定</el-button>
    </template>
  </saber-drawer>
</template>
