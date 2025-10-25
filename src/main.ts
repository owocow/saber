// import { createHead } from '@unhead/vue/client'
import { setupStore } from './store'
import { setUpLoading } from './bootstrap/loading'
import { setupIconify } from './bootstrap/iconify'
import { setupRouter } from './router'
import { createApp } from 'vue'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/index.scss'
import App from './App.vue'

async function bootstrap() {
  setUpLoading()
  const app = createApp(App)
  setupIconify(app, { offline: false })
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

bootstrap()
