import { useFormRules } from '@/composables/use-form-rules'
import { EnableStatusOptions, dataScopeOptions } from '@/modules/system/enum'
const { requiredRule } = useFormRules()
export const roleModel: Api.System.RoleOperateParams = {
  menuIds: [],
  roleName: '',
  roleKey: '',
  roleSort: 1,
  menuCheckStrictly: true,
  status: '0',
  dataScope: '1',
  remark: '',
}

/** form items */
export const formItems: Array<Saber.AppForm.FormItemType> = [
  {
    formItemConfig: {
      label: '角色名称',
      prop: 'roleName',
      rules: [requiredRule('角色名称不能为空')],
    },
    which: 'el-input',
    placeholder: '请输入角色名称',
    clearable: true,
  },
  {
    formItemConfig: {
      label: '权限字符串',
      prop: 'roleKey',
      sub: '控制器中字符, 如 @SaCheckRole("admin"),格式如 stystem:role:edit',
      rules: [requiredRule('权限字符串不能为空')],
    },
    which: 'el-input',
    placeholder: '请输入角色名称',
    clearable: true,
  },
  {
    formItemConfig: {
      label: '数据权限范围',
      prop: 'dataScope',
    },
    options: dataScopeOptions,
    which: 'el-select',
  },
  {
    span: 12,
    formItemConfig: {
      label: '角色状态',
      prop: 'status',
    },
    options: EnableStatusOptions,
    which: 'saber-radios',
  },
]
