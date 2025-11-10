<script setup lang="ts">
import { useTabStore } from '@/store/modules/tabbar'
import { useRoute } from 'vue-router'
import { useRouterPush } from '@/utils/router'

defineOptions({
  name: 'AppHeader',
})

const showSidebar = defineModel('showSidebar', { type: Boolean })
const tabStore = useTabStore()
const route = useRoute()

const { routerPushByKey } = useRouterPush(false)
function init() {
  tabStore.initTabStore(route)
}

watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route)
  }
)
init()
</script>
<template>
  <!--  -->
  <header
    class="px-4 flex items-center justify-between gap-3 h-[var(--page-header-height)] w-full flex-shrink-0 border-b border-gray-200 dark:border-b-dark-800"
  >
    <div
      class="flex size-[28px] items-center justify-center transition bg-gray-100 border-gray-200 dark:bg-dark-800/60 border dark:border-dark-750/50 dark:hover:bg-dark-750 cursor-pointer rounded-lg"
      @click="showSidebar = !showSidebar"
    >
      <el-icon
        :size="20"
        class="transition-all duration-600 ease-in-out"
        :class="showSidebar ? 'rotate-0' : 'rotate-180'"
      >
        <Icon icon="material-symbols-light:menu-open-rounded" />
      </el-icon>
    </div>
    <span class="w-[1px] dark:bg-dark-800 bg-gray-200 h-[16px]" />
    <div class="flex-1 flex justify-between items-center overflow-hidden">
      <!-- <span
        class="flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 hover:dark:bg-dark-500/50 cursor-pointer"
      >
        <el-icon>
          <Icon icon="solar:double-alt-arrow-left-line-duotone" />
        </el-icon>
      </span> -->

      <el-scrollbar class="flex-1 tabsWrapBox">
        <div class="flex items-center h-[var(--page-header-height)]">
          <template v-for="item in tabStore.tabs" :key="item.id">
            <div
              class="flex items-center text-sm pl-3 border transition-all duration-200 pr-0.5 py-1.5 mr-[2px] hover:dark:bg-dark-800/60 hover:dark:border-dark-750/60 hover:bg-gray-100 hover:border-gray-150 cursor-pointer transform rounded-lg h-[28px]"
              :class="[
                item.id === tabStore.activeTabId
                  ? 'dark:text-primary-500 text-primary-500 dark:bg-dark-800/60 bg-gray-100 border-gray-150 dark:hover-bg-dark-800 dark:border-dark-750/50'
                  : 'border-transparent',
                item.id === '/home' ? 'pr-3' : '',
              ]"
              @click="routerPushByKey(item.routeKey)"
            >
              <span class="text-nowrap mr-0.5 mb-[1px]">{{ item.label }}</span>
              <span
                class="cursor-pointer flex items-center text-gray-400 hover:text-gray-800 transition p-1 rounded-sm dark:text-dark-600 dark:hover:text-dark-300"
                v-if="item.id !== '/home'"
                @click.stop="tabStore.removeTabByRoutePath(item.fullPath)"
              >
                <el-icon :size="16">
                  <Icon icon="material-symbols-light:close" />
                </el-icon>
              </span>
            </div>
          </template>
        </div>
      </el-scrollbar>
      <span
        class="flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 hover:dark:bg-dark-500/50 cursor-pointer"
      >
        <el-icon>
          <Icon icon="solar:double-alt-arrow-right-line-duotone" />
        </el-icon>
      </span>
    </div>
  </header>
</template>
