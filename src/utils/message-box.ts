import { ElMessageBox } from 'element-plus'
import type { ElMessageBoxOptions } from 'element-plus'
import { Icon } from '@iconify/vue'
import { h } from 'vue'

interface SaberMessageBoxOptions extends ElMessageBoxOptions {
  color?: string
  iconifyName?: string
}

export async function confirm(
  message: string,
  title: string = '提示',
  options: SaberMessageBoxOptions = {}
): Promise<boolean> {
  const { color, iconifyName, ...rest } = options
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
