<script setup lang="ts">
import { useTabStore } from '@/store/modules/tabbar'
import { useRoute } from 'vue-router'
import { useRouterPush } from '@/utils/router'
defineOptions({
  name: 'Tabbar',
})
const tabStore = useTabStore()
const route = useRoute()

const { routerPushByKey } = useRouterPush(false)
function init() {
  tabStore.initTabStore(route)
}

// watch
watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route)
  }
)
// init
init()
</script>

<template>
  <!-- tabs -->
  <div class="flex-1 flex justify-between items-center overflow-hidden pageTabs">
    <span class="tabsHandler">
      <el-icon>
        <Icon icon="solar:double-alt-arrow-left-line-duotone" />
      </el-icon>
    </span>

    <el-scrollbar class="flex-1 tabsWrapBox mx-2">
      <div class="flex items-center h-[var(--page-header-height)]">
        <template v-for="item in tabStore.tabs" :key="item.id">
          <div
            class="flex items-center pl-2 pr-1.5 py-1.5 mr-0.5 hover:dark:bg-dark-600/68 hover:bg-gray-100 cursor-pointer transform rounded-lg h-[32px]"
            :class="{
              'bg-gray-100/70 dark:bg-dark-500/80 text-primary-500': item.id === tabStore.activeTabId,
            }"
            @click="routerPushByKey(item.routeKey)"
          >
            <span class="mr-1.5 text-nowrap">{{ item.label }}</span>
            <span
              class="cursor-pointer flex items-center text-gray-400 hover:text-gray-800 transition dark:hover:bg-dark-500 p-1 rounded-sm dark:text-dark-400"
              v-if="item.id !== '/home'"
              @click.stop="tabStore.removeTabByRoutePath(item.fullPath)"
            >
              <el-icon>
                <Icon icon="solar:close-circle-linear" />
              </el-icon>
            </span>
          </div>
        </template>
      </div>
    </el-scrollbar>
    <span class="tabsHandler">
      <el-icon>
        <Icon icon="solar:double-alt-arrow-right-line-duotone" />
      </el-icon>
    </span>
  </div>
  <!-- tabs end -->
</template>
<style scoped>
@reference '@/assets/styles/tailwind.css';
.tabsHandler {
  @apply flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 hover:dark:bg-dark-500/50 cursor-pointer;
}
</style>
