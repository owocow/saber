<script lang="ts" setup>
import { fetchBatchDeleteUser, fetchGetDeptTree, fetchGetUserList, fetchUpdateUserStatus } from '@/service/api/system'
import { useLoading } from '@/packages/hooks'
import { jsonClone } from '@/packages/utils'
defineOptions({ name: 'SystemUsers' })

const deptTree = ref<any[]>([])
const users = ref<any[]>([])
const { loading: treeLoading, startLoading: startTreeLoading, endLoading: endTreeLoading } = useLoading()
const { loading: usersLoading, startLoading: startUsersLoading, endLoading: endUsersLoading } = useLoading()

const initUsers = async (deptId?: CommonType.IdType) => {
  startUsersLoading()
  try {
    const { data: res } = await fetchGetUserList({ deptId, pageNum: 1, pageSize: 10 })
    users.value = jsonClone(res?.rows || [])
  } finally {
    endUsersLoading()
  }
}

onMounted(async () => {
  try {
    startTreeLoading()
    const { data } = (await fetchGetDeptTree()) || []
    deptTree.value = jsonClone(data || [])
  } finally {
    endTreeLoading()
  }

  initUsers()
})

function handleDepChoosed(node: any) {
  const { id } = node
  initUsers(id)
}
</script>
<template>
  <app-page-with-side>
    <template #aside>
      <el-tree
        :indent="8"
        :loading="treeLoading"
        class="h-full"
        item-size="40"
        :expand-on-click-node="false"
        :data="deptTree"
        @node-click="handleDepChoosed"
      />
    </template>
    <app-main title="用户管理">
      <template #extra>
        <el-button>批量删除</el-button>
      </template>
      <template #suffix>
        <el-button>新增用户</el-button>
      </template>
      <template #search>
        <el-input style="width: 300px" placeholder="请输入用户名/昵称/邮箱搜索" clearable />
      </template>
      <template #toolbar>
        <el-button>导出</el-button>
      </template>
      <el-table :data="users" style="width: 100%" :loading="usersLoading">
        <el-table-column prop="deptName" label="部门名称" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态" />
      </el-table>
    </app-main>
  </app-page-with-side>
</template>
