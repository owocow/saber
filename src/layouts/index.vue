<script lang="ts" setup>
import Mousetrap from 'mousetrap'
import { useRouteStore } from '@/store/modules/route'
import { useTabStore } from '@/store/modules/tabbar'
import { useDark } from '@vueuse/core'
import SideBar from './components/sidebar.vue'
import Tabbar from './components/tabbar.vue'

const routeStore = useRouteStore()
const tabStore = useTabStore()
const isSidebarCollapsed = ref(false)
const isDark = useDark()
Mousetrap.bind(['command+]', 'ctrl+]'], () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
})
const font = reactive({
  color: 'rgba(0, 0, 0, .04)',
})
watch(
  isDark,
  () => {
    font.color = isDark.value ? 'rgba(255, 255, 255, .03)' : 'rgba(0, 0, 0, .04)'
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <el-watermark content="小租云风控" :font="font">
    <div class="h-screen flex">
      <aside class="w-[var(--page-sidebar-width)]" v-if="!isSidebarCollapsed">
        <SideBar @close-sidebar="isSidebarCollapsed = true" v-model="isSidebarCollapsed" />
      </aside>

      <main class="flex-1 relative">
        <header
          class="bg-white/90 dark:bg-dark-700/80 backdrop-blur-xs px-3 absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-[51px] border-b border-gray-100 dark:border-b-dark-600/80"
        >
          <div
            class="flex size-[32px] items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-lg"
            v-if="isSidebarCollapsed"
            @click="isSidebarCollapsed = false"
          >
            <el-icon :size="18">
              <Icon icon="solar:round-double-alt-arrow-right-line-duotone" />
            </el-icon>
          </div>
          <Tabbar />
        </header>
        <el-scrollbar class="h-full">
          <div class="pt-18 px-4 relative">
            <RouterView v-slot="{ Component, route }">
              <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
                <component :is="Component" :key="tabStore.getTabIdByRoute(route)" />
              </KeepAlive>
            </RouterView>
          </div>
        </el-scrollbar>
      </main>
    </div>
  </el-watermark>
</template>
