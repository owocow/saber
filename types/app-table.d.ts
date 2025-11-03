declare namespace AppTableType {
  type ElementColumn = import('element-plus').TableColumnCtx<any>
  type VNodeChild = import('vue').VNodeChild
  interface ColumnsType extends Partial<ElementColumn> {
    key: string
    render?: (row: any) => VNodeChild
  }
}
