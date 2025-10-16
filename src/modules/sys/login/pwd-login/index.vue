<script lang="ts" setup>
import { usePwdLoginModel } from './model'
const loginForm = reactive({ ...usePwdLoginModel })
const disabled = computed(() => !loginForm.username || !loginForm.password)
</script>
<template>
  <div class="form-login">
    <el-input
      type="text"
      v-model="loginForm.username"
      class="h-[40px] roundedInput mb-3"
      placeholder="请输入用户名"
      clearable
    >
      <template #prefix>
        <el-icon :size="20"><i-ep-user /></el-icon>
      </template>
    </el-input>
    <div class="mb-8">
      <el-input
        type="password"
        class="h-[40px] roundedInput"
        v-model="loginForm.password"
        placeholder="请输入密码"
        show-password
      >
        <template #prefix>
          <el-icon :size="20"><i-solar-password-linear /></el-icon>
        </template>
      </el-input>
    </div>
    <el-button type="primary" size="large" round class="w-full shadow-md" :disabled="disabled">登录</el-button>
  </div>
</template>
