<script lang="ts" setup>
import { dataScopeEnum } from '../../../enum'
interface Props {
  data: any
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {},
})

const emits = defineEmits(['update-status', 'edit', 'edit-data-scope', 'assign-user', 'delete'])
const model = ref(props.data?.status ?? '0')

const dataScopeLabel = computed(() => {
  const val = props.data?.dataScope
  if (val == null) return ''
  return Object.entries(dataScopeEnum).find(([, v]) => v === String(val))?.[0] ?? ''
})
const handleCommand = (command: 'edit' | 'edit-data-scope' | 'assign-user' | 'delete') => {
  emits(command, props.data.roleId)
  console.log(props.data.roleId, command)
}

const handleSwitch = () => {
  emits('update-status', { roleId: props.data.roleId, status: model.value })
  console.log(props.data.roleId, model.value)
}
</script>
<template>
  <div class="w-100 border border-gray-200 dark:bg-dark-800 relative dark:border-dark-750 h-42 rounded-xl p-5">
    <div class="absolute right-1 top-1">
      <el-dropdown v-if="!data?.superAdmin" @command="handleCommand">
        <span
          class="size-9 hover:bg-gray-100 flex items-center justify-center rounded-full cursor-pointer dark:hover:bg-dark-700"
        >
          <el-icon>
            <Icon icon="solar:menu-dots-linear" />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">编辑</el-dropdown-item>
            <el-dropdown-item command="edit-data-scope">权限范围</el-dropdown-item>
            <el-dropdown-item command="assign-user">分配用户</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="flex items-center space-x-4 mb-3">
      <span class="text-lg">{{ data?.roleName }}</span>
      <span class="w-[1px] h-3 bg-gray-200 dark:bg-dark-700" />
      <span class="text-gray-500 dark:text-dark-500">{{ data?.roleKey }}</span>
    </div>
    <div
      class="mb-2 flex items-center text-gray-500 dark:text-dark-500 space-x-1 pb-3 border-b border-gray-150 dark:border-dark-750"
    >
      <span>{{ data?.remark || '暂无备注' }}</span>
    </div>
    <div class="flex justify-between">
      <p class="flex flex-col">
        <span class="text-gray-500 dark:text-dark-500 mb-1">数据权限: </span>
        <span class="text-teal-600">{{ dataScopeLabel }}</span>
      </p>
      <el-switch active-value="0" v-if="!data?.superAdmin" @change="handleSwitch" v-model="model" inactive-value="1" />
    </div>
  </div>
</template>
