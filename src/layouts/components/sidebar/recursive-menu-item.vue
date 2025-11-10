<script setup lang="ts">
interface Props {
  items: App.Global.Menu[]
}

defineProps<Props>()

const hasChildren = (item: App.Global.Menu) => {
  return item.children && item.children.length > 0
}
</script>

<template>
  <template v-for="item in items" :key="item.key">
    <!-- 有子菜单 -->
    <el-sub-menu v-if="hasChildren(item)" :index="item.key">
      <template #title>
        <span>{{ item.label }}dd</span>
      </template>
      <!-- 递归调用自身 -->
      <RecursiveMenuItem :items="item.children!" />
    </el-sub-menu>

    <!-- 菜单项 -->
    <el-menu-item v-else :index="item.key" :route="item.routePath">
      <template #title>
        <span>{{ item.label }}dd</span>
      </template>
    </el-menu-item>
  </template>
</template>
