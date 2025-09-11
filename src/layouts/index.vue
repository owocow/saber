<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
import TopBar from './components/topbar.vue'
</script>
<template>
  <div class="h-screen flex overflow-hidden">
    <SideBar />
    <main class="flex-1 flex flex-col">
      <header>
        <TopBar />
        <div class="tabs">tabs here</div>
      </header>
      <el-scrollbar>
        <div class="scrollbarInner p-6">
          <router-view />
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
