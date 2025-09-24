<script lang="ts" setup>
import Mousetrap from 'mousetrap'
import SideBar from './components/sidebar.vue'
import Header from './components/header.vue'
const visible = ref(false)
Mousetrap.bind(['command+]', 'ctrl+]'], () => {
  visible.value = !visible.value
})
</script>
<template>
  <div class="h-screen flex p-2">
    <aside class="w-[var(--page-sidebar-width)] mr-2" v-show="visible">
      <SideBar />
    </aside>
    <main class="flex-1 relative pl-2">
      <Header />
      <el-scrollbar class="-mr-2 pb-2">
        <div class="pt-18 px-2 mr-4 relative">
          <router-view />
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
