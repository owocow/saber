<script setup lang="ts">
import { getColumns, formItems, noticeModel, searchModel, searchFormItems } from './model'
import {
  fetchBatchDeleteNotice,
  fetchGetNoticeList,
  fetchCreateNotice,
  fetchUpdateNotice,
} from '@/service/api/system/notice'
import { confirm } from '@/utils/message-box'
import { ElMessage } from 'element-plus'
import { useTable } from '@/composables/use-table'
import FormModal from '@/components/biz/form-modal/index.vue'
const selectedNotices = ref<any[]>([])

const { data, getData, loading, startLoading, endLoading, pagination, resetSearchParams, updateSearchParams } =
  useTable({
    apiFn: fetchGetNoticeList,
    apiParams: {
      noticeTitle: null,
      noticeType: null,
    },
    paginConfig: {},
  })

/** 删除通知公告（支持单个和批量） */
const handleDeleteNotice = async (row?: any) => {
  const noticeIds = row ? [row.noticeId] : selectedNotices.value.map(notice => notice.noticeId)
  const message = row
    ? '请确认是否要删除此通知公告？'
    : `确定要删除选中的 ${selectedNotices.value.length} 个通知公告吗?`

  const confirmed = await confirm(message)
  if (!confirmed) return

  try {
    startLoading()
    const { error } = await fetchBatchDeleteNotice(noticeIds)
    if (!error) {
      ElMessage.success('删除成功')
      if (row) {
        // 单个删除时，从已选中列表中移除该条目
        const index = selectedNotices.value.findIndex(notice => notice.noticeId === row.noticeId)
        if (index > -1) {
          selectedNotices.value.splice(index, 1)
        }
      } else {
        // 批量删除时，清空已选中列表
        selectedNotices.value.splice(0, selectedNotices.value.length)
      }
      getData()
    }
  } finally {
    endLoading()
  }
}
/** form edtion */
const formVisible = ref(false)
const operationType = ref<'edit' | 'create'>('create')
const currentNotice = ref<any>(null)

/** 显示表单弹窗 */
const handleShowFormModal = (row?: any) => {
  formVisible.value = true
  if (row) {
    operationType.value = 'edit'
    currentNotice.value = row
  } else {
    operationType.value = 'create'
    currentNotice.value = null
  }
}

const formModalCconfig = {
  formItems,
  formModel: noticeModel,
  createApi: fetchCreateNotice,
  updateApi: fetchUpdateNotice,
  extraEditKeys: ['noticeId'],
}
</script>
<template>
  <app-main title="公告管理">
    <template #suffix>
      <saber-button btn-type="add" @click="handleShowFormModal()">新建公告</saber-button>
    </template>
    <template #search>
      <app-search
        :search-options="searchFormItems"
        :search-model="searchModel"
        @reset="resetSearchParams"
        @submit="updateSearchParams"
      />
    </template>
    <template #toolbar>
      <div class="saberBtnGroup flex gap-2">
        <el-button class="saber" :disabled="selectedNotices.length === 0" @click="handleDeleteNotice()">
          <template #icon>
            <Icon icon="solar:trash-bin-trash-linear" />
          </template>
          批量删除
        </el-button>
        <el-button class="saber" :loading="loading" @click="getData">
          <template #icon>
            <Icon icon="solar:refresh-linear" />
          </template>
          刷新
        </el-button>
      </div>
    </template>
    <app-table
      :show-selection="true"
      v-model:selected="selectedNotices"
      :actionsWidth="180"
      :loading="loading"
      :data="data"
      :pagination="pagination"
      class="saber"
      :columns="getColumns(getData)"
      @multiple-delete="handleDeleteNotice()"
    >
      <template #actions="{ row }">
        <div class="saberBtnGroup flex gap-1.5 justify-end" v-if="row.userId !== 1">
          <el-button size="small" circle class="saber" @click="handleShowFormModal(row)">
            <template #icon>
              <Icon icon="solar:pen-new-square-linear" />
            </template>
          </el-button>
          <el-button size="small" circle class="saber" @click="handleDeleteNotice(row)">
            <template #icon>
              <Icon icon="solar:trash-bin-trash-linear" />
            </template>
          </el-button>
        </div>
        <span v-else />
      </template>
    </app-table>
  </app-main>
  <form-modal
    v-if="formVisible"
    :operation-type="operationType"
    v-model="formVisible"
    :data="currentNotice"
    :form-config="formModalCconfig"
    title-base="通知公告"
    type="drawer"
    :modal-size="950"
    @submit="getData"
  />
</template>
