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

Mousetrap.bind(['command+\\', 'ctrl+\\'], function () {
  console.log('⌘ k or control k')

  // return false to prevent default browser behavior
  // and stop event from bubbling
  return false
})
</script>
<template>
  <section
    class="h-full flex-col relative py-[var(--page-header-height)] bg-linear-to-tr from-gray-100 to-white dark:bg-linear-to-r dark:from-dark-750 dark:to-dark-700 rounded-2xl border dark:border-dark-500 border-gray-150 [box-shadow:_8px_2px_12px_-1px_rgba(0,0,0,0.05)]"
  >
    <div
      class="logo flex justify-between items-center absolute w-full h-[var(--page-header-height)] top-0 border-b border-gray-150 dark:border-b-dark-600/80 pl-5 pr-3"
    >
      <router-link to="/">
        <img v-if="isDark" src="@/assets/imgs/logo-white.svg" class="h-6" />
        <img v-else src="@/assets/imgs/logo-multi.svg" class="h-6" />
      </router-link>
      <span
        class="flex size-[32px] items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer rounded-4xl"
      >
        <el-icon :size="20">
          <i-ri-menu-unfold-4-line />
        </el-icon>
      </span>
    </div>
    <el-scrollbar class="h-full">
      <div class="menu-box pb-4 pt-3">
        <ul>
          <!-- <li class="px-3">
            <router-link
              to="/"
              class="flex items-center p-3 hover:bg-gray-150/80 rounded-md hover:text-gray-800 transition"
            >
              <span class="mr-2 size-6 flex items-center justify-center">
                <el-icon>
                  <i-ep-grid />
                </el-icon>
              </span>
              <span>工作台</span>
            </router-link>
          </li> -->
          <li class="px-3 py-[1px]">
            <router-link
              class="flex items-center p-3 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-dark-600 dark:hover:text-dark-50 transition rounded-md"
              to="/"
            >
              <span class="mr-2 size-6 flex items-center justify-center">
                <el-icon>
                  <i-ep-notebook />
                </el-icon>
              </span>
              <span>我的订单</span>
            </router-link>
          </li>
          <!-- <li class="px-3 py-[1px]">
            <router-link
              class="flex items-center p-3 hover:bg-gray-100 rounded-md hover:text-gray-800 transition"
              to="/"
            >
              <span class="mr-2 size-6 flex items-center justify-center">
                <el-icon>
                  <i-ep-goods />
                </el-icon>
              </span>
              <span>我的订单</span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </el-scrollbar>
    <div
      class="flex justify-center items-center absolute w-full h-[var(--page-header-height)] bottom-0 border-t border-gray-150 dark:border-t-dark-600/80"
    >
      <div class="flex rounded-4xl p-[3px]">
        <span
          class="py-2 px-6 cursor-pointer flex items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 rounded-xl mr-1"
          @click="mode = 'auto'"
          :class="mode === 'auto' ? 'bg-gray-100 dark:bg-dark-600' : ''"
        >
          <el-icon :size="16">
            <i-ep-notification />
          </el-icon>
        </span>
        <span
          class="py-2 px-6 cursor-pointer flex items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 rounded-xl mr-1"
          @click="mode = 'light'"
          :class="mode === 'light' ? 'dark:bg-dark-600 bg-gray-100' : ''"
        >
          <el-icon :size="16">
            <i-ep-sunny />
          </el-icon>
        </span>
        <span
          class="py-2 px-6 cursor-pointer flex items-center justify-center transition hover:bg-gray-100 dark:hover:bg-dark-600 rounded-xl"
          :class="mode === 'dark' ? 'dark:bg-dark-600 bg-gray-100' : ''"
        >
          <el-icon :size="16" @click="mode = 'dark'">
            <i-ep-moon />
          </el-icon>
        </span>
      </div>
    </div>
  </section>
</template>
