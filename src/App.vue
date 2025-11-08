<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const link = {
  underline: 'always',
  type: 'primary',
}
const dialog = {
  draggable: false,
  transition: 'slide-up',
}
</script>
<template>
  <el-config-provider :link="link" :dialog="dialog" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
