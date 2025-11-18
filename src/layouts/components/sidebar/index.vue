<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useAuthStore } from '@/store/modules/auth'
import { useRouteStore } from '@/store/modules/route'
import { useRouterPush } from '@/utils/router'
import { useTabStore } from '@/store/modules/tabbar'
import { Icon } from '@iconify/vue'
import Menus from './menus.vue'

defineOptions({ name: 'Sidebar' })

/** 菜单 */
const menus: App.Global.Menu[] = useRouteStore().menus
const { logout, userInfo } = useAuthStore()
const tabStore = useTabStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)

/** 退出登录 */
const logoutSys = () => logout()

/** 处理菜单选择 */
const handleSelect = async (key: string) => {
  const { routerPushByKey } = useRouterPush(false)
  await routerPushByKey(key)
}

/**
 * 递归查找菜单项
 * @param menus 菜单列表
 * @param tabId 要查找的 tab ID
 * @returns 找到的菜单项或 null
 */
function findMenuByTabId(menus: App.Global.Menu[], tabId: string): App.Global.Menu | null {
  for (const menu of menus) {
    // 检查当前菜单项的 routePath 是否匹配
    if (menu.routePath === tabId) {
      return menu
    }
    if (menu.children && menu.children.length > 0) {
      const found = findMenuByTabId(menu.children, tabId)
      if (found) {
        return found
      }
    }
  }

  return null
}
/** 获取当前激活菜单的 key */
const activeMenuKey = computed(() => findMenuByTabId(menus, tabStore.activeTabId)?.key)
</script>
<template>
  <section
    class="h-full flex flex-col bg-gray-100/50 border-r border-gray-200 dark:bg-dark-800/30 dark:border-dark-800 w-[var(--page-sidebar-width)]"
  >
    <div
      class="flex justify-between items-center w-full pl-7 pr-2 flex-shrink-0 h-[var(--page-header-height)] border-b border-gray-200 dark:border-b-dark-800"
    >
      <router-link to="/home">
        <Logo
          :height="24"
          icon-color="var(--color-primary-500)"
          :textColor="isDark ? 'var(--color-dark-300)' : 'var(--color-gray-700)'"
        />
      </router-link>
    </div>
    <el-scrollbar class="flex-1">
      <div class="p-4">
        <Menus :menus="menus" @select="handleSelect" :defaultActive="activeMenuKey" />
      </div>
    </el-scrollbar>
    <div class="flex items-center w-full px-3 pb-3 flex-shrink-0">
      <el-popover
        placement="top"
        trigger="click"
        transition="slide-up"
        :width="200"
        :show-arrow="false"
        popper-class="saber"
      >
        <template #reference>
          <div
            class="w-full rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-800 pt-2"
          >
            <div class="flex items-center">
              <el-avatar :size="26" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
              <span class="ml-2">{{ userInfo.user?.nickName }}</span>
            </div>
            <el-icon :size="15">
              <Icon icon="ic:baseline-code" />
            </el-icon>
          </div>
        </template>

        <dl class="flex justify-between items-center mb-2 border-b border-gray-150 dark:border-dark-750 pb-4">
          <dt class="flex items-center">
            <el-avatar :size="32" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
            <div class="ml-2 flex flex-col">
              <span>{{ userInfo.user?.nickName }}</span>
              <span class="text-xs text-gray-400">[销售总监]</span>
            </div>
          </dt>
          <dd
            @click="toggleDark()"
            class="p-3 cursor-pointer flex items-center justify-center transition hover:bg-gray-150 dark:hover:bg-dark-750 rounded-lg -mr-1"
          >
            <el-icon :size="16" v-if="!isDark">
              <Icon icon="line-md:moon-alt-to-sunny-outline-loop-transition" />
            </el-icon>
            <el-icon :size="16" v-else>
              <Icon icon="line-md:moon-rising-filled-alt-loop" />
            </el-icon>
          </dd>
        </dl>
        <div class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-750 cursor-pointer rounded-md">
          <el-icon>
            <Icon icon="ep:setting" />
          </el-icon>
          <span class="ml-3">系统设置</span>
        </div>
        <div
          class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-750 cursor-pointer rounded-md"
          @click="logoutSys"
        >
          <el-icon>
            <Icon icon="solar:logout-2-line-duotone" />
          </el-icon>
          <span class="ml-3">退出登录</span>
        </div>
      </el-popover>
      <div
        class="w-[36px] flex items-center justify-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-800 rounded-lg ml-1 relative"
      >
        <span class="absolute flex size-2 top-0.5 right-0.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-400 opacity-75"></span>
          <span class="relative inline-flex size-2 rounded-full bg-danger-500"></span>
        </span>
        <el-icon :size="20">
          <Icon icon="solar:meditation-round-line-duotone" />
        </el-icon>
      </div>
    </div>
  </section>
</template>
