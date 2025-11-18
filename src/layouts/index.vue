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

// watch(
//   isDark,
//   () => {
//     font.color = isDark.value ? 'rgba(255, 255, 255, .0)' : 'rgba(0, 0, 0, .0)'
//   },
//   {
//     immediate: true,
//   }
// )

// 添加计算的 sidebar 宽度
const sidebarWidth = computed(() => (showSidebar.value ? 'var(--page-sidebar-width)' : '0px'))
</script>
<template>
  <div
    class="transition-all duration-300 ease-in-out overflow-hidden absolute h-full"
    :class="showSidebar ? 'w-[var(--page-sidebar-width)]' : 'w-0'"
  >
    <SideBar v-model="showSidebar" />
  </div>
  <main
    class="flex flex-col transition-all duration-300 ease-in-out absolute right-0 top-0 bottom-0 pt-[var(--page-header-height)]"
    :style="{ left: sidebarWidth }"
  >
    <Header v-model:showSidebar="showSidebar" />
    <RouterView v-slot="{ Component, route }">
      <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
        <component :is="Component" :key="tabStore.getTabIdByRoute(route)" />
      </KeepAlive>
    </RouterView>
  </main>
</template>
