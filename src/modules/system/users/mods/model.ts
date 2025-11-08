import { REG_PHONE, REG_USER_NAME, REG_PWD } from '@/enum/reg'
import { Icon } from '@iconify/vue'
import { _sortAsc } from '@/utils/common'
/**
 * user model
 */
export const userModel: Api.System.UserOperateParams = {
  deptId: null,
  userName: '',
  nickName: '',
  email: '',
  phonenumber: '',
  sex: '0',
  password: '',
  status: '0',
  roleIds: [],
  postIds: [],
  remark: '',
}
/**
 * form items
 */

export interface FormOptionsType {
  roles: Array<any>
  departments?: Array<any>
  operationType: 'add' | 'edit'
}

export const getFormOptions = (options: FormOptionsType): Array<Saber.AppForm.FormItemType> => {
  const { roles, departments, operationType } = options

  const formItems: Array<Saber.AppForm.FormItemType> = [
    {
      span: 12,
      formItemConfig: {
        label: '账户名称',
        prop: 'userName',
        rules: [
          {
            required: true,
            message: '账户名称不能为空',
            trigger: ['change'],
          },
          {
            pattern: REG_USER_NAME,
            message: '账户名称4-16位, 包含汉字、字母、数字、下划线、减号',
            trigger: ['change'],
          },
        ],
      },
      which: 'el-input',
      placeholder: '请输入账户名称',
      clearable: true,
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
      span: 12,
      formItemConfig: {
        label: '昵称',
        prop: 'nickName',
        required: true,
        rules: [{ required: true, message: '昵称不能为空', trigger: 'change' }],
      },
      which: 'el-input',
      placeholder: '请输入昵称',
      clearable: true,
    },
  ]

  // 只在新增时显示密码字段
  if (operationType === 'add') {
    formItems.push({
      formItemConfig: {
        label: '密码',
        prop: 'password',
        required: true,
        rules: [
          { required: true, message: '密码不能为空', trigger: ['change'] },
          { pattern: REG_PWD, message: '密码6-8位, 包含字母、数字、下划线', trigger: ['change'] },
        ],
      },
      which: 'el-input',
      type: 'password',
      placeholder: '请输入密码',
      clearable: true,
      slots: {
        prefix: {
          component: Icon,
          props: {
            icon: 'solar:lock-password-linear',
            width: '18',
            height: '18',
            inline: true,
          },
        },
      },
    })
  }

  // 继续添加其他表单项
  formItems.push(
    {
      span: 12,
      formItemConfig: {
        label: '角色',
        prop: 'roleIds',
        rules: [{ required: true, message: '角色不能为空', trigger: 'change' }],
      },
      which: 'el-select',
      placeholder: '请选择角色',
      multiple: true,
      options: roles,
      props: { label: 'roleName', value: 'roleId' },
      clearable: true,
      'collapse-tags': true,
    },
    {
      span: 12,
      formItemConfig: { label: '部门', prop: 'deptId' },
      which: 'el-tree-select',
      placeholder: '请输入部门名称',
      data: departments,
      clearable: true,
      'check-strictly': true,
      change: (e: any) => {
        console.log('选择部门：', e)
      },
      props: {
        label: 'label',
        value: 'id',
        children: 'children',
      },
    },
    {
      span: 12,
      formItemConfig: {
        label: '手机号',
        prop: 'phonenumber',
        rules: [{ pattern: REG_PHONE, message: '请输入正确的手机号', trigger: 'change' }],
      },
      which: 'el-input',
      placeholder: '请输入手机号',
      clearable: true,
    },
    {
      span: 12,
      formItemConfig: {
        label: '邮箱',
        prop: 'email',
        rules: [{ type: 'email', message: '邮箱地址格式不正确', trigger: ['change'] }],
      },
      which: 'el-input',
      placeholder: '请输入邮箱地址',
      clearable: true,
    },
    {
      formItemConfig: { label: '用户状态', prop: 'status' },
      which: 'saber-radios',
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
      clearable: true,
    },
    {
      formItemConfig: { label: '备注', prop: 'remark' },
      which: 'el-input',
      placeholder: '请输入备注',
      clearable: true,
      type: 'textarea',
    }
  )

  return formItems
}

/** password model */
export const passwordModel = {
  userId: null,
  password: '',
  confirmPassword: '',
}

/** password form items */
export const passwordFormItems = (passwordForm: any): Array<Saber.AppForm.FormItemType> => {
  return [
    {
      formItemConfig: {
        label: '新密码',
        prop: 'password',
        rules: [
          { required: true, message: '新密码不能为空', trigger: ['change'] },
          { pattern: REG_PWD, message: '密码6-8位, 包含字母、数字、下划线', trigger: ['change'] },
        ],
      },
      which: 'el-input',
      type: 'password',
      placeholder: '请输入新密码',
      clearable: true,
      slots: {
        prefix: {
          component: Icon,
          props: {
            icon: 'solar:lock-password-linear',
            width: '18',
            height: '18',
            inline: true,
          },
        },
      },
    },
    {
      formItemConfig: {
        label: '确认密码',
        prop: 'confirmPassword',
        rules: [
          { required: true, message: '确认密码不能为空', trigger: ['change'] },
          {
            validator: (rule: any, value: string, callback: any) => {
              if (value !== passwordForm.password) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
              // callback()
            },
            trigger: ['change'],
          },
        ],
      },
      which: 'el-input',
      type: 'password',
      placeholder: '请再次输入新密码',
      clearable: true,
      slots: {
        prefix: {
          component: Icon,
          props: {
            icon: 'solar:lock-password-linear',
            width: '18',
            height: '18',
            inline: true,
          },
        },
      },
    },
  ]
}
