<script lang="ts" setup>
import { fetchGetDeptUserList } from '@/service/api/system'
import { fetchUpdateDept } from '@/service/api/system/dept'
import { ElMessage } from 'element-plus'
defineOptions({ name: 'DeptLeader' })
import { useLoading } from '@/packages/hooks'
/** Props */
interface Props {
  department?: Api.System.Dept | null
}
const props = defineProps<Props>()
const emits = defineEmits(['submit'])
const visible = defineModel({ type: Boolean, default: false })
const leaderId = ref<number | null>(null)
const userList = ref<any>([])
const { loading, startLoading, endLoading } = useLoading()
const userOptions = computed(() => {
  return userList.value.map((user: any) => ({
    label: user?.nickName || user?.userName,
    value: user?.userId,
  }))
})

const initials = async () => {
  if (!props.department) return
  const { deptId, leader } = props.department
  leaderId.value = leader
  startLoading()
  const { error, data } = await fetchGetDeptUserList(deptId)
  if (error) return
  userList.value = data
  try {
  } finally {
    endLoading()
  }
}

onMounted(() => initials())
const handleSubmit = async () => {
  if (!leaderId.value || !props.department) return
  const payload = { ...props.department, leader: leaderId.value }
  try {
    startLoading()
    const { error } = await fetchUpdateDept(payload)
    if (error) return
    ElMessage.success('更新部门负责人成功')
    visible.value = false
    emits('submit')
  } finally {
    endLoading()
  }
}
</script>
<template>
  <saber-dialog width="560px" v-model="visible" title="部门负责人">
    <h2 class="mb-4">当前部门: {{ department?.deptName }}</h2>
    <el-form-item label-position="top" label="部门负责人" size="large">
      <el-select :disabled="loading" placeholder="请选择联系人" :options="userOptions" clearaable v-model="leaderId" />
    </el-form-item>
    <template #footer>
      <el-button class="saber w-32" @click="visible = false" :loading="loading" size="large">取 消</el-button>
      <el-button type="primary" class="w-32" size="large" :loading="loading" :disabled="!leaderId" @click="handleSubmit"
        >确 定</el-button
      >
    </template>
  </saber-dialog>
</template>
