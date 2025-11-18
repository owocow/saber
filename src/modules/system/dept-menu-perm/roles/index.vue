<script lang="ts" setup>
import RoleForm from './mods/form.vue'
import DataScope from './mods/data-scope.vue'
import { fetchGetRoleList } from '@/service/api/system/role'
import { useTable } from '@/composables/use-table'
import { useLoading } from '@/packages/hooks'
import { columns, searchFormItems, roleSearchModel } from './model'
const { loading } = useLoading()
const { data, getData, pagination, resetSearchParams, updateSearchParams } = useTable({
  apiFn: fetchGetRoleList,
  apiParams: {
    roleName: null,
    roleKey: null,
    status: null,
    params: {},
  },
  paginConfig: {
    pageSize: 10,
    pageSizes: [10, 25, 50, 100],
  },
})

/**edit modals */
const formModal = ref(false)
const operationType = ref<'edit' | 'add'>('add')
const editRoleData = ref<Api.System.Role | null>(null)

function showEditionModal(row?: any) {
  formModal.value = true
  if (row) {
    editRoleData.value = row
    operationType.value = 'edit'
  } else {
    editRoleData.value = null
    operationType.value = 'add'
  }
}

/** Data Scope */
const dataScopeVisible = ref(false)
function showDataScopeModal(row: any) {
  editRoleData.value = row
  dataScopeVisible.value = true
}
</script>
<template>
  <div class="flex h-full flex-col">
    <div class="flex justify-between mb-5 flex-shrink-0">
      <app-search
        :search-options="searchFormItems"
        :search-model="roleSearchModel"
        @reset="resetSearchParams"
        @submit="updateSearchParams"
      />
      <saber-button btn-type="add" @click="showEditionModal()">添加角色</saber-button>
    </div>
    <app-table
      :data="data"
      :columns="columns(getData)"
      class="saber"
      :loading="loading"
      :actions-width="180"
      :pagination="pagination"
      @page-change="getData"
    >
      <template #actions="{ row }">
        <div class="saberBtnGroup flex gap-1.5 justify-end" v-if="row.roleId !== 1">
          <el-button size="small" circle class="saber" @click="showEditionModal(row)">
            <template #icon>
              <Icon icon="solar:pen-new-square-linear" />
            </template>
          </el-button>
          <el-button size="small" circle class="saber" @click="showDataScopeModal(row)">
            <template #icon>
              <Icon icon="solar:shield-keyhole-minimalistic-linear" />
            </template>
          </el-button>
          <el-button size="small" circle class="saber">
            <template #icon>
              <Icon icon="solar:trash-bin-trash-linear" />
            </template>
          </el-button>
        </div>
        <span v-else />
      </template>
    </app-table>
  </div>
  <role-form
    v-if="formModal"
    @submit="getData"
    v-model="formModal"
    :raw-data="editRoleData"
    :operationType="operationType"
  />
  <data-scope v-if="dataScopeVisible" v-model="dataScopeVisible" :raw-data="editRoleData" @submit="getData" />
</template>
