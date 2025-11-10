<script lang="ts" setup>
import Mousetrap from 'mousetrap'
import { useRouteStore } from '@/store/modules/route'
import { useTabStore } from '@/store/modules/tabbar'
import { useDark } from '@vueuse/core'
import SideBar from './components/sidebar/index.vue'
import Header from './components/header.vue'

defineOptions({ name: 'AppLayout' })

const routeStore = useRouteStore()
const tabStore = useTabStore()

/** 快捷键切换侧边栏 */
const showSidebar = ref(true)
Mousetrap.bind(['command+]', 'ctrl+]'], () => {
  showSidebar.value = !showSidebar.value
})

/** 设置水印 */
const isDark = useDark()
const font = reactive({
  color: 'rgba(0, 0, 0, .0)',
})

watch(
  isDark,
  () => {
    font.color = isDark.value ? 'rgba(255, 255, 255, .0)' : 'rgba(0, 0, 0, .0)'
  },
  {
    immediate: true,
  }
)

// 添加计算的 sidebar 宽度
const sidebarWidth = computed(() => (showSidebar.value ? 'var(--page-sidebar-width)' : '0px'))
</script>
<template>
  <el-watermark content="小租云风控" :font="font">
    <div class="h-screen flex relative">
      <div
        class="transition-all duration-300 ease-in-out overflow-hidden absolute z-10 h-full"
        :class="showSidebar ? 'w-[var(--page-sidebar-width)]' : 'w-0'"
      >
        <SideBar v-model="showSidebar" class="w-[var(--page-sidebar-width)]" />
      </div>
      <main
        class="flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out"
        :style="{ marginLeft: sidebarWidth }"
      >
        <Header v-model:showSidebar="showSidebar" />
        <el-scrollbar class="flex-1">
          <RouterView v-slot="{ Component, route }">
            <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
              <component :is="Component" :key="tabStore.getTabIdByRoute(route)" />
            </KeepAlive>
          </RouterView>
        </el-scrollbar>
      </main>
    </div>
  </el-watermark>
</template>
