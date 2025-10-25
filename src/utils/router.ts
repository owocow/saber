import { useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { router as globalRouter } from '@/router'

export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute
  const routerPush = router.push
  const routerBack = router.back

  async function routerPushByKey(key: string, options?: App.Global.RouterPushOptions) {
    const { query, params } = options || {}
    const routeLocation: RouteLocationRaw = {
      name: key,
    }
    if (Object.keys(query || {}).length) {
      routeLocation.query = query
    }
    if (Object.keys(params || {}).length) {
      routeLocation.params = params
    }
    return routerPush(routeLocation)
  }

  function routerPushByKeyWithMetaQuery(key: string) {
    const allRoutes = router.getRoutes()
    const meta = allRoutes.find(item => item.name === key)?.meta || null

    const query: Record<string, string> = {}

    meta?.query?.forEach((item: Recordable) => {
      query[item.key] = item.value
    })

    return routerPushByKey(key, { query })
  }

  async function toHome() {
    return routerPushByKey('root')
  }

  async function toLogin(loginModule?: UnionKey.LoginModule, redirectUrl?: string) {
    const module = loginModule || 'pwd-login'
    const options: App.Global.RouterPushOptions = {
      params: {
        module,
      },
    }
    const redirect = redirectUrl || route.value.fullPath
    options.query = {
      redirect,
    }
    return routerPushByKey('login', options)
  }

  async function toggleLoginModule(module: UnionKey.LoginModule) {
    const query = route.value.query as Record<string, string>

    return routerPushByKey('login', { query, params: { module } })
  }

  async function redirectFromLogin(needRedirect = true) {
    const redirect = route.value.query?.redirect as string

    if (needRedirect && redirect) {
      await routerPush(redirect)
    } else {
      await toHome()
    }
  }

  return {
    routerPush,
    routerBack,
    routerPushByKey,
    routerPushByKeyWithMetaQuery,
    toLogin,
    toggleLoginModule,
    redirectFromLogin,
    toHome,
  }
}
