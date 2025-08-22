import router from '@/router'
// import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import { copyTextToClipboard } from './directives/copy'
import App from './App.vue'
import '@/assets/styles/index.scss'
const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.directive('copy', copyTextToClipboard)
app.use(pinia)
app.use(router)
app.mount('#app')
