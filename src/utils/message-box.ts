import { ElMessageBox } from 'element-plus'
import type { ElMessageBoxOptions } from 'element-plus'
import { Icon } from '@iconify/vue'
import { h } from 'vue'

interface SaberMessageBoxOptions extends ElMessageBoxOptions {
  color?: string
  iconifyName?: string
  title?: string
}

export async function confirm(message: string, params?: SaberMessageBoxOptions) {
  const { title = '删除提醒', color, iconifyName, ...rest } = params || {}
  const defaultOptions: ElMessageBoxOptions = {
    customClass: 'saberMessageBox',
    cancelButtonClass: 'saber',
    center: true,
    showClose: false,
    buttonSize: 'large',
    icon: h(Icon, {
      icon: iconifyName || 'solar:danger-triangle-linear',
      color: color || 'var(--el-color-warning)',
    }),
    ...rest,
  }

  try {
    await ElMessageBox.confirm(message, title, defaultOptions)
    return true
  } catch {
    return false
  }
}
