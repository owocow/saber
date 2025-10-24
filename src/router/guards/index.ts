import { type Router } from 'vue-router'
import { useNProgress } from '@/composables/useNprogress'
const { start, done } = useNProgress()
import { createRouteGuard } from './route'

// progress
function initProgressGuard(router: Router) {
  router.beforeEach(to => {
    start()
    return true
  })

  router.afterEach(to => {
    done()
    return true
  })
}

// page title
function initPageTitleGuard(router: Router) {
  router.beforeEach(to => {
    document.title = import.meta.env.VITE_APP_TITLE + ' - ' + (to.meta.title || import.meta.env.VITE_APP_TITLE)
    return true
  })
}

export function setupRouterGuards(router: Router) {
  initProgressGuard(router)
  initPageTitleGuard(router)
  createRouteGuard(router)
}
