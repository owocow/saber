import { ElSwitch } from 'element-plus'
import { fetchUpdateRoleStatus } from '@/service/api/system'
import { ElMessage } from 'element-plus'
import { dataScopeEnum } from '../../enum'
import { enumValueToLabel } from '@/utils/common'
import { EnableStatusOptions } from '../../enum'

export const columns = (refresh?: () => void): Array<Saber.AppTable.ColumnsType> => [
  {
    key: 'roleName',
    label: '角色名称',
  },
  {
    key: 'roleKey',
    label: '角色字符串',
  },
  {
    key: 'dataScope',
    label: '数据范围',
    render: (row: any) => {
      return <span>{enumValueToLabel(dataScopeEnum, row.dataScope)}</span>
    },
  },

  {
    key: 'status',
    label: '状态',
    width: 100,
    render: (row: any) => {
      const handleChange = async (value: string | number | boolean) => {
        const newStatus = value ? '0' : '1'
        try {
          const { error } = await fetchUpdateRoleStatus({
            roleId: row.roleId,
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
          disabled={row.superAdmin}
          inactiveText="停用"
          inline-prompt
        />
      )
    },
  },
]

export const meta = {
  tableId: 'system-roles-table',
  initials: ['roleName', 'roleKey', 'dataScope', 'email', 'status'],
}

export const roleSearchModel = {
  roleName: null,
  roleKey: null,
  status: null,
}

export const searchFormItems: Array<Saber.AppForm.SearchFormItemType> = [
  {
    which: 'el-input',
    placeholder: '请输入角色名称',
    prop: 'roleName',
    clearable: true,
    modleModifiers: { trim: true },
    style: { width: '180px' },
  },
  {
    which: 'el-input',
    placeholder: '请输入角色字符串',
    prop: 'roleKey',
    modleModifiers: { trim: true },
    style: { width: '180px' },
    clearable: true,
  },
  {
    which: 'el-select',
    placeholder: '角色状态',
    prop: 'status',
    clearable: true,
    options: EnableStatusOptions,
    style: { width: '120px' },
  },
]
