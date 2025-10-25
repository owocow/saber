<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useAuthStore } from '@/store/modules/auth'
import { useRouteStore } from '@/store/modules/route'
import { useRouterPush } from '@/utils/router'
import { useTabStore } from '@/store/modules/tabbar'
import { Icon } from '@iconify/vue'
import Menus from './menu/index.vue'

defineOptions({ name: 'Sidebar' })

/** menus */
const menus: App.Global.Menu[] = useRouteStore().menus
const { logout, userInfo } = useAuthStore()
const tabStore = useTabStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const visible = defineModel({ type: Boolean })
const emits = defineEmits(['close-sidebar'])
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

    // 如果有子菜单，递归查找
    if (menu.children && menu.children.length > 0) {
      const found = findMenuByTabId(menu.children, tabId)
      if (found) {
        return found
      }
    }
  }

  return null
}

const activeMenuKey = computed(() => findMenuByTabId(menus, tabStore.activeTabId)?.key)
</script>
<template>
  <section
    class="h-full w-full flex flex-col bg-gray-50 border-r border-gray-150 dark:bg-dark-700 dark:border-dark-600"
  >
    <div class="flex justify-between items-center w-full h-[51px] pl-7 pr-2 flex-shrink-0 logo">
      <router-link to="/home">
        <img v-if="isDark" src="@/assets/imgs/logo-white.svg" class="h-6" />
        <img v-else src="@/assets/imgs/logo-multi.svg" class="h-6" />
      </router-link>
      <span
        class="flex size-[32px] items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-lg"
        v-if="!visible"
        @click="emits('close-sidebar')"
      >
        <el-icon :size="18">
          <Icon icon="solar:round-double-alt-arrow-left-line-duotone" />
        </el-icon>
      </span>
    </div>
    <el-scrollbar class="flex-1">
      <div class="p-2">
        <Menus :menus="menus" @select="handleSelect" :defaultActive="activeMenuKey" />
      </div>
    </el-scrollbar>
    <div class="flex items-center w-full px-3 pb-3 flex-shrink-0">
      <SaberPopover class="w-full" placement="top" :offset-y="6">
        <template #reference>
          <div
            class="w-full rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:bg-dark-700 dark:hover:bg-dark-600 pt-2"
          >
            <div class="flex items-center">
              <el-avatar :size="26" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
              <span class="ml-2">{{ userInfo.user?.nickName }}</span>
            </div>
            <el-icon :size="15">
              <Icon icon="solar:transfer-vertical-line-duotone" />
            </el-icon>
          </div>
        </template>
        <div
          class="bg-white dark:bg-dark-700 w-[226px] shadow-lg dark:shadow-2xl border border-gray-200 dark:border-dark-600 p-4 rounded-lg"
        >
          <dl class="flex justify-between items-center mb-2 border-b border-gray-150 dark:border-dark-600 pb-4">
            <dt class="flex items-center">
              <el-avatar :size="32" src="https://i.pinimg.com/236x/db/17/0e/db170e567b02375892f5a2cff7648a2e.jpg" />
              <div class="ml-2 flex flex-col">
                <span>{{ userInfo.user?.nickName }}</span>
                <span class="text-xs text-gray-400">[销售总监]</span>
              </div>
            </dt>
            <dd
              @click="toggleDark()"
              class="p-3 cursor-pointer flex items-center justify-center transition hover:bg-gray-150 dark:hover:bg-dark-600 rounded-lg -mr-1"
            >
              <el-icon :size="16" v-if="!isDark">
                <Icon icon="line-md:moon-alt-to-sunny-outline-loop-transition" />
              </el-icon>
              <el-icon :size="16" v-else>
                <Icon icon="line-md:moon-rising-filled-alt-loop" />
              </el-icon>
            </dd>
          </dl>
          <div class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md">
            <el-icon>
              <Icon icon="ep:setting" />
            </el-icon>
            <span class="ml-3">系统设置</span>
          </div>
          <div
            class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md"
            @click="logoutSys"
          >
            <el-icon>
              <Icon icon="solar:logout-2-line-duotone" />
            </el-icon>
            <span class="ml-3">退出登录</span>
          </div>
        </div>
      </SaberPopover>
      <div
        class="w-[36px] flex items-center justify-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600 rounded-lg ml-1 relative"
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
