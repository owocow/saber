import { NoticeTypeOptions, NoticeTypeMap } from './enum'
import { EnableStatusOptions } from '../enum'
import { ElSwitch, ElMessage } from 'element-plus'
import { fetchUpdateNotice } from '@/service/api/system/notice'

export const formItems: Array<Saber.AppForm.FormItemType> = [
  {
    formItemConfig: {
      label: '公告标题',
      prop: 'noticeTitle',
      rules: [{ required: true, message: '请输入公告标题', trigger: 'change' }],
    },
    which: 'el-input',
    placeholder: '请输入公告标题',
    clearable: true,
  },
  {
    span: 12,
    formItemConfig: {
      label: '公告类型',
      prop: 'noticeType',
    },
    which: 'el-select',
    options: NoticeTypeOptions,
  },
  {
    span: 12,
    formItemConfig: {
      label: '公告状态',
      prop: 'status',
    },
    which: 'saber-radios',
    options: EnableStatusOptions,
  },
  {
    formItemConfig: {
      label: '公告内容',
      sub: '请在输入内容提交之前保存内容，避免内容丢失，ctrl+s 快捷保存',
      prop: 'noticeContent',
      rules: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
    },
    which: 'umo-editor',
  },
]

export const noticeModel = {
  noticeTitle: '',
  noticeType: '1',
  noticeContent: '',
  status: '0',
}

export const getColumns = (refresh?: () => void): Array<Saber.AppTable.ColumnsType> => [
  {
    key: 'noticeType',
    label: '公告类型',
    formatter: (row: any) => {
      const type = NoticeTypeMap[row.noticeType]
      return type || '-'
    },
  },
  {
    key: 'noticeTitle',
    label: '公告标题',
  },
  {
    key: 'status',
    label: '状态',
    width: 100,
    render: (row: any) => {
      const handleChange = async (value: string | number | boolean) => {
        const newStatus = value ? '0' : '1'
        try {
          const { error } = await fetchUpdateNotice({
            noticeId: row.noticeId,
            noticeTitle: row.noticeTitle,
            noticeType: row.noticeType,
            noticeContent: row.noticeContent,
            status: newStatus,
          })
          if (!error) {
            ElMessage.success('状态更新成功')
            // 刷新数据
            refresh?.()
          } else {
            ElMessage.error('状态更新失败')
          }
        } finally {
        }
      }

      return (
        <ElSwitch
          modelValue={row.status === '0'}
          onChange={handleChange}
          activeText="在线"
          inactiveText="下线"
          inline-prompt
        />
      )
    },
  },
]

export const searchModel = {
  noticeTitle: null,
  noticeType: null,
}

export const searchFormItems: Array<Saber.AppForm.SearchFormItemType> = [
  {
    which: 'el-input',
    placeholder: '请输入公告标题',
    prop: 'noticeTitle',
    clearable: true,
    style: { width: '220px' },
  },
  {
    which: 'el-select',
    placeholder: '公告类型',
    prop: 'noticeType',
    style: { width: '120px' },
    clearable: true,
    options: NoticeTypeOptions,
  },
]
