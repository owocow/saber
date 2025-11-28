<script lang="ts" setup>
import PasswordLogin from './pwd-login/index.vue'
import Wechat from './wechat/index.vue'
import DingTalk from './dingtalk/index.vue'
import Code from './code/index.vue'
import { useDark } from '@vueuse/core'

interface Props {
  /** The login module */
  module?: UnionKey.LoginModule
  modules?: string[] // 添加 modules prop
}

defineProps<Props>()

type LoginType = 'password' | 'wechat' | 'dingTalk' | 'code'
const currentKey = ref<LoginType>('password')
const moduleMap = {
  password: PasswordLogin,
  code: Code,
  wechat: Wechat,
  dingTalk: DingTalk,
}
const isDark = useDark()
const currentComponent = computed(() => moduleMap[currentKey.value])
const changeLoginType = (key: LoginType) => {
  currentKey.value = key
}
</script>
<template>
  <div class="fixed left-0 bottom-0 right-0 top-0">
    <video autoplay muted loop playsinline class="w-full h-full object-cover">
      <source src="/bg-video.webm?url" type="video/webm" />
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
            class="w-1/2 p-[80px] relative overflow-hidden bg-gradient-to-t to-70% from-slate-200 via-slate-100 to-sky-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 rounded-3xl flex flex-col justify-between"
          >
            <!-- 登录主体部分 -->
            <div>
              <div class="mb-6 text-left -mt-6 ml-2">
                <Logo
                  :height="44"
                  icon-color="var(--color-primary-500)"
                  :textColor="isDark ? 'var(--color-dark-300)' : 'var(--color-gray-700)'"
                />
              </div>
              <div class="pt-8">
                <div class="welcome pl-2 mb-8">
                  <h4 class="text-xl font-bold mb-1">欢迎回来</h4>
                  <p class="text-sm">很高兴再次见到你, Have a good day.</p>
                </div>
                <component :is="currentComponent" />
              </div>
            </div>
            <!-- 登录主体部分 end -->
            <div class="loginTypeAndCopy -mb-16 flex flex-col items-center">
              <p class="text-center mb-6 text-gray-500">-- 请选择登录方式 --</p>
              <div class="flex justify-center gap-6 pb-10">
                <div class="loginIcon" @click="changeLoginType('password')">
                  <el-icon :size="32">
                    <Icon icon="ic:baseline-password" />
                  </el-icon>
                </div>
                <div
                  class="flex rounded-xl hover:text-primary-500 cursor-pointer transition-all duration-200"
                  @click="changeLoginType('wechat')"
                >
                  <el-icon :size="32">
                    <Icon icon="ic:baseline-wechat" />
                  </el-icon>
                </div>
                <div
                  class="flex rounded-xl hover:text-primary-500 cursor-pointer transition-all duration-200"
                  @click="changeLoginType('dingTalk')"
                >
                  <el-icon :size="32">
                    <Icon icon="ant-design:dingtalk-circle-filled" />
                  </el-icon>
                </div>
                <div
                  class="flex rounded-xl hover:text-primary-500 cursor-pointer transition-all duration-200"
                  @click="changeLoginType('code')"
                >
                  <el-icon :size="32">
                    <Icon icon="ic:outline-textsms" />
                  </el-icon>
                </div>
              </div>
              <p class="text-xs text-gray-500">Copyright © 2025 小租网络, All Rights Reserved.</p>
            </div>
          </div>
          <div class="w-1/2 px-[80px] text-white flex flex-col justify-end">
            <p class="mb-8 text-xs opacity-70 text-slate-50">真诚，不是华丽的言辞，而是发自内心的尊重和理解</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
