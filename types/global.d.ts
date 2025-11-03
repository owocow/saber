declare type Recordable<T = any> = Record<string, T>

declare type Nullable<T = any> = T | null

declare type Unkownable<T = any> = T | unknown

declare type StrNum = string | number

declare type SizeType = 'mini' | 'medium' | 'small' | 'default' | 'large'

declare type Enum<E> = Record<number | string, E> & {
  [k: number]: string
}

declare interface SearchKeyType {
  key: string
  value: string | number | null
}

type FormatterType = (row: any) => string
declare type ColumnsType = Partial<{
  key: string
  width: string | number
  // canFilter: boolean
  label: string
  [key: string]: any
  // propType: 'image' | 'status' | 'format' | 'vhtml' | 'link' | 'component' | 'form-item' | 'comWithRowData'
  // [key: string]: any
  // formatter: FormatterType
  // component: any
}>

declare type FormOptionType<T = string, B = number> = {
  prop: T
  label?: T
  which: T
  span?: B | T
  offset?: B
  class?: T
  style?: Recordable
  labelWidth?: B | T
  attr?: { [key: string]: any }
  rules?: Array<{ [key: string]: any }>
}

declare interface SearchKeyType {
  key: string
  value: string | number | null
}

declare type PagiType = {
  page?: number
  size?: number
  maxSize?: number
}

declare type NorT = string | number | null

declare type RouteParam = string | string[] | number | null | undefined

declare type ValidationItem = {
  prop: string
  type: 'required' | 'rules'
  errorMsg?: string
  func?: Function
}

declare interface LazeFormModalFormOptions {
  validations?: Array<ValidationItem>
  model: any
  createApi?: Function
  updateApi?: Function
  cb?: Function
  paramKeys?: string[]
  fieldOptions: any
  fieldOptionParams?: any[]
  preParams?: any
}

declare type InternalRowData = Record<string, unknown>
