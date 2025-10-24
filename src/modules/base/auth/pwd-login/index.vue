<script lang="ts" setup>
import { useAuthStore } from '@/store/modules/auth'
import { fetchCaptchaCode } from '@/service/api'
import { useLoading } from '@/packages/hooks'
const codeUrl = ref<string>()
const disabled = computed(() => !loginForm.username || !loginForm.password || !loginForm.code)
const { loading: codeLoading, startLoading: startCodeLoading, endLoading: endCodeLoading } = useLoading()
const captchaEnabled = ref<boolean>(false)
const { login } = useAuthStore()

const handleLogin = async () => {
  await login({ ...loginForm })
}

const loginForm: Api.Auth.PwdLoginForm = reactive({
  tenantId: '000000',
  username: 'admin',
  password: 'admin123',
})

async function handleFetchCaptchaCode() {
  startCodeLoading()
  const { data, error } = await fetchCaptchaCode()
  if (!error) {
    captchaEnabled.value = data.captchaEnabled
    if (data.captchaEnabled) {
      loginForm.uuid = data.uuid
      codeUrl.value = `data:image/gif;base64,${data.img}`
    }
  }
  endCodeLoading()
}

handleFetchCaptchaCode()
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
    <div class="mb-3">
      <el-input
        type="password"
        class="h-[40px] roundedInput"
        v-model="loginForm.password"
        placeholder="请输入密码"
        clearable
        show-password
      >
        <template #prefix>
          <el-icon :size="20"><i-solar-password-linear /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="mb-8">
      <el-row :gutter="8">
        <el-col :span="14">
          <el-input class="h-[40px] roundedInput" clearable v-model="loginForm.code" placeholder="试试你的算术">
            <template #prefix>
              <el-icon :size="20"><i-hugeicons-calculate /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div
            class="flex relative h-[40px] border border-gray-200 bg-white rounded-4xl hover:border-gray-400 overflow-hidden justify-center items-center cursor-pointer"
            @click="handleFetchCaptchaCode"
          >
            <img
              v-if="codeUrl"
              :src="codeUrl"
              class="absolute left-0 right-0 top-0 bottom-0 z-10 w-full h-full object-cover"
              height="40"
            />
            <div class="flex text-primary-400">
              <el-icon :size="24">
                <i-svg-spinners-bars-scale />
              </el-icon>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" size="large" round class="w-full shadow-md" @click="handleLogin" :disabled="disabled"
      >登录</el-button
    >
  </div>
</template>
