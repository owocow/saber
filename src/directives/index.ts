import type { App, Directive } from 'vue'
const modules = import.meta.glob('./*.ts', { eager: true })
export function setupGlobDirectives(app: App) {
  Object.keys(modules).forEach(key => {
    if (key === './index.ts') return
    const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    const module = modules[key] as Record<string, any>
    const directive = (module.default || Object.values(module)[0]) as Directive
    if (directive) {
      app.directive(name, directive)
    }
  })
}
