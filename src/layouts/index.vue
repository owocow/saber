<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import SideBar from './components/sidebar.vue'

// --- 脚本部分无需改动 ---
const isSidebarPinned = ref(true)
const isPeeking = ref(false)
const isSidebarVisible = computed(() => isSidebarPinned.value || isPeeking.value)

function togglePinSidebar() {
  isSidebarPinned.value = !isSidebarPinned.value
  if (isSidebarPinned.value) {
    isPeeking.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', e => {
    if (e.key === '[' && (e.metaKey || e.ctrlKey)) {
      togglePinSidebar()
    }
  })
})
</script>

<template>
  <div class="h-screen w-screen flex overflow-hidden bg-gray-50 dark:bg-dark-800">
    <!-- 侧边栏 -->
    <Transition
      enter-active-class="transition-transform duration-300 ease"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-show="isSidebarVisible"
        @mouseenter="isPeeking = true"
        @mouseleave="isPeeking = false"
        class="fixed left-0 top-0 w-[var(--page-sidebar-width)] z-30 bg-white dark:bg-dark-750 border-r border-gray-150 dark:border-dark-600/80 shadow-lg transition-all duration-300"
        :class="
          isSidebarPinned
            ? 'h-screen'
            : 'top-[var(--page-header-height)] h-[calc(100vh-var(--page-header-height)*2)] rounded-r-lg'
        "
      >
        <!-- 侧边栏内容 -->
        <SideBar @toggle-sidebar="togglePinSidebar" v-model="isSidebarPinned" />
      </aside>
    </Transition>

    <!-- 主内容区域 -->
    <main
      class="flex-1 flex flex-col overflow-hidden transition-all duration-200"
      :class="{ 'ml-[var(--page-sidebar-width)]': isSidebarPinned }"
    >
      <!-- 页面头部 -->
      <header class="h-[var(--page-header-height)] flex-shrink-0 flex items-center px-4">
        <!-- 汉堡菜单按钮：仅在侧边栏隐藏时显示 -->
        <div
          v-show="!isSidebarPinned"
          @click="togglePinSidebar"
          @mouseenter="isPeeking = true"
          class="size-8 flex items-center transition-all duration-400 justify-center rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-600 mr-2"
        >
          <el-icon :size="20"><i-ep-expand /></el-icon>
        </div>
        <!-- 其他头部内容 -->
      </header>

      <!-- 滚动内容区 -->
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <router-view />
      </div>
    </main>
  </div>
</template>
