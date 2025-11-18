import { MenuTypeOptions, EnableStatusOptions } from '../../../enum'
export const menuModel: CommonType.RecordNullable<
  Pick<
    Api.System.Menu,
    | 'remark'
    | 'menuId'
    | 'parentId'
    | 'menuName'
    | 'orderNum'
    | 'path'
    | 'component'
    | 'queryParam'
    | 'isFrame'
    | 'isCache'
    | 'menuType'
    | 'visible'
    | 'status'
    | 'perms'
    | 'icon'
  >
> = {
  parentId: 0,
  menuName: '',
  orderNum: 1,
  path: '',
  component: '-',
  queryParam: '',
  isFrame: '1',
  isCache: '1',
  menuType: 'C',
  visible: '0',
  status: '0',
  perms: '',
  icon: '',
  remark: '',
}

export interface MenuFormItemType {
  menuTree: any
  editForm: any
}

export const getFormItems = (options?: MenuFormItemType): Array<Saber.AppForm.FormItemType> => {
  const { menuTree, editForm } = options || {}

  const _menuTree = [
    {
      menuId: 0,
      menuName: '根目录',
      children: menuTree || [],
    },
  ]

  const folderItems: Array<Saber.AppForm.FormItemType> = [
    {
      span: 12,
      formItemConfig: {
        label: '上级菜单',
        prop: 'parentId',
        sub: '不选择则为顶级菜单',
      },
      which: 'el-tree-select',
      placeholder: '请选择上级菜单',
      data: _menuTree,
      'check-strictly': true,
      props: {
        label: 'menuName',
        value: 'menuId',
      },
    },
    {
      span: 12,
      formItemConfig: {
        label: '菜单类型',
        prop: 'menuType',
      },
      which: 'saber-radios',
      options: MenuTypeOptions.filter(item => item.value !== 'F'),
    },

    {
      formItemConfig: {
        label: '菜单名称',
        prop: 'menuName',
        rules: [{ required: true, message: '菜单名称不能为空', trigger: 'change' }],
      },
      which: 'el-input',
      placeholder: '请输入菜单名称',
      clearable: true,
    },
    {
      span: 12,
      formItemConfig: {
        label: '是否显示',
        prop: 'visible',
        sub: '是否显示在菜单中',
      },
      which: 'saber-radios',
      options: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ],
    },
    {
      span: 12,
      formItemConfig: {
        label: '状态',
        prop: 'status',
        sub: '停用后将会隐藏以及不可被访问',
      },
      which: 'saber-radios',
      options: EnableStatusOptions,
    },
    {
      span: 12,
      formItemConfig: {
        label: '是否外链',
        prop: 'isFrame',
      },
      which: 'saber-radios',
      options: [
        { label: '否', value: '1' },
        { label: '是', value: '0' },
        { label: 'iframe', value: '2', disabled: editForm.menuType !== 'C' },
      ],
    },
    {
      span: 12,
      formItemConfig: {
        label: '排序',
        prop: 'orderNum',
      },
      which: 'el-input-number',
      style: 'width: 100%',
      min: 0,
    },
    {
      formItemConfig: {
        label: editForm?.isFrame === '0' ? '外链地址' : '路由地址',
        prop: 'path',
        sub: editForm?.isFrame === '0' ? '外链地址, 如: https://www.baidu.com' : '前端路由地址, 如: dashboard/path',
        rules: [{ required: true, message: '外链地址/路由地址不能为空', trigger: 'change' }],
      },
      which: 'el-input',
      placeholder: '请输入路由地址',
      clearable: true,
    },
  ]
  const iframeItems: Array<Saber.AppForm.FormItemType> =
    editForm.isFrame === '2'
      ? [
          {
            formItemConfig: {
              label: 'iframe 地址',
              prop: 'queryParam',
              sub: 'iframe地址, 如: https://www.baidu.com',
            },
            which: 'el-input',
            placeholder: '请输入路由地址',
            clearable: true,
          },
        ]
      : []
  const permsItems: Array<Saber.AppForm.FormItemType> =
    editForm.menuType === 'C'
      ? [
          {
            formItemConfig: {
              label: '权限字符串',
              prop: 'perms',
              sub: '控制器中定义的权限字符，如: system:user:list',
            },
            which: 'el-input',
            placeholder: '请输入权限字符串',
            clearable: true,
          },
        ]
      : []

  return [...folderItems, ...iframeItems, ...permsItems]
}

export const permformItems: Array<Saber.AppForm.FormItemType> = [
  {
    formItemConfig: {
      label: '按钮权限名称',
      prop: 'menuName',
      rules: [{ required: true, message: '按钮权限名称不能为空', trigger: 'change' }],
    },
    which: 'el-input',
    placeholder: '请输入按钮权限名称',
    clearable: true,
  },
  {
    formItemConfig: {
      label: '权限字符串',
      prop: 'perms',
      sub: '控制器中定义的权限字符，如: system:user:query',
      rules: [{ required: true, message: '权限字符串不能为空', trigger: 'change' }],
    },
    which: 'el-input',
    placeholder: '请输入权限字符串',
    clearable: true,
  },
  {
    span: 12,
    formItemConfig: {
      label: '状态',
      prop: 'status',
    },
    which: 'saber-radios',
    options: EnableStatusOptions,
  },
]
