declare namespace Saber {
  /** 表格 */
  namespace AppTable {
    type ElementColumn = import('element-plus').TableColumnCtx<any>
    type VNodeChild = import('vue').VNodeChild
    interface ColumnsType extends Partial<ElementColumn> {
      key?: string
      render?: (row: any) => VNodeChild
    }
    interface Pagination {
      currentPage?: number
      pageSize?: number
      total?: number
      disabled?: boolean
      pageSizes?: number[]
      sizeChange?: (size: number) => void
      currentPageChange?: (page: number) => void
    }
  }
  /** 表单 */
  namespace AppForm {
    interface SlotConfig {
      text?: string
      component?: any
      props?: any
      render?: (h: typeof import('vue').h) => import('vue').VNode
    }
    type FormInstance = import('element-plus').FormInstance
    type FormRules = import('element-plus').FormRules
    type FormItemProps = import('element-plus').FormItemProps
    type FormItemConfig = Partial<FormItemProps> & {
      style?: import('vue').CSSProperties
      prop: string
      sub?: string | import('vue').VNodeChild
    }
    type WhichKey = import('@/components/forms/utils').ComponentMapKey
    interface FormItemType<S = string, N = number> {
      span?: N
      formItemConfig: FormItemConfig
      which: WhichKey
      modelModifiers?: {
        number?: boolean
        trim?: boolean
        lazy?: boolean
      }
      slots?: Record<string, SlotConfig>
      [key: string]: any
    }
    interface SearchFormItemType {
      prop: string
      which: WhichKey
      slots?: Record<string, SlotConfig>
      [key: string]: any
    }
  }
}
