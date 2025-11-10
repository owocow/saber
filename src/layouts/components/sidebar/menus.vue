<script setup lang="ts">
import { Icon } from '@iconify/vue'
import RecursiveMenuItem from './recursive-menu-item.vue'

defineOptions({ name: 'AppMenu' })

interface Props {
  menus: App.Global.Menu[]
  defaultActive?: string
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultActive: '',
  collapse: false,
})

const emit = defineEmits<{
  select: [key: string, item: App.Global.Menu]
}>()

// 判断是否有子菜单
const hasChildren = (item: App.Global.Menu) => {
  return item.children && item.children.length > 0
}

// 处理菜单选择
const handleSelect = (key: string) => {
  const item = findMenuItem(props.menus, key)
  if (item) {
    emit('select', key, item)
  }
}

// 查找菜单项
const findMenuItem = (menus: App.Global.Menu[], key: string): App.Global.Menu | null => {
  for (const menu of menus) {
    if (menu.key === key) {
      return menu
    }
    if (menu.children) {
      const found = findMenuItem(menu.children, key)
      if (found) return found
    }
  }
  return null
}
</script>

<template>
  <el-menu :default-active="defaultActive" :collapse="collapse" @select="handleSelect">
    <template v-for="item in menus" :key="item.key">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="hasChildren(item)" :index="item.key">
        <template #title>
          <el-icon v-if="item.icon" :size="item.iconSize || 18">
            <Icon :icon="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>

        <!-- 递归渲染子菜单 -->
        <template v-for="child in item.children" :key="child.key">
          <!-- 子菜单还有子菜单 -->
          <el-sub-menu v-if="hasChildren(child)" :index="child.key">
            <template #title>
              <span>{{ child.label }}</span>
            </template>
            <!-- 继续递归 -->
            <RecursiveMenuItem :items="child.children!" />
          </el-sub-menu>

          <!-- 子菜单项 -->
          <el-menu-item v-else :index="child.key" @click="handleSelect(child.key)">
            <template #title>
              <span>{{ child.label }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>

      <!-- 无子菜单的第一层菜单项 -->
      <el-menu-item v-else :index="item.key">
        <el-icon v-if="item.icon" :size="item.iconSize || 18">
          <Icon :icon="item.icon" />
        </el-icon>
        <template #title>{{ item.label }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
