import type { Directive, DirectiveBinding } from 'vue'
import { useAuth } from '@/packages/hooks'

/**
 * v-auth
 * 权限/角色控制指令，根据用户权限判断是否渲染该元素
 *
 * 使用方式：
 * 1. 权限判断 (默认): v-auth:permission="['sys:user:add']" 或 v-auth="['sys:user:add']"
 * 2. 角色判断: v-auth:role="['admin', 'editor']"
 */
export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, arg } = binding
    const { hasAuth, hasRole } = useAuth()

    // 如果没有传值，不做处理
    if (!value) return

    let isPermitted = false

    // 根据指令参数判断校验类型
    if (arg === 'role') {
      // 角色校验：v-auth:role
      // 只要满足 value 数组中任意一个角色即可
      isPermitted = hasRole(value)
    } else {
      // 权限校验 (默认)：v-auth:permission 或 v-auth
      // 只要满足 value 数组中任意一个权限即可
      isPermitted = hasAuth(value)
    }

    // 如果没有通过权限/角色校验，移除该元素
    if (!isPermitted) {
      el.parentNode?.removeChild(el)
    }
  },
}
