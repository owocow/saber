import { mapToOptions } from '@/utils/common'
export const NoticeTypeMap: Record<string, string> = {
  '1': '通知',
  '2': '公告',
}

export const NoticeTypeOptions = mapToOptions(NoticeTypeMap)
