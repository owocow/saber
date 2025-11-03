<script lang="ts" setup>
import { fetchBatchDeleteUser, fetchGetDeptTree, fetchGetUserList, fetchUpdateUserStatus } from '@/service/api/system'
import { useLoading } from '@/packages/hooks'
import { jsonClone } from '@/packages/utils'
import { useTable } from '@/composables/use-table'
import { columns } from './model.tsx'

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
    pageSize: 1,
    pageSizes: [1, 2, 10, 100],
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

const selectedUsers = ref<any[]>([])
</script>
<template>
  <app-page title="用户管理" :sider-width="180">
    <!-- <template #sidebar>
      <el-tree
        :indent="8"
        :loading="treeLoading"
        class="h-full"
        item-size="40"
        :expand-on-click-node="false"
        :data="deptTree"
        @node-click="handleDepChoosed"
      />
    </template> -->
    <template #extra>
      <el-button @click="resetSearchParams" round>Back</el-button>
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
    <app-table
      :columns="columns"
      v-model:selected="selectedUsers"
      :show-selection="true"
      :loading="loading"
      :data="data"
      :pagination="pagination"
    >
      <!-- <template #header>
        <div class="font-bold text-lg">用户列表</div>
      </template> -->
      <template #tips>这里是一条没用的TIP</template>
    </app-table>
  </app-page>
</template>
