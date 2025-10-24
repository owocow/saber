import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'
import { jsonClone } from '@/packages/utils'
import { SetupStoreId } from '@/enum'
import { createPinia } from 'pinia'

function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[]

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = jsonClone($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}
export const store = createPinia()
export function setupStore(app: App) {
  store.use(resetSetupStore)
  app.use(store)
}
