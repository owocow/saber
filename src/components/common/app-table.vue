<script lang="ts" setup>
import { jsonClone } from '@/packages/utils'
defineOptions({ name: 'AppTable' })
const loading = defineModel('loading', { type: Boolean, default: false })
const pagination = defineModel('pagination', {
  type: Object,
  default: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 50, 100],
    sizeChange: (size: number) => {},
    currentPageChange: (page: number) => {},
  }),
})
const data = defineModel('data', { type: Array, default: () => [] })
const selected = defineModel('selected', { type: Array, default: () => [] })
interface AppTableProps<S = string, N = number, B = boolean> {
  columns: Array<AppTableType.ColumnsType>
  disablePagination?: B | S
  meta?: {
    tableId: S
    initials: S[]
  }
  showSelection?: B | S
  showActions?: B
  actionsWidth?: N | S
  defaultBtnText?: S
}
const props = withDefaults(defineProps<AppTableProps>(), {
  disablePagination: false,
  showSelection: false,
  showActions: true,
  actionsWidth: '150',
  defaultBtnText: '查看',
  columns: () => [],
})
/**
 * logics
 */
/** 监听 selected */
function handleSelectionChange(val: any[]) {
  if (props.showSelection) {
    const rawArr = val.map(v => toRaw(v))
    selected.value = jsonClone(rawArr)
  }
  return
}
</script>
<template>
  <div v-loading="loading" class="flex flex-col bg-white dark:bg-dark-700 px-5 py-3 w-full rounded-lg">
    <header class="mb-2 bg-amber-100 p-3 flex-shrink-0" v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <main class="flex-1">
      <el-table
        :row-key="(row: any) => row.id || row._index"
        v-bind="$attrs"
        :data="data"
        width="100%"
        ref="tableRef"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="showSelection" reserve-selection type="selection" align="left" width="44" />
        <template v-for="{ key, render, ...rest } in columns">
          <el-table-column v-if="render" v-bind="rest">
            <template #default="{ row }">
              <component :is="render" v-bind="row" />
            </template>
          </el-table-column>
          <el-table-column v-else :prop="key" v-bind="rest" />
        </template>
      </el-table>
    </main>
    <footer class="mt-auto pt-4 flex justify-between items-center">
      <div class="text-gray-400">
        <slot name="tips" />
      </div>
      <el-pagination
        v-if="!Boolean(disablePagination)"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        background
        :page-sizes="pagination.pageSizes"
        layout="total, prev, pager, next, sizes"
        :total="pagination.total"
        @size-change="pagination.sizeChange"
        @current-change="pagination.currentPageChange"
      />
    </footer>
  </div>
</template>
