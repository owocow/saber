<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <section class="w-[var(--page-sidebar-width)] border-r-[1px] border-r-gray-300">
    <el-button @click="toggleDark()">Togggle</el-button>
  </section>
</template>
