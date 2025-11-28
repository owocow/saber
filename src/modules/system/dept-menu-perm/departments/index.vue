<script lang="ts" setup>
import { fetchGetDeptList, fetchBatchDeleteDept } from '@/service/api/system/dept'
import DepartmentForm from './mods/form.vue'
import DeptLeader from './mods/dept-leader.vue'
import { type FilterNodeMethodFunction } from 'element-plus'
import { handleTree } from '@/utils/common'
import { useLoading } from '@/packages/hooks'
import { confirm } from '@/utils/message-box'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'DepartmentsList',
})

const treeData = ref<any[]>([])
const filterKey = ref('')
const treeRef = ref<any>()
const { loading, startLoading, endLoading } = useLoading()
const currentDept = ref<any>(null)
const createByScratch = ref<boolean>(false)

async function initials() {
  try {
    startLoading()
    const { data, error } = await fetchGetDeptList()
    if (error) return
    treeData.value = handleTree(data, { idField: 'deptId' })
  } finally {
    endLoading()
  }
}

initials()

/**部门点击 */
const handleDeptClick = (node: any) => {
  currentDept.value = node
}

/** 筛选 */
const filterNode: FilterNodeMethodFunction = (value: string, data: any) => {
  if (!value) return true
  return data.deptName.includes(value)
}
/** input handler */
watch(filterKey, val => {
  treeRef.value!.filter(val)
})

/** delete department */
const handleDeleteDept = async (data: any) => {
  if (!(await confirm('是否确认删除该部门？'))) return
  try {
    startLoading()
    const { error } = await fetchBatchDeleteDept([data.deptId])
    if (error) return
    ElMessage.success('删除成功')
    initials()
    currentDept.value = null
  } finally {
    endLoading()
  }
}

/** 添加 及 编辑 */
const formVisible = ref(false)
const operationType = ref<'add' | 'edit'>('add')
function handleShowFormModal(operType: 'add' | 'edit', byscratch?: boolean) {
  createByScratch.value = false
  if (byscratch) {
    createByScratch.value = true
  }
  formVisible.value = true
  operationType.value = operType
}

const handleSubmit = async () => {
  startLoading()
  await initials()
  currentDept.value = null
  endLoading()
}

/** 部门联系人 */
const leaderModal = ref(false)
</script>
<template>
  <div class="flex h-full overflow-hidden gap-8">
    <div
      class="w-[440px] h-full flex flex-col overflow-hidden rounded-2xl px-12 py-9 border border-gray-200 dark:border-dark-750 flex-shrink-0"
    >
      <div class="flex-shrink-0">
        <h4 class="text-lg font-bold mb-5 dark:text-dark-400 text-gray-500">部门列表</h4>
        <div class="flex justify-between mb-5">
          <el-input placeholder="请输入部门名称" v-model="filterKey" style="width: 230px" />
          <SaberButton btn-type="add" @click="handleShowFormModal('add', true)">添加部门</SaberButton>
        </div>
      </div>
      <el-scrollbar class="flex-1 -mr-4 pr-4">
        <el-tree
          ref="treeRef"
          class="saber"
          :loading="loading"
          highlight-current
          :expand-on-click-node="false"
          :data="treeData"
          :props="{ label: 'deptName' }"
          node-key="deptId"
          @node-click="handleDeptClick"
          default-expand-all
          :filter-node-method="filterNode"
        />
      </el-scrollbar>
    </div>
    <div class="flex-shrink-0 py-9 px-12 w-[450px] rounded-2xl relative border border-gray-200 dark:border-dark-750">
      <div v-if="currentDept" class="flex flex-col justify-between h-full">
        <div>
          <div class="h-[220px]">
            <div class="absolute right-12">
              <saber-status :status="currentDept?.status" size="small" />
            </div>

            <p class="text-[44px] mb-4 text-gray-400 dark:text-dark-600">
              <Icon icon="solar:buildings-linear" />
            </p>
            <h2 class="text-2xl font-bold mb-1">{{ currentDept?.deptName }}</h2>
            <p class="text-gray-400 dark:text-dark-600 text-sm" v-if="currentDept?.deptCategory">
              部门编码: {{ currentDept?.deptCategory }}
            </p>
            <div class="mb-8 mt-6">
              <dl class="flex gap-4 mb-2">
                <dt>部门电话:</dt>
                <dd>{{ currentDept?.phone }}</dd>
              </dl>
              <dl class="flex gap-4">
                <dt>部门邮箱:</dt>
                <dd>{{ currentDept?.email }}</dd>
              </dl>
            </div>
          </div>
          <div class="border border-gray-200 rounded-2xl p-6 bg-gray-50 dark:bg-dark-800/50 dark:border-dark-800">
            <div class="mb-4 flex justify-between">
              <span class="text-base">部门负责人</span>
              <saber-button size="small" v-if="currentDept?.leader" btn-type="edit" @click="leaderModal = true"
                >修改</saber-button
              >
              <saber-button size="small" v-else btn-type="add" @click="leaderModal = true">添加</saber-button>
            </div>
            <div v-if="currentDept?.leader">
              <dl class="flex gap-4 mb-2">
                <dt>姓名:</dt>
                <dd>mock</dd>
              </dl>
              <dl class="flex gap-4 mb-2">
                <dt>电话:</dt>
                <dd>18736164516</dd>
              </dl>
              <dl class="flex gap-4 mb-2">
                <dt>邮箱:</dt>
                <dd>33@qq.com</dd>
              </dl>
            </div>
            <SaberEmpty v-else icon="solar:black-hole-3-linear" note="暂无负责人" />
          </div>
        </div>
        <div class="flex justify-center">
          <saber-button btnType="add" :disabled="!currentDept" @click="handleShowFormModal('add')"
            >添加子部门</saber-button
          >
          <saber-button btnType="edit" :disabled="!currentDept" @click="handleShowFormModal('edit')">编辑</saber-button>
          <saber-button btnType="delete" @click="handleDeleteDept(currentDept)">删除</saber-button>
        </div>
      </div>
      <div v-else>
        <div class="text-center text-gray-400 dark:text-dark-600">
          <p class="mb-4">
            <Icon icon="solar:building-3-linear" style="font-size: 48px" />
          </p>
          <p class="mb-2 flex flex-col">
            <span class="text-4xl mb-3">👈</span>
            请选择左侧部门
          </p>
        </div>
      </div>
    </div>
  </div>
  <department-form
    v-if="formVisible"
    v-model="formVisible"
    :raw-data="currentDept"
    :operation-type="operationType"
    :create-by-scratch="createByScratch"
    @submit="handleSubmit"
  />
  <dept-leader v-if="leaderModal" v-model="leaderModal" :department="currentDept" @submit="handleSubmit" />
</template>
