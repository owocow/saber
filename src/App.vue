<script setup lang="ts">
import { elementSettings as ES } from './assets/element.settings'
</script>
<template>
  <el-config-provider :link="ES.link" :dialog="ES.dialog">
    <router-view />
  </el-config-provider>
</template>
