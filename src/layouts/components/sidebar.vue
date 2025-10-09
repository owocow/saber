<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: 'light',
  },
})
const isDark = useDark()
const isSidebarPinned = defineModel<boolean>({ default: false })
const emits = defineEmits(['hideSidebar'])
</script>
<template>
  <section class="h-full relative py-[var(--page-header-height)]">
    <div
      class="logo flex justify-between items-center absolute w-full h-[var(--page-header-height)] top-0 border-b border-gray-150 dark:border-b-dark-600/80 pl-6 pr-4"
    >
      <router-link to="/">
        <img v-if="isDark" src="@/assets/imgs/logo-white.svg" class="h-6" />
        <img v-else src="@/assets/imgs/logo-multi.svg" class="h-6" />
      </router-link>
      <div class="flex items-center gap-0.5" v-if="!isSidebarPinned">
        <span class="logoMenuItem" @click="emits('hideSidebar', 'inside')">
          <el-icon :size="18">
            <i-ri-menu-unfold-4-line />
          </el-icon>
        </span>
        <span class="logoMenuItem">
          <el-icon :size="18">
            <i-ri-home-9-line />
          </el-icon>
        </span>
      </div>
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
.logoMenuItem {
  @apply flex items-center rounded-xl p-1.5 hover:bg-gray-100 cursor-pointer;
}
</style>
