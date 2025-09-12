<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
import PageHeader from './components/header.vue'
</script>
<template>
  <div class="h-screen flex overflow-hidden">
    <SideBar />
    <main class="flex-1 flex flex-col">
      <PageHeader />
      <div>Tabs</div>
      <el-scrollbar class="pr-4 flex-1 bg-white">
        <div class="scrollbarInner p-6">
          <router-view />
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
