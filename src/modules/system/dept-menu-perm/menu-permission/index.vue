<script lang="ts" setup>
import { fetchGetMenuList, fetchDeleteMenu } from '@/service/api/system'
import { handleTree } from '@/utils/common'
import { jsonClone } from '@/packages/utils'
import MenuForm from './mods/form.vue'
import PermForm from './mods/perm-form.vue'
import { type FilterNodeMethodFunction } from 'element-plus/'
import { useLoading } from '@/packages/hooks'
import { MenuTypeEnum } from '../../enum'
import { confirm } from '@/utils/message-box'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'MenuPermissions' })

const treeData = ref<any[]>([])
const filterKey = ref('')
const treeRef = ref<any>()
const { loading, startLoading, endLoading } = useLoading()
const currentMenu = ref<any>(null)
const currentMenuPerms = ref<any[]>([])

function findNodeById(tree: any[], id: number | string, idField = 'menuId'): any {
  for (const node of tree) {
    if (node[idField] === id) {
      return node
    }
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id, idField)
      if (found) return found
    }
  }
  return null
}

async function initials() {
  try {
    startLoading()
    const { data, error } = await fetchGetMenuList()
    if (error) return
    const filteredData = data.filter((item: any) => item.menuType !== 'F')
    treeData.value = handleTree(filteredData, { idField: 'menuId' })
    if (currentMenu.value) {
      const node = findNodeById(treeData.value, currentMenu.value.menuId)
      if (!node) {
        currentMenu.value = null
        currentMenuPerms.value = []
      } else {
        currentMenu.value = jsonClone(menuTransFormer(node))
      }
    }
  } finally {
    endLoading()
  }
}

initials()

/** transform menu */
function menuTransFormer(node: any) {
  const { isFrame, visible, menuType } = node || {}
  return {
    ...node,
    isFrameText: isFrame === '0' ? '是' : isFrame === '1' ? '否' : 'iframe',
    visibleText: visible === '0' ? '显示' : '隐藏',
    menuTypeText: menuType === MenuTypeEnum['目录'] ? '目录' : menuType === MenuTypeEnum['菜单'] ? '菜单' : '按钮',
    isCacheText: node.isCache === '0' ? '缓存' : '不缓存',
  }
}

let controller = new AbortController()

/**菜单点击 */
async function handleMenuClick(node: any) {
  currentMenu.value = jsonClone(menuTransFormer(node))
  currentMenuPerms.value = []
  const { menuType } = node
  if (menuType === MenuTypeEnum['菜单']) {
    await getPermsList()
  }
}

async function getPermsList() {
  if (!currentMenu.value) return
  controller.abort()
  controller = new AbortController()
  try {
    startLoading()
    const { data, error } = await fetchGetMenuList(
      { parentId: currentMenu.value?.menuId, menuType: 'F' },
      controller.signal
    )
    if (error) return
    currentMenuPerms.value = data || []
  } finally {
    endLoading()
  }
}

/** 筛选 */
const filterNode: FilterNodeMethodFunction = (value: string, data: any) => {
  if (!value) return true
  return data.menuName.includes(value)
}

/** input handler */
watch(filterKey, val => {
  treeRef.value!.filter(val)
})

/** menu form */
const menuFormModalVisible = ref(false)
const fromScratch = ref(false)
const operationType = ref<'create' | 'edit'>('create')
function openMenuFormModal(type: 'create' | 'edit', isFromScratch?: boolean) {
  operationType.value = type
  fromScratch.value = isFromScratch ? true : false
  menuFormModalVisible.value = true
}

/** 删除菜单 */
async function handleDeleteMenuOrPerm(menuId?: number) {
  if (!menuId && !currentMenu.value) return
  const id = menuId || currentMenu.value.menuId
  const type = menuId ? '操作权限' : '菜单'
  const confirmRes = await confirm(`是否确认删除该${type}?`, `删除${type}`, { type: 'warning' })
  if (!confirmRes) return
  try {
    startLoading()
    const { error } = await fetchDeleteMenu(id)
    if (error) return
    ElMessage.success('删除成功')
    // 刷新列表
    if (!menuId) await initials()
    else await getPermsList()
  } finally {
    endLoading()
  }
}

/** perm form */
const permFormModalVisible = ref(false)
const currentPerm = ref<any>(null)
const permOperationType = ref<'create' | 'edit'>('create')
function openPermFormModal(item?: any) {
  const type = item ? 'edit' : 'create'
  currentPerm.value = item || null
  permOperationType.value = type
  permFormModalVisible.value = true
}
</script>
<template>
  <div class="flex items-stretch gap-8 h-full overflow-hidden">
    <div
      class="w-[440px] h-full flex flex-col overflow-hidden rounded-2xl px-12 py-9 border border-gray-200 dark:border-dark-750 flex-shrink-0"
    >
      <h4 class="text-lg font-bold mb-5 dark:text-dark-400 text-gray-500">菜单列表</h4>
      <div class="flex justify-between mb-5">
        <el-input placeholder="请输入菜单名称" v-model="filterKey" style="width: 230px" />
        <SaberButton btn-type="add" @click="openMenuFormModal('create', true)">添加菜单</SaberButton>
      </div>
      <el-scrollbar class="flex-1 -mr-4 pr-4">
        <el-tree
          ref="treeRef"
          class="saber"
          :loading="loading"
          highlight-current
          :expand-on-click-node="false"
          :data="treeData"
          :props="{ label: 'menuName' }"
          node-key="menuId"
          @node-click="handleMenuClick"
          :filter-node-method="filterNode"
        />
      </el-scrollbar>
    </div>
    <div class="flex-shrink-0 py-9 px-12 w-[450px] rounded-2xl relative border border-gray-200 dark:border-dark-750">
      <div v-if="currentMenu" class="flex flex-col h-full" v-loading="loading">
        <div class="flex justify-between mb-8">
          <div class="text-xl flex items-center gap-4">
            <span>{{ currentMenu.menuName }}</span>
            <saber-status :status="currentMenu.status" />
          </div>
          <div class="saberBtnGroup flex gap-2">
            <saber-button btn-type="add" size="small" circle @click="openMenuFormModal('create')" />
            <saber-button btn-type="edit" size="small" circle @click="openMenuFormModal('edit')" />
            <saber-button btn-type="delete" size="small" circle @click="handleDeleteMenuOrPerm()" />
          </div>
        </div>
        <div class="h-[180px]">
          <saber-info-provider label-width="80px">
            <el-row :gutter="24">
              <el-col :span="12">
                <saber-info label="菜单类型">{{ currentMenu.menuTypeText }}</saber-info>
              </el-col>
              <el-col :span="12">
                <saber-info label="显示状态">{{ currentMenu.visibleText }}</saber-info>
              </el-col>
              <el-col :span="12">
                <saber-info label="是否外链">{{ currentMenu.isFrameText }}</saber-info>
              </el-col>
              <el-col :span="12" v-if="currentMenu.menuType === 'C'">
                <saber-info label="是否缓存">{{ currentMenu.isCacheText }}</saber-info>
              </el-col>
              <el-col :span="24">
                <saber-info :label="currentMenu.isFrame === '0' ? '外链地址' : '路由地址'">{{
                  currentMenu.path
                }}</saber-info>
              </el-col>
              <el-col :span="24" v-if="currentMenu.isFrame === '2'">
                <saber-info label="iframe 地址">{{ currentMenu.queryParam }}</saber-info>
              </el-col>
              <el-col v-if="currentMenu.menuType !== 'M'">
                <saber-info label="权限字符串">{{ currentMenu.perms }}</saber-info>
              </el-col>
            </el-row>
          </saber-info-provider>
        </div>
        <template v-if="currentMenu.menuType === 'C'">
          <div class="flex justify-between">
            <span>权限配置列表</span>
            <div class="saberBtnGroup">
              <saber-button size="small" btn-type="add" @click="openPermFormModal()">添加操作权限</saber-button>
            </div>
          </div>
          <el-scrollbar class="mt-6 flex-1 -mr-5 pr-5">
            <template v-if="currentMenuPerms.length">
              <div
                class="border border-gray-200 p-4 mb-3 rounded-xl dark:border-dark-800 dark:bg-dark-800/50"
                v-for="item in currentMenuPerms"
                :key="item.menuId"
              >
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <h4 class="flex gap-4 mb-1.5 items-center">
                      <span>{{ item.menuName }}</span>
                      <span class="text-xs text-gray-400 dark:text-dark-500" v-if="item.status === '1'">已禁用</span>
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-dark-500">权限标识: {{ item.perms }}</p>
                  </div>
                  <div class="saberBtnGroup flex gap-2">
                    <saber-button btn-type="edit" size="small" circle @click="openPermFormModal(item)" />
                    <saber-button btn-type="delete" size="small" @click="handleDeleteMenuOrPerm(item.menuId)" circle />
                  </div>
                </div>
              </div>
            </template>
            <saber-empty :icon-size="36" v-if="!currentMenuPerms.length && !loading" note="未配置操作权限" />
          </el-scrollbar>
        </template>
      </div>
      <div v-else>
        <div class="text-center text-gray-400 dark:text-dark-600">
          <p class="mb-4">
            <Icon icon="solar:building-3-linear" style="font-size: 48px" />
          </p>
          <p class="mb-2 flex flex-col">
            <span class="text-4xl mb-3">👈</span>
            请选择左侧菜单进行权限配置
          </p>
        </div>
      </div>
    </div>
  </div>
  <MenuForm
    v-if="menuFormModalVisible"
    v-model="menuFormModalVisible"
    :operationType="operationType"
    :menuTree="treeData"
    :from-scratch="fromScratch"
    :raw-data="currentMenu"
    @submit="initials"
  />
  <PermForm
    v-if="permFormModalVisible"
    v-model="permFormModalVisible"
    :operationType="permOperationType"
    :raw-data="currentMenu"
    :edit-data="currentPerm"
    @submit="getPermsList"
  />
</template>
