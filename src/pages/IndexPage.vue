<script setup lang="ts">
import router from '@/router'
import { ElNotification } from 'element-plus'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

const store = useAppStore()
console.log(store.router.currentRoute.value.path)
const show = ref(false)
const testing = () => (show.value = true)
const msg1 = () => ElNotification.error('ddd')
const navi = () => router.push('/dashboard')
</script>
<template>
  <header class="p-9">
    <h1>Vite + Vue 3 + TypeScript + Tailwind + Playwright Starter Template v{{ store.appMeta.version }}</h1>
    <p>
      Opinionated, production ready template for Vite and Vue 3. MIT licensed,
      <a href="https://github.com/Uninen/vite-ts-tailwind-starter">available on GitHub</a>.
    </p>
    <el-config-provider>
      <el-date-picker type="datetime" placeholder="Select date and time" />
    </el-config-provider>
  </header>

  <main class="p-9">
    <el-button text plain @click="toggleDark()">Testing</el-button>
    <el-button type="primary" @click="testing">Testing</el-button>
    <el-button type="success" @click="testing">Testing</el-button>
    <el-button type="danger" @click="testing">Testing</el-button>
    <el-button type="info" @click="testing">Testing</el-button>
    <el-input />
    <el-dialog title="Testing Modal" v-model="show" :append-to-body="true"> </el-dialog>
    <h2 class="skew-[3.142rad]">Project setup and usage</h2>

    <h4>Install dependencies</h4>

    <pre>pnpm i</pre>

    <!-- <h4 v-copy="'pnpm dev'">Run development server</h4> -->

    <pre>pnpm dev</pre>

    <h4>Run unit + component tests (Vitest)</h4>

    <pre>pnpm test</pre>

    <h4>Run e2e tests (Playwright)</h4>

    <pre>pnpm test-e2e</pre>

    <h4 class="mb-7">Build for production</h4>

    <pre>pnpm build</pre>

    <h4>Other</h4>
    <p>See <code>package.json</code> for <el-link>Link desu!all available commands</el-link>.</p>
    <h2>Notes and further documentation</h2>
    <h3>Typed ENV Variables</h3>
  </main>
</template>
