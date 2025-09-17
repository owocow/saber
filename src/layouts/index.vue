<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
import Header from './components/header.vue'
</script>
<template>
  <div class="h-screen flex">
    <aside class="w-[var(--page-sidebar-width)] h-screen p-2">
      <SideBar />
    </aside>
    <main class="flex-1 overflow-hidden relative pt-2 h-full pl-1">
      <Header />
      <el-scrollbar>
        <div class="pt-18 px-2">
          <router-view />
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
