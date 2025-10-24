import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isCollapsed: null,
  }),
  getters: {
    getIsCollapsed(): string {
      return this.isCollapsed || AppCache.getLocal(MENU_KEY) || 'open'
    },
  },
  actions: {
    toggleMenu(): void {
      this.isCollapsed = this.getIsCollapsed === 'open' ? 'close' : 'open'
      AppCache.setLocal(MENU_KEY, this.isCollapsed)
    },
  },
})
