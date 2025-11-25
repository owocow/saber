<script lang="ts" setup>
import { jsonClone } from '@/packages/utils'
import { cacheItemByKey } from '@/utils/storage'
defineOptions({ name: 'AppTable' })
/**
 * Props
 */
interface AppTableProps<S = string, N = number, B = boolean> {
  columns: Array<Saber.AppTable.ColumnsType>
  disablePagination?: B | S
  meta?: {
    tableId: S
    initials: S[]
  }
  showSelection?: B | S
  showActions?: B
  actionsWidth?: N | S
  defaultBtnText?: S
  pagination?: Saber.AppTable.Pagination
  hidePageSizes?: B | S
  hidePopActions?: B | S
}

const props = withDefaults(defineProps<AppTableProps>(), {
  disablePagination: false,
  showSelection: false,
  showActions: true,
  actionsWidth: '150',
  defaultBtnText: '查看',
  columns: () => [],
  pagination: () => ({}),
  hidePageSizes: false,
  hidePopActions: false,
})
/**
 * Models
 */
const loading = defineModel('loading', { type: Boolean, default: false })
const data = defineModel('data', { type: Array, default: () => [] })
const selected = defineModel('selected', { type: Array, default: () => [] })

/**
 * emits
 */
const emits = defineEmits(['item-click', 'multiple-delete'])

/** selected */
function handleSelectionChange(val: any[]) {
  if (props.showSelection) {
    const rawArr = val.map(v => toRaw(v))
    selected.value = jsonClone(rawArr)
  }
  return
}

/**
 * 筛选 Columns 字段
 */
const cachedColumnKeys = ref<string[]>([])
function getCacheTableKey() {
  if (!props.meta?.tableId) {
    return ''
  }
  return `app-table_${props.meta.tableId}`
}

function handleColumnFilterListChange(value: any) {
  if (props.meta?.tableId) {
    cacheItemByKey.set(getCacheTableKey(), value)
  }
}
const { meta } = props
const _cloumns = computed(() => {
  if (!meta) {
    return props.columns
  }
  return props.columns.filter((v: any) => cachedColumnKeys.value.includes(v.key))
})

// 初始化列筛选缓存
onMounted(() => {
  if (props.meta?.tableId) {
    const cachedKeys = cacheItemByKey.get(getCacheTableKey())
    if (!cachedKeys) {
      cacheItemByKey.set(getCacheTableKey(), props.meta.initials)
      cachedColumnKeys.value = props.meta.initials
    } else {
      cachedColumnKeys.value = cachedKeys
    }
  }
})

const paginationLayout = computed(() => {
  return props.hidePageSizes !== false ? 'total, prev, pager, next' : 'total, prev, pager, next, sizes'
})
</script>
<template>
  <div
    class="rounded-[8px] overflow-x-hidden border border-gray-150 h-full flex flex-col dark:border-dark-800 relative"
  >
    <header class="mb-2 p-2 flex-shrink-0" v-if="$slots.header">
      <slot name="header" />
    </header>
    <el-table
      :row-key="(row: any) => row.id || row._index"
      v-bind="$attrs"
      :data="data"
      ref="tableRef"
      v-loading="loading"
      header-row-class-name="app-table-header"
      @selection-change="handleSelectionChange"
    >
      <template #empty>
        <div class="flex items-center flex-col py-8 text-gray-400 dark:text-dark-600">
          <el-icon :size="48">
            <Icon icon="solar:tornado-linear" />
          </el-icon>
          <p class="-mt-3">没有相关数据</p>
        </div>
      </template>
      <el-table-column v-if="showSelection" reserve-selection type="selection" align="left" width="44" />
      <template v-for="{ key, render, width, ...rest } in _cloumns">
        <el-table-column v-if="render" v-bind="rest" :width="width || 'auto'">
          <template #default="{ row }">
            <component :is="render" v-bind="row" />
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="rest" :prop="key" :width="width || 'auto'" />
      </template>
      <el-table-column label="操作" align="right" v-if="showActions" :width="actionsWidth || '120'">
        <template #header v-if="meta">
          <el-popover trigger="click" transition="slide-up" placement="top" width="160" :offset="4">
            <template #reference>
              <div
                class="inline-flex items-center gap-2 cursor-pointer justify-end hover:bg-gray-300/50 dark:hover:bg-dark-750 px-2 py-1 rounded-lg -mr-1"
              >
                <span class="font-normal">列设置</span>
                <el-icon :size="16">
                  <Icon icon="solar:checklist-minimalistic-linear" />
                </el-icon>
              </div>
            </template>
            <el-checkbox-group @change="handleColumnFilterListChange" v-model="cachedColumnKeys">
              <div class="flex flex-col">
                <label
                  v-for="item in columns"
                  class="hover:bg-gray-100 dark:hover:bg-dark-600 px-2 rounded cursor-pointer"
                  :key="item.key"
                >
                  <el-checkbox :style="{ 'font-weight': 'normal' }" :value="item.key">{{ item.label }}</el-checkbox>
                </label>
              </div>
            </el-checkbox-group>
          </el-popover>
        </template>
        <template #default="{ row }">
          <slot name="actions" :row="row">
            <el-button size="small" class="saber" @click="emits('item-click', row)">
              {{ defaultBtnText }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <footer :class="['mt-auto mb-4 pt-4 flex items-center', $slots.tips ? 'justify-between' : 'justify-center']">
      <div>
        <slot name="tips" />
      </div>
      <el-pagination
        :style="{ '--el-pagination-border-radius': '6px' }"
        v-if="!Boolean(disablePagination)"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        background
        :page-sizes="pagination.pageSizes"
        :layout="paginationLayout"
        :total="pagination.total"
        @size-change="pagination.sizeChange"
        @current-change="pagination.currentPageChange"
      />
    </footer>
    <!-- pop actions -->
    <div
      class="absolute z-10 right-6 bottom-16 p-4 rounded-xl w-[540px] pl-6 flex items-center justify-between border border-gray-200 bg-white shadow-lg dark:border-dark-800 dark:bg-dark-800/50"
      v-if="showSelection && selected?.length && hidePopActions === false"
    >
      <span>已选择 {{ selected.length }} 条 [总计 {{ pagination?.total }} 条]</span>
      <div class="flex justify-end gap-2 saberBtnGroup">
        <saber-button btn-type="delete" type="danger" :loading="loading" @click="emits('multiple-delete')"
          >批量删除</saber-button
        >
        <slot name="popExtraActions" />
      </div>
    </div>
  </div>
</template>
