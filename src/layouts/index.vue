<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
</script>
<template>
  <div class="h-screen flex">
    <aside
      class="w-[var(--page-sidebar-width)] h-screen overflow-hidden bg-white dark:bg-dark-750 border-r border-gray-150 dark:border-dark-600/80"
    >
      <SideBar />
    </aside>
    <main class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white/80 dark:bg-dark-750/80 backdrop-blur-xs backdrop-grayscale relative z-10">
        <section
          class="h-[var(--page-header-height)] px-5 border-b border-gray-150 dark:border-b-dark-600/80 flex items-center justify-between"
        >
          <div class="left-part">
            <span
              class="flex size-[32px] items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-4xl"
            >
              <el-icon :size="20">
                <i-ri-menu-unfold-4-line />
              </el-icon>
            </span>
            <span
              class="flex size-[32px] items-center justify-center dark:hover:bg-dark-600 cursor-pointer rounded-4xl"
              v-if="0"
            >
              <el-icon :size="20">
                <i-ri-menu-fold-4-line />
              </el-icon>
            </span>
          </div>
          <div class="right-part flex">
            <div class="flex items-center pr-2 ml-5 pl-3 relative z-10">
              <el-badge :value="32" class="headerTopBadge" :offset="[18, -2]">
                <span
                  class="size-[32px] flex items-center cursor-pointer justify-center rounded-4xl transition hover:bg-gray-100 dark:hover:bg-dark-600"
                >
                  <el-icon :size="16">
                    <i-ep-bell />
                  </el-icon>
                </span>
              </el-badge>

              <!-- user menu start -->
              <SaberPopover placement="right" :offset-y="11">
                <template #reference>
                  <span
                    class="size-[32px] ml-4 cursor-pointer flex items-center justify-center transition hover:bg-gray-300 dark:hover:bg-dark-600 rounded-4xl"
                  >
                    <el-avatar
                      :size="28"
                      src="https://lumiere-a.akamaihd.net/v1/images/jp20cs_avatar_poster_540_810_0ec51e0c.jpeg"
                    />
                  </span>
                </template>
                <div
                  class="bg-white dark:bg-dark-700 w-[160px] shadow-lg border border-gray-200 dark:border-dark-600 p-2 dark:shadow-none rounded-b-lg"
                >
                  <div
                    class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md"
                  >
                    <el-icon>
                      <i-ep-setting />
                    </el-icon>
                    <span class="ml-3">系统设置</span>
                  </div>
                  <div
                    class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md"
                  >
                    <el-icon>
                      <i-ep-switch-button />
                    </el-icon>
                    <span class="ml-3">退出登录</span>
                  </div>
                </div>
              </SaberPopover>
              <!-- user menu end -->
            </div>
          </div>
        </section>
        <div
          class="h-[44px] border-b border-gray-150 dark:border-b-dark-600/80 overflow-x-auto flex justify-between items-center"
        >
          <span
            class="flex items-center justify-center h-[43px] w-8 bg-gray-50 transition hover:bg-gray-100 dark:bg-dark-500/20 hover:dark:bg-dark-500/50 cursor-pointer"
          >
            <el-icon>
              <i-ep-d-arrow-left />
            </el-icon>
          </span>
          <el-scrollbar class="tabsWrapBox flex-1">
            <div class="flex h-[43px] items-center px-2">
              <div
                class="tabItem flex items-center pl-2 pr-1.5 py-1.5 mr-0.5 bg-gray-100 dark:bg-dark-600/68 cursor-pointer transform rounded-lg"
                v-for="item in 3"
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
          <span
            class="flex items-center justify-center h-[43px] w-8 bg-gray-50 transition hover:bg-gray-100 dark:bg-dark-500/20 hover:dark:bg-dark-500/50 cursor-pointer"
          >
            <el-icon>
              <i-ep-d-arrow-right />
            </el-icon>
          </span>
        </div>
      </header>
      <el-scrollbar class="p-4 pb-0 flex-1">
        <div class="scrollbarInner mb-4">
          <div class="dark:bg-dark-700 p-8 rounded-xl">
            <router-view />
          </div>
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
