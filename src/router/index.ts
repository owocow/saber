import type { App } from 'vue'
import {
  type RouterHistory,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { builtinRoutes } from './routes/constants'
import { setupRouterGuards } from './guards'

const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL } = import.meta.env
// ensure the env value is treated as the known RouterHistoryMode type before indexing
const mode = (VITE_ROUTER_HISTORY_MODE as unknown as Env.RouterHistoryMode) ?? 'history'
const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
}

export const router = createRouter({
  history: historyCreatorMap[mode](VITE_BASE_URL),
  routes: builtinRoutes,
})

export async function setupRouter(app: App) {
  app.use(router)
  setupRouterGuards(router)
  await router.isReady()
}
