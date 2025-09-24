<template>
  <header
    class="bg-white/90 dark:bg-dark-700/80 backdrop-blur-xs backdrop-grayscale absolute left-2 right-2 z-10 flex items-center justify-between h-[var(--page-header-height)] rounded-2xl px-2 border dark:border-dark-500 border-gray-150 shadow-xl/5 dark:shadow-lg"
  >
    <!-- tabs -->
    <div class="flex-1 flex justify-between items-center overflow-hidden pageTabs">
      <!-- <span
        class="flex items-center justify-center w-7 bg-gray-50 h-[32px] rounded-l-lg border border-gray-200 transition hover:bg-gray-100 dark:bg-dark-500/20 hover:dark:bg-dark-500/50 cursor-pointer"
      >
        <el-icon>
          <i-ep-d-arrow-left />
        </el-icon>
      </span> -->
      <el-scrollbar class="flex-1 tabsWrapBox">
        <div class="flex items-center h-[var(--page-header-height)]">
          <div
            class="tabItem flex items-center pl-2 pr-1.5 py-1.5 mr-0.5 dark:bg-dark-600/68 bg-gray-100 cursor-pointer transform rounded-lg h-[32px]"
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
      <!-- <span
        class="flex items-center justify-center h-[32px] w-7 rounded-r-lg border border-gray-200 bg-gray-50 transition hover:bg-gray-100 dark:bg-dark-500/20 hover:dark:bg-dark-500/50 cursor-pointer"
      >
        <el-icon>
          <i-ep-d-arrow-right />
        </el-icon>
      </span> -->
    </div>
    <!-- tabs end -->
    <div class="flex items-center relative z-10 ml-2">
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
            class="size-[32px] ml-3 cursor-pointer flex items-center justify-center transition hover:bg-gray-300 dark:hover:bg-dark-600 rounded-4xl"
          >
            <el-avatar
              :size="28"
              src="https://lumiere-a.akamaihd.net/v1/images/jp20cs_avatar_poster_540_810_0ec51e0c.jpeg"
            />
          </span>
        </template>
        <div
          class="bg-white dark:bg-dark-700 w-[160px] shadow-xl border border-gray-200 dark:border-dark-600 p-2 dark:shadow-none rounded-lg"
        >
          <div class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md">
            <el-icon>
              <i-ep-setting />
            </el-icon>
            <span class="ml-3">系统设置</span>
          </div>
          <div class="flex items-center py-2 px-3 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-md">
            <el-icon>
              <i-ep-switch-button />
            </el-icon>
            <span class="ml-3">退出登录</span>
          </div>
        </div>
      </SaberPopover>
      <!-- user menu end -->
    </div>
  </header>
</template>
