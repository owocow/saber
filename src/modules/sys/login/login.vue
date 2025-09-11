<script lang="ts" setup>
import useLogin from './useLogin'
const { loginType, toggleLoginType, loginForm, disabled } = useLogin()
</script>
<template>
  <div class="fixed left-0 bottom-0 right-0 top-0 -z-10">
    <video autoplay muted loop playsinline class="w-full h-full object-cover">
      <source src="@/assets/bg-video.webm" type="video/webm" />
      您的浏览器不支持 HTML5 视频。
    </video>
  </div>
  <div class="w-full absolute top-0 left-0 h-full flex flex-row justify-center items-center">
    <div class="p-3 w-[960px] h-[680px] bg-slate-900/5 rounded-4xl">
      <div class="w-full h-full bg-slate-900/5 rounded-4xl p-3">
        <div
          class="w-full flex items-stretch bg-cover bg-center h-full bg-slate-50 rounded-3xl bg-[url('https://images.unsplash.com/photo-1757161969591-874937df864b?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
        >
          <div
            class="w-1/2 p-[80px] relative overflow-hidden bg-gradient-to-t to-70% from-slate-200 via-slate-100 to-sky-100 rounded-3xl flex flex-col justify-between"
          >
            <!-- 右上角切换按钮 START -->
            <div class="absolute right-0 top-0 p-3">
              <div class="cursor-pointer w-[56px] h-[56px]" @click="toggleLoginType">
                <el-icon color="var(--el-color-primary)" :size="56">
                  <i-ic-outline-qrcode v-if="loginType === 'dingtalk'" />
                  <i-ep-message v-else />
                </el-icon>
              </div>
            </div>
            <div class="mask bg-sky-100 w-[120px] h-[120px] absolute rotate-45 right-7 top-7" />
            <!-- 右上角切换按钮 END -->
            <div>
              <div class="mb-6">
                <img src="@/assets/imgs/logo-multi.svg" class="h-[44px]" />
              </div>
              <div class="pt-8">
                <div class="welcome pl-2 mb-8">
                  <h4 class="text-xl font-bold mb-1">欢迎回来</h4>
                  <p class="text-sm">很高兴再次见到你, Have a good day.</p>
                </div>
                <!-- form login start -->
                <div class="form-login" v-if="loginType === 'account'">
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
                  <div class="relative mb-8">
                    <el-input
                      type="text"
                      class="h-[40px] roundedInput"
                      v-model="loginForm.code"
                      placeholder="请输入验证码"
                    >
                      <template #prefix>
                        <el-icon :size="20"><i-ep-cellphone /></el-icon>
                      </template>
                    </el-input>
                    <el-button class="absolute top-[4px] right-[4px]" plain text round> 获取钉钉/短信验证码 </el-button>
                  </div>
                  <el-button type="primary" size="large" round class="w-full shadow-md" :disabled="disabled"
                    >登录</el-button
                  >
                </div>
                <!-- form login end -->
                <!-- qrcode login start -->
                <div v-else class="p-4 bg-white rounded-2xl shadow-md inline-block">
                  <img class="w-[240px]" src="@/assets/imgs/qrcode.png" alt="" />
                </div>
              </div>
            </div>
            <p class="text-xs -mb-12 opacity-40">Copyright © 2025 小租网络, All Rights Reserved.</p>
          </div>
          <div class="w-1/2 px-[80px] text-white flex flex-col justify-end">
            <p class="mb-8 text-xs opacity-70 text-slate-50">真诚，不是华丽的言辞，而是发自内心的尊重和理解</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
