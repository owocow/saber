<script lang="ts" setup>
import { fetchBatchDeleteUser, fetchGetDeptTree, fetchGetUserList, fetchUpdateUserStatus } from '@/service/api/system'
import { useLoading } from '@/packages/hooks'
import { jsonClone } from '@/packages/utils'
import { useTable } from '@/composables/use-table'
import { reset } from 'mousetrap'
defineOptions({ name: 'SystemUsers' })

const deptTree = ref<any[]>([])
const { loading: treeLoading, startLoading: startTreeLoading, endLoading: endTreeLoading } = useLoading()
const { params, data, getData, loading, pagination, resetSearchParams } = useTable({
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
    pageSize: 3,
    pageSizes: [3, 5, 10, 20, 50, 100],
  },
})

onMounted(async () => {
  try {
    startTreeLoading()
    const { data } = (await fetchGetDeptTree()) || []
    deptTree.value = jsonClone(data || [])
  } finally {
    endTreeLoading()
  }
})

function handleDepChoosed(node: any) {
  const { id } = node
  resetSearchParams()
  params.deptId = id
  getData()
}
</script>
<template>
  <app-page title="用户管理" :sider-width="240">
    <template #sidebar>
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
    <el-table :data="data" style="width: 100%" :loading="loading">
      <el-table-column prop="deptName" label="部门名称" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态" />
    </el-table>
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      background
      :page-sizes="pagination.pageSizes"
      layout="total, prev, pager, next, sizes"
      :total="pagination.total"
      @size-change="pagination.sizeChange"
      @current-change="pagination.currentPageChange"
    />
  </app-page>
</template>
