import { enumToOptions } from '@/utils/common'
export enum EnableStatusEnum {
  '正常' = '0',
  '停用' = '1',
}
export enum sexEnum {
  '男' = '0',
  '女' = '1',
  '保密' = '2',
}

export enum dataScopeEnum {
  '全部数据权限' = '1',
  '自定数据权限' = '2',
  '本部门数据权限' = '3',
  '本部门及以下数据权限' = '4',
  '仅本人数据权限' = '5',
  '部门及以下或本人数据权限' = '6',
}

export const EnableStatusOptions = enumToOptions(EnableStatusEnum)
export const dataScopeOptions = enumToOptions(dataScopeEnum)

export enum MenuTypeEnum {
  '目录' = 'M',
  '菜单' = 'C',
  '按钮' = 'F',
}

export const MenuTypeOptions = enumToOptions(MenuTypeEnum)
