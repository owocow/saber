import { EnableStatusOptions } from '@/modules/system/enum'
export const departmentModel: Api.System.DeptOperateParams = {
  parentId: null,
  deptName: '',
  deptCategory: '',
  orderNum: 1,
  leader: null,
  phone: '',
  email: '',
  status: '0',
}

export interface FormOptionsType {
  departments: Api.System.Dept[]
}

export const getFormItems = (options?: FormOptionsType): Array<Saber.AppForm.FormItemType> => {
  const { departments } = options || {}

  return [
    {
      span: 12,
      formItemConfig: {
        label: '上级部门',
        prop: 'parentId',
        rules: [{ required: true, message: '部门名称不能为空', trigger: 'change' }],
      },
      which: 'el-tree-select',
      placeholder: '请输入部门名称',
      data: departments,
      clearable: true,
      'check-strictly': true,
      change: (e: any) => {
        console.log('选择部门：', e)
      },
      props: {
        label: 'deptName',
        value: 'deptId',
      },
    },
    {
      span: 12,
      formItemConfig: {
        label: '部门名称',
        prop: 'deptName',
        rules: [{ required: true, message: '部门名称不能为空', trigger: 'change' }],
      },
      which: 'el-input',
      placeholder: '请输入部门名称',
      clearable: true,
    },
    {
      span: 12,
      formItemConfig: {
        label: '类别编码',
        prop: 'deptCategory',
      },
      which: 'el-input',
      placeholder: '请输入类别编码',
      clearable: true,
    },
    {
      span: 24,
      formItemConfig: {
        label: '部门电话',
        prop: 'phone',
      },
      which: 'el-input',
      placeholder: '请输入部门电话',
      clearable: true,
    },
    {
      span: 24,
      formItemConfig: {
        label: '部门邮箱',
        prop: 'email',
        rules: [{ type: 'email', message: '邮箱地址格式不正确', trigger: ['change'] }],
      },
      which: 'el-input',
      placeholder: '请输入部门邮箱',
      clearable: true,
    },
    {
      span: 24,
      formItemConfig: {
        label: '状态',
        prop: 'status',
      },
      options: EnableStatusOptions,
      which: 'saber-radios',
    },
  ]
}
