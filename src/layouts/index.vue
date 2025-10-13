<script lang="ts" setup>
import Mousetrap from 'mousetrap'
import SideBar from './components/sidebar.vue'
const isSidebarCollapsed = ref(false)
Mousetrap.bind(['command+]', 'ctrl+]'], () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
})
</script>
<template>
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
            <i-ri-menu-fold-4-line />
          </el-icon>
        </div>
        <!-- tabs -->
        <div class="flex-1 flex justify-between items-center overflow-hidden pageTabs">
          <span class="tabsHandler">
            <el-icon>
              <i-ep-d-arrow-left />
            </el-icon>
          </span>
          <el-scrollbar class="flex-1 tabsWrapBox mx-2">
            <div class="flex items-center h-[var(--page-header-height)]">
              <div
                class="flex items-center pl-2 pr-1.5 py-1.5 mr-0.5 hover:dark:bg-dark-600/68 hover:bg-gray-100 cursor-pointer transform rounded-lg h-[32px]"
                v-for="item in 2"
              >
                <span class="mr-1.5 text-nowrap">Tab页面标题</span>
                <span
                  class="cursor-pointer flex items-center text-gray-400 hover:text-gray-800 transition hover:bg-gray-150 dark:hover:text-dark-200 dark:hover:bg-dark-500 p-1 rounded-sm dark:text-dark-400"
                >
                  <el-icon>
                    <i-ep-close />
                  </el-icon>
                </span>
              </div>
            </div>
          </el-scrollbar>
          <span class="tabsHandler">
            <el-icon>
              <i-ep-d-arrow-right />
            </el-icon>
          </span>
        </div>
        <!-- tabs end -->
      </header>
      <el-scrollbar>
        <div class="pt-18 px-4 relative">
          <router-view />
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
<style scoped>
@reference '@/assets/styles/tailwind.css';
.tabsHandler {
  @apply flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 hover:dark:bg-dark-500/50 cursor-pointer;
}
</style>
