<script lang="ts" setup>
import { dataScopeOptions } from '@/modules/system/enum'
import { ElNotification } from 'element-plus'
import { useLoading } from '@/packages/hooks'
import { fetchGetRoleDeptTreeSelect, fetchUpdateRoleDataScope } from '@/service/api/system/role'

defineOptions({
  name: 'DataScopeForm',
})

interface Props {
  rawData?: Api.System.Role | null
}
const props = defineProps<Props>()
const { loading, startLoading, endLoading } = useLoading()
/** Emits and define models */
const emits = defineEmits(['submit'])
const treeRef = ref<any>(null)
const visible = defineModel({ type: Boolean, default: false })
/** initial data */
const deptData = ref<Array<any>>([])
const deptChoosen = ref<Array<string | number>>([])
const dataScope = ref<string | null>(null)

/** 初始化数据 */
async function initialData() {
  if (!props.rawData) return
  startLoading()
  dataScope.value = props.rawData.dataScope
  try {
    const { error, data } = await fetchGetRoleDeptTreeSelect(props.rawData?.roleId!)
    if (error) return
    deptData.value = data?.depts || []
    deptChoosen.value = data?.checkedKeys || []
  } finally {
    endLoading()
  }
}

onMounted(async () => {
  await initialData()
})

/** 处理树形控件的选中状态变化 */
function handleTreeChange(_: any, selectedData: any) {
  const { checkedKeys } = selectedData
  deptChoosen.value = checkedKeys
}

/**submit */
async function handleSubmit() {
  if (!props.rawData) return
  startLoading()
  try {
    let payload = {
      roleId: props.rawData.roleId,
      dataScope: dataScope.value,
      deptIds: [] as CommonType.IdType[],
    }
    if (dataScope.value === '2') {
      payload.deptIds = deptChoosen.value
    }
    const { error } = await fetchUpdateRoleDataScope(payload as Api.System.RoleOperateParams)
    if (error) return
    ElNotification({
      type: 'success',
      title: '操作成功',
      message: '数据权限配置成功',
    })
    emits('submit')
    visible.value = false
  } finally {
    endLoading()
  }
}
</script>
<template>
  <saber-dialog v-model="visible" title="数据权限" width="480px">
    <div class="flex gap-4">
      <div
        class="text-4xl border size-[48px] flex items-center justify-center p-2 border-gray-300 dark:border-dark-600 flex-shrink-0 rounded-full mb-6"
      >
        <Icon icon="solar:user-id-linear" />
      </div>
      <div class="flex flex-col">
        <span class="text-lg mb-1">{{ rawData?.roleName }}</span>
        <div class="text-sm flex gap-4 text-gray-400 dark:text-dark-600">
          <span>角色字符串: </span><span>{{ rawData?.roleKey }}</span>
        </div>
      </div>
    </div>

    <el-form label-position="top">
      <el-form-item label="数据权限范围" size="large">
        <el-select :options="dataScopeOptions" clearable placeholder="请选择数据范围" v-model="dataScope" />
      </el-form-item>
      <el-form-item label="部门选择" v-if="dataScope === '2'">
        <el-scrollbar class="border border-gray-200 dark:border-dark-700 rounded-lg p-2 w-full h-[240px]">
          <el-tree
            :data="deptData"
            show-checkbox
            ref="treeRef"
            :default-checked-keys="deptChoosen"
            node-key="id"
            @check="handleTreeChange"
            style="height: 240px"
            default-expand-all
          />
        </el-scrollbar>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button class="saber w-32" @click="visible = false" size="large">取 消</el-button>
      <el-button type="primary" class="w-32" size="large" @click="handleSubmit">确 定</el-button>
    </template>
  </saber-dialog>
</template>
