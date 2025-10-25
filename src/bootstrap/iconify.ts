import type { App } from 'vue'
import { Icon, addCollection, addIcon } from '@iconify/vue'

/**
 * Iconify 配置选项
 */
interface IconifyOptions {
  /** 是否启用离线模式 */
  offline?: boolean
  /** 预加载的图标集 */
  preloadSets?: string[]
  /** 自定义图标 */
  customIcons?: Record<string, any>
}

/**
 * 注册 Iconify 图标组件
 * @param app Vue 应用实例
 * @param options 配置选项
 */
export function setupIconify(app: App, options: IconifyOptions = {}) {
  const { offline = false, preloadSets = [], customIcons = {} } = options

  // 全局注册 Icon 组件
  app.component('Icon', Icon)
  app.component('IconifyIcon', Icon)

  // 注册自定义图标
  Object.entries(customIcons).forEach(([name, data]) => {
    addIcon(name, data)
  })

  // 如果启用离线模式，预加载图标集
  if (offline && preloadSets.length > 0) {
    loadOfflineIcons(preloadSets)
  }
}

/**
 * 加载离线图标数据
 * @param sets 图标集名称数组
 */
async function loadOfflineIcons(sets: string[]) {
  // 使用 import.meta.glob 获取所有图标集
  const iconCollections = import.meta.glob('/node_modules/@iconify-json/*/icons.json')

  for (const set of sets) {
    const path = `/node_modules/@iconify-json/${set}/icons.json`
    const loadIconCollection = iconCollections[path] as (() => Promise<any>) | undefined

    if (loadIconCollection) {
      try {
        // 执行动态导入
        const icons = await loadIconCollection()
        addCollection((icons as any)?.default ?? (icons as any))
        console.log(`✓ 图标集 ${set} 加载成功`)
      } catch (error) {
        console.warn(`✗ 图标集 ${set} 加载失败:`, error)
      }
    } else {
      console.warn(`✗ 图标集 ${set} 未找到`)
    }
  }
}

/**
 * 预加载常用图标（在线模式）
 * @param icons 图标名称数组，格式: 'prefix:name'
 */
export async function preloadIcons(icons: string[]) {
  if (icons.length === 0) return

  try {
    const { loadIcons } = await import('@iconify/vue')
    await loadIcons(icons)
    console.log(`✓ 预加载 ${icons.length} 个图标`)
  } catch (error) {
    console.warn('图标预加载失败:', error)
  }
}

/**
 * 添加自定义图标集
 * @param prefix 图标前缀
 * @param icons 图标数据
 */
export function addCustomIconSet(prefix: string, icons: any) {
  addCollection({
    prefix,
    icons,
  })
}

/** Setup the iconify offline */
// export function setupIconifyOffline() {
//   const { VITE_ICONIFY_URL } = import.meta.env

//   if (VITE_ICONIFY_URL) {
//     addAPIProvider('', { resources: [VITE_ICONIFY_URL] })
//   }
// }
