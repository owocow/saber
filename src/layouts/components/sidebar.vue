<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { useColorMode } from '@vueuse/core'
import Mousetrap from 'mousetrap'
const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: 'light',
  },
})
const isDark = useDark()
const isSidebarPinned = defineModel('isSidebarPinned', {
  type: Boolean,
  default: false,
})
Mousetrap.bind(['command+\\', 'ctrl+\\'], function () {
  return false
})
// toggle
const emits = defineEmits(['toggleSidebar'])
</script>
<template>
  <section class="h-full flex-col relative py-[var(--page-header-height)]">
    <div
      class="logo flex pl-6 pr-4 justify-between items-center absolute w-full h-[var(--page-header-height)] top-0 border-b border-gray-150 dark:border-b-dark-600/80"
    >
      <router-link to="/">
        <img v-if="isDark" src="@/assets/imgs/logo-white.svg" class="h-7" />
        <img v-else src="@/assets/imgs/logo-multi.svg" class="h-7" />
      </router-link>
      <span
        class="flex size-[32px] items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-4xl"
        @click="emits('toggleSidebar')"
        v-if="!isSidebarPinned"
      >
        <el-icon :size="20">
          <i-ri-menu-unfold-4-line />
        </el-icon>
      </span>
    </div>
    <el-scrollbar class="h-full">
      <div class="menu-box pb-4 pt-3">
        <ul v-for="item in 4">
          <li class="px-3">
            <router-link
              to="/"
              class="flex items-center p-3 hover:bg-gray-150/80 rounded-md hover:text-gray-800 transition dark:hover:bg-dark-600 dark:text-dark-300 dark:hover:text-dark-50"
            >
              <span class="mr-2 size-6 flex items-center justify-center">
                <el-icon>
                  <i-ep-grid />
                </el-icon>
              </span>
              <span>工作台</span>
            </router-link>
          </li>
        </ul>
      </div>
    </el-scrollbar>
    <div
      class="flex justify-center items-center absolute w-full h-[var(--page-header-height)] bottom-0 border-t border-gray-150 dark:border-t-dark-600/80"
    >
      <div class="flex rounded-4xl p-[3px]">
        <span
          class="themeModeItem"
          @click="mode = 'auto'"
          :class="mode === 'auto' ? 'bg-gray-100 dark:bg-dark-600' : ''"
        >
          <el-icon :size="16">
            <i-ep-notification />
          </el-icon>
        </span>
        <span
          class="themeModeItem"
          @click="mode = 'light'"
          :class="mode === 'light' ? 'dark:bg-dark-600 bg-gray-100' : ''"
        >
          <el-icon :size="16">
            <i-ep-sunny />
          </el-icon>
        </span>
        <span class="themeModeItem" :class="mode === 'dark' ? 'dark:bg-dark-600 bg-gray-100' : ''">
          <el-icon :size="16" @click="mode = 'dark'">
            <i-ep-moon />
          </el-icon>
        </span>
      </div>
    </div>
  </section>
</template>
<style scoped>
@reference "@/assets/styles/tailwind.css";
.themeModeItem {
  @apply py-2 px-6 cursor-pointer flex items-center justify-center transition dark:hover:bg-dark-600 hover:bg-gray-100 rounded-xl mr-1;
}
.active {
}
</style>
