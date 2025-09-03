import router from '@/router/index'
// import { createHead } from '@unhead/vue/client'
import { setupStore } from './store'
import { setupRouterGuards } from './router/guards'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.scss'

// 应用初始化
async function initApp() {
  const app = createApp(App)
  // 初始化状态管理
  setupStore(app, router)
  setupRouterGuards(router)
  // 初始化路由
  app.use(router)
  app.mount('#app')
}

void initApp()
