import router from '@/router/index'
// import { createHead } from '@unhead/vue/client'
import { setupStore } from './store'
import { setUpLoading } from './bootstrap/loading'
import { setupRouterGuards } from './router/guards'
import { createApp } from 'vue'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/index.scss'
import App from './App.vue'

const app = createApp(App)
// loading page
// setUpLoading()
// 初始化状态管理
setupStore(app, router)
setupRouterGuards(router)
// 初始化路由
app.use(router)
app.mount('#app')
