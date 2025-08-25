import { markRaw, type App } from 'vue'
import { createPinia } from 'pinia'
import type { Router } from 'vue-router'
const store = createPinia() //auto imported
export function setupStore(app: App, router: Router) {
  store.use(({ store }) => {
    store.router = markRaw(router)
  })
  app.use(store)
}
export { store }
