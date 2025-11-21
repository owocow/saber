import type { Directive } from 'vue'
import { ElMessage } from 'element-plus'

interface ElType extends HTMLElement {
  _clickEvent: () => void
}

export const copy: Directive = {
  mounted(el: ElType, binding) {
    el._clickEvent = () => {
      const text = binding.value
      if (!text) return
      navigator.clipboard.writeText(text).then(
        () => ElMessage.success('复制成功'),
        () => ElMessage.error('复制失败')
      )
    }
    el.addEventListener('click', el._clickEvent)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el._clickEvent)
  },
}
