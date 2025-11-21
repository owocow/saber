<script setup lang="ts">
import { useTabStore } from '@/store/modules/tabbar'
import { useRoute } from 'vue-router'
import { useRouterPush } from '@/utils/router'
import { ref, reactive, watch, onMounted, nextTick, onUnmounted } from 'vue'
import type { ElScrollbar } from 'element-plus'

defineOptions({
  name: 'AppHeader',
})

const showSidebar = defineModel('showSidebar', { type: Boolean })
const tabStore = useTabStore()
const route = useRoute()

const { routerPushByKey } = useRouterPush(false)

// --- 新增逻辑开始 ---
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const tabContainerRef = ref<HTMLElement>()

// 滚动状态
const scrollState = reactive({
  leftDisabled: true,
  rightDisabled: false,
  showButtons: false,
})

// 初始化
function init() {
  tabStore.initTabStore(route)
}

// 检查是否需要显示滚动按钮
const checkScroll = async () => {
  await nextTick()
  if (!scrollbarRef.value || !tabContainerRef.value) return

  const wrap = scrollbarRef.value.wrapRef
  if (!wrap) return

  // 如果内容宽度大于容器可视宽度，则显示按钮
  scrollState.showButtons = wrap.scrollWidth > wrap.clientWidth

  // 更新禁用状态
  updateScrollStatus(wrap.scrollLeft, wrap.clientWidth, wrap.scrollWidth)
}

// 更新左右按钮的禁用状态
const updateScrollStatus = (scrollLeft: number, clientWidth: number, scrollWidth: number) => {
  scrollState.leftDisabled = scrollLeft <= 0
  // 允许 1px 的误差
  scrollState.rightDisabled = scrollLeft + clientWidth >= scrollWidth - 1
}

// 监听滚动事件
const handleScroll = ({ scrollLeft }: { scrollLeft: number }) => {
  if (!scrollbarRef.value) return
  const wrap = scrollbarRef.value.wrapRef
  if (wrap) {
    updateScrollStatus(scrollLeft, wrap.clientWidth, wrap.scrollWidth)
  }
}

// 左右点击滚动
const scrollBy = (offset: number) => {
  if (!scrollbarRef.value) return
  const wrap = scrollbarRef.value.wrapRef
  if (!wrap) return

  const target = wrap.scrollLeft + offset
  scrollbarRef.value.setScrollLeft(target)
}

// 滚动到当前激活的 Tab
const scrollToActiveTab = async () => {
  await nextTick()
  if (!scrollbarRef.value || !tabContainerRef.value) return

  // 找到当前激活的 tab 元素 (通过 data-path 属性)
  const activeTabEl = tabContainerRef.value.querySelector(`[data-path="${route.fullPath}"]`) as HTMLElement
  if (!activeTabEl) return

  const wrap = scrollbarRef.value.wrapRef
  if (!wrap) return

  // 计算居中位置
  // 目标 scrollLeft = (Tab左偏移) + (Tab宽度/2) - (容器宽度/2)
  const targetLeft = activeTabEl.offsetLeft + activeTabEl.offsetWidth / 2 - wrap.clientWidth / 2

  scrollbarRef.value.setScrollLeft(targetLeft)
}

// 监听路由变化
watch(
  () => route.fullPath,
  async () => {
    tabStore.addTab(route)
    // 路由变化后，检查滚动条状态并定位
    await checkScroll()
    scrollToActiveTab()
  }
)

// 监听 Tabs 数量变化 (比如关闭标签时)，重新计算是否显示按钮
watch(
  () => tabStore.tabs.length,
  () => {
    checkScroll()
  }
)

onMounted(async () => {
  init()
  // 页面加载/刷新后，等待 DOM 渲染完成执行定位
  await checkScroll()
  scrollToActiveTab()
  // 监听窗口大小变化，重新计算按钮显示
  window.addEventListener('resize', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScroll)
})
// --- 新增逻辑结束 ---
</script>
<template>
  <!--  -->
  <header
    class="px-4 flex items-center justify-between h-[var(--page-header-height)] border-b border-gray-200 dark:border-b-dark-800 absolute left-0 right-0 top-0"
  >
    <div
      class="flex size-[28px] items-center justify-center transition bg-gray-100 border-gray-200 dark:bg-dark-800/60 border dark:border-dark-750/50 dark:hover:bg-dark-750 cursor-pointer rounded-lg"
      @click="showSidebar = !showSidebar"
    >
      <el-icon
        :size="20"
        class="transition-all duration-600 ease-in-out"
        :class="showSidebar ? 'rotate-0' : 'rotate-180'"
      >
        <Icon icon="material-symbols-light:menu-open-rounded" />
      </el-icon>
    </div>
    <span class="w-[1px] dark:bg-dark-800 bg-gray-200 h-[16px] ml-3" />
    <!-- 滚动容器部分 -->
    <div class="flex-1 flex justify-between items-center overflow-hidden pl-3">
      <!-- 左侧滚动按钮 -->
      <span
        v-if="scrollState.showButtons"
        class="flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 flex-shrink-0 hover:dark:bg-dark-500/50 cursor-pointer mr-2 transition-opacity duration-300"
        :class="{ 'opacity-30 cursor-not-allowed pointer-events-none': scrollState.leftDisabled }"
        @click="scrollBy(-200)"
      >
        <el-icon>
          <Icon icon="solar:double-alt-arrow-left-line-duotone" />
        </el-icon>
      </span>
      <!-- 实际滚动组件 -->
      <el-scrollbar class="flex-1 tabsWrapBox" id="frameTabbar" ref="scrollbarRef" @scroll="handleScroll">
        <div class="flex items-center h-[var(--page-header-height)]" ref="tabContainerRef">
          <!-- 修改循环源为 tabStore.tabs，并添加 data-path 用于定位 -->
          <template v-for="item in tabStore.tabs" :key="item.id">
            <div
              class="flex items-center text-sm pl-3 border transition-all duration-200 pr-0.5 py-1.5 mr-[2px] hover:dark:bg-dark-800/60 hover:dark:border-dark-750/60 hover:bg-gray-100 hover:border-gray-150 cursor-pointer transform rounded-lg h-[28px]"
              :class="[
                item.id === tabStore.activeTabId
                  ? ' dark:bg-dark-800/60 bg-gray-100 border-gray-150 dark:hover-bg-dark-800 dark:border-dark-750/50'
                  : 'border-transparent',
                item.id === '/home' ? 'pr-3' : '',
              ]"
              :data-path="item.fullPath"
              @click="routerPushByKey(item.routeKey)"
            >
              <span class="text-nowrap mr-0.5 mb-[1px]">{{ item.label }}</span>
              <span
                class="cursor-pointer flex items-center text-gray-400 hover:text-gray-800 transition p-1 rounded-sm dark:text-dark-600 dark:hover:text-dark-300"
                v-if="item.id !== '/home'"
                @click.stop="tabStore.removeTabByRoutePath(item.fullPath)"
              >
                <el-icon :size="16">
                  <Icon icon="material-symbols-light:close" />
                </el-icon>
              </span>
            </div>
          </template>
        </div>
      </el-scrollbar>
      <!-- 右侧滚动按钮 -->
      <span
        v-if="scrollState.showButtons"
        class="flex items-center justify-center w-7 h-[32px] rounded-lg hover:bg-gray-100 hover:dark:bg-dark-500/50 cursor-pointer flex-shrink-0 ml-2 transition-opacity duration-300"
        :class="{ 'opacity-30 cursor-not-allowed pointer-events-none': scrollState.rightDisabled }"
        @click="scrollBy(200)"
      >
        <el-icon>
          <Icon icon="solar:double-alt-arrow-right-line-duotone" />
        </el-icon>
      </span>
    </div>
  </header>
</template>
