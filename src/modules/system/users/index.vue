<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Form from './mods/form.vue'
import ResetPassword from './mods/reset-password.vue'
import { fetchBatchDeleteUser, fetchGetDeptTree, fetchGetUserList } from '@/service/api/system'
import { useLoading } from '@/packages/hooks'
import { jsonClone } from '@/packages/utils'
import { useTable } from '@/composables/use-table'
import { columns, meta, searchFormItems, userSearchModel } from './model.tsx'
import { ElMessage } from 'element-plus'
import { useMessageBox } from '@/composables/use-message-box'
defineOptions({ name: 'SystemUsers' })

/** 部门树相关 */
const deptTree = ref<any[]>([])
const { loading: treeLoading, startLoading: startTreeLoading, endLoading: endTreeLoading } = useLoading()
const { confirm } = useMessageBox()

/** 表格相关 */
const { data, getData, loading, pagination, resetSearchParams, updateSearchParams } = useTable({
  apiFn: fetchGetUserList,
  apiParams: {
    deptId: null,
    userName: null,
    nickName: null,
    phonenumber: null,
    status: null,
    params: {},
  },
  paginConfig: {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  },
})

const selectedUsers = ref<any[]>([])

/** 表单弹窗相关 */
const currentUserId = ref<number | string>()
const formVisible = ref(false)
const operationType = ref<'edit' | 'add'>('add')
const formDeptId = ref<number | null>(null)
const currentDeptName = ref<string | null>(null)

/** 初始化加载部门树 */
const loadDeptTree = async () => {
  try {
    startTreeLoading()
    const { data: treeData } = (await fetchGetDeptTree()) || {}
    deptTree.value = jsonClone(treeData || [])
  } catch (error) {
    console.error('加载部门树失败:', error)
  } finally {
    endTreeLoading()
  }
}

/** 部门节点点击 */
const handleDeptClick = (node: any) => {
  updateSearchParams({ deptId: node.id })
  formDeptId.value = node.id
  currentDeptName.value = node.label
}

/** 显示表单弹窗 */
function handleShowFormModal(row?: any, resetPwd?: boolean) {
  if (resetPwd) {
    resetPasswordVisible.value = true
    currentUserId.value = row?.userId
    return
  }
  operationType.value = row ? 'edit' : 'add'
  currentUserId.value = row?.userId
  formVisible.value = true
}

/** 表单提交成功回调 */
const handleFormSubmitted = () => {
  getData()
  formVisible.value = false
}

/** 删除用户 */
const handleDeleteUser = async (row: any) => {
  try {
    await confirm('输入框的校验函数。 应该返回一个 boolean 或者 string， 如果返回的是一个 string 类型', '删除提醒')
    const { error } = await fetchBatchDeleteUser([row.userId])
    if (!error) {
      ElMessage.success('删除成功')
      getData()
    }
  } catch {
    // 用户取消操作
  }
}

/** 批量删除用户 */
const handleBatchDelete = async () => {
  if (selectedUsers.value.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }

  try {
    await confirm(`确定要删除选中的 ${selectedUsers.value.length} 个用户吗?`, '删除提醒', { type: 'warning' })
    const userIds = selectedUsers.value.map(user => user.userId)
    const { error } = await fetchBatchDeleteUser(userIds)
    if (!error) {
      ElMessage.success('批量删除成功')
      selectedUsers.value = []
      getData()
    }
  } catch {
    // 用户取消操作
  }
}

/** 刷新数据 */
const handleRefresh = () => {
  getData()
}

/** 组件挂载 */
onMounted(() => {
  loadDeptTree()
})

/** 重置密码弹窗相关 */
const resetPasswordVisible = ref(false)
const handleResetPasswordSubmitted = () => {
  resetPasswordVisible.value = false
  ElMessage.success('密码重置成功')
}

/** 搜索 biz */
</script>

<template>
  <app-page title="用户管理" :sider-width="180">
    <!-- 侧边栏 - 部门树 -->
    <template #sidebar>
      <div class="h-full flex flex-col">
        <h4 class="font-bold text-base mb-3">部门列表</h4>
        <div class="flex-1 -ml-2 overflow-auto">
          <el-tree
            :indent="8"
            :loading="treeLoading"
            class="h-full"
            item-size="40"
            highlight-current
            :expand-on-click-node="false"
            :data="deptTree"
            node-key="id"
            default-expand-all
            @node-click="handleDeptClick"
          />
        </div>
      </div>
    </template>
    <template #extra v-if="currentDeptName">{{ currentDeptName }}</template>
    <!-- 页面操作按钮 -->
    <template #suffix>
      <el-button class="saber" @click="handleShowFormModal()">
        <template #icon>
          <Icon icon="solar:add-circle-linear" />
        </template>
        新增用户
      </el-button>
    </template>

    <!-- 搜索区域 -->
    <template #search>
      <app-search
        :search-options="searchFormItems"
        :search-model="userSearchModel"
        @reset="resetSearchParams"
        @submit="updateSearchParams"
      />
    </template>

    <!-- 工具栏 -->
    <template #toolbar>
      <div class="saberBtnGroup flex gap-2">
        <el-button class="saber" :disabled="selectedUsers.length === 0" @click="handleBatchDelete">
          <template #icon>
            <Icon icon="solar:trash-bin-trash-linear" />
          </template>
          批量删除
        </el-button>
        <el-button class="saber" :loading="loading" @click="handleRefresh">
          <template #icon>
            <Icon icon="solar:refresh-linear" />
          </template>
          刷新
        </el-button>
      </div>
    </template>

    <!-- 表格 -->
    <app-table
      v-model:selected="selectedUsers"
      :columns="columns(getData)"
      :show-selection="true"
      :loading="loading"
      :data="data"
      :actionsWidth="180"
      :pagination="pagination"
      :meta="meta"
    >
      <!-- 操作列 -->
      <template #actions="{ row }">
        <div class="saberBtnGroup flex gap-1.5 justify-end" v-if="row.userId !== 1">
          <el-button size="small" circle class="saber" @click="handleShowFormModal(row)">
            <template #icon>
              <Icon icon="solar:pen-new-square-linear" />
            </template>
          </el-button>
          <el-button size="small" circle class="saber" @click="handleShowFormModal(row, true)">
            <template #icon>
              <Icon icon="solar:password-minimalistic-input-linear" />
            </template>
          </el-button>
          <el-button size="small" circle class="saber" @click="handleDeleteUser(row)">
            <template #icon>
              <Icon icon="solar:trash-bin-trash-linear" />
            </template>
          </el-button>
        </div>
        <span v-else />
      </template>
    </app-table>
  </app-page>

  <!-- 表单弹窗 -->
  <Form
    v-if="formVisible"
    v-model="formVisible"
    :userId="currentUserId"
    :operationType="operationType"
    :departments="deptTree"
    :dept-id="formDeptId"
    @submitted="handleFormSubmitted"
  />
  <!-- 重置密码弹窗 -->
  <ResetPassword
    v-if="resetPasswordVisible"
    v-model="resetPasswordVisible"
    :userId="currentUserId"
    @submitted="handleResetPasswordSubmitted"
  />
</template>
