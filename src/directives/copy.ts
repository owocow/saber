import type { Directive } from 'vue'
import { ElMessage } from 'element-plus'

export const copyTextToClipboard: Directive = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      const text = binding.value
      if (!text) return
      navigator.clipboard.writeText(text).then(
        () => ElMessage.success('复制成功'),
        () => ElMessage.error('复制失败')
      )
    })
  },
  beforeUnmount(el) {
    // 可选：移除事件监听
  },
}
