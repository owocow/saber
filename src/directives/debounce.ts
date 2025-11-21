import type { Directive, DirectiveBinding } from 'vue'
import { useDebounceFn } from '@vueuse/core'

interface ElType extends HTMLElement {
  _debounceHandler?: (event: Event) => void
}

/**
 * v-debounce
 * 按钮防抖指令，限制点击事件的触发频率
 *
 * 使用方式：
 * v-debounce="handleClick"  // 默认延迟 500ms
 * v-debounce:1000="handleClick"  // 延迟 1000ms
 */
export const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { value, arg } = binding
    // 获取延迟时间，默认为 500ms
    const delay = arg ? Number(arg) : 500

    if (typeof value !== 'function') {
      console.warn('[v-debounce]: value must be a function')
      return
    }

    // 使用 useDebounceFn 创建防抖函数
    const debounced = useDebounceFn(value, delay)

    // 保存处理函数以便后续移除
    el._debounceHandler = debounced

    // 默认绑定 click 事件
    el.addEventListener('click', debounced)
  },
  beforeUnmount(el: ElType) {
    if (el._debounceHandler) {
      el.removeEventListener('click', el._debounceHandler)
      delete el._debounceHandler
    }
  },
}
