import { ElSwitch } from 'element-plus'
import { Icon } from '@iconify/vue'
import { fetchUpdateUserStatus } from '@/service/api/system'
import { ElMessage } from 'element-plus'

export const columns = (refresh?: () => void): Array<Saber.AppTable.ColumnsType> => [
  {
    key: 'nickName',
    label: '用户',
    render: (row: any) => {
      return (
        <div class="flex flex-col">
          <span class="font-medium">{row.userName}</span>
          <span class="text-sm text-gray-500">{row.nickName}</span>
        </div>
      )
    },
  },
  {
    key: 'sex',
    label: '性别',
    width: 80,
    render: (row: any) => {
      return <span>{row.sex === '0' ? '男' : '女'}</span>
    },
  },
  {
    key: 'deptName',
    label: '部门',
  },
  {
    key: 'email',
    label: '邮箱',
  },
  {
    key: 'phonenumber',
    label: '手机号',
  },
  {
    key: 'status',
    label: '状态',
    width: 100,
    render: (row: any) => {
      const handleChange = async (value: string | number | boolean) => {
        const newStatus = value ? '0' : '1'
        try {
          const { error } = await fetchUpdateUserStatus({
            userId: row.userId,
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
          activeText="启用"
          inactiveText="停用"
          inline-prompt
        />
      )
    },
  },
]

export const meta = {
  tableId: 'system-users-table',
  initials: ['nickName', 'deptName', 'phone', 'email', 'status'],
}

export const userSearchModel = {
  userName: '',
  nickName: '',
}

export const searchFormItems: Array<Saber.AppForm.SearchFormItemType> = [
  {
    which: 'el-input',
    placeholder: '请输入用户名称',
    prop: 'userName',
    clearable: true,
    modleModifiers: { trim: true },
    slots: {
      prefix: {
        component: Icon,
        props: {
          icon: 'solar:shield-user-linear',
          width: '18',
          height: '18',
          inline: true,
        },
      },
    },
  },
  {
    which: 'el-input',
    placeholder: '请输入用户昵称',
    prop: 'nickName',
    modleModifiers: { trim: true },
    clearable: true,
    slots: {
      prefix: {
        component: Icon,
        props: {
          icon: 'solar:star-fall-linear',
          width: '18',
          height: '18',
          inline: true,
        },
      },
    },
  },
]
