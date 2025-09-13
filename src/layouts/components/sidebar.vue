<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <section>
    <el-button @click="toggleDark()">Togggle</el-button>
  </section>
</template>
