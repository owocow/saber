import { jsonClone } from '@/packages/utils'
import { useLoading, useBoolean } from '@/packages/hooks'

export type MaybePromise<T> = T | Promise<T>
export type ApiFn = (args: any) => Promise<any>
export type TableDataWithIndex<T> = T & { index: number }
export type PaginationConfig = {
  pageSizes?: number[]
  pageSize?: number
  disabled?: boolean
}
export type TableConfig<A extends ApiFn, T, C> = {
  /** 后端API */
  apiFn: A
  /** API的参数 */
  apiParams?: Parameters<A>[0]
  /** transform api response to table data */
  transformer?: Function
  /**
   * 返回数据后的回调
   */
  onFetched?: (data: any) => MaybePromise<void>
  /**
   * 是否立即执行
   *
   * @default true
   */
  immediate?: boolean
  /** 是否禁用分页 */
  paginConfig?: PaginationConfig
}

export function useTable<A extends ApiFn, T, C>(config: TableConfig<A, T, C>) {
  const { loading, startLoading, endLoading } = useLoading()
  const { bool: empty, setBool: setEmpty } = useBoolean()
  const { apiFn, apiParams, transformer, immediate = true, paginConfig } = config
  const params: NonNullable<Parameters<A>[0]> = reactive(jsonClone({ ...apiParams }))
  const data: Ref<any[]> = ref([])
  /**
   * 分页配置
   */
  const { pageSizes, pageSize, disabled: disablePagination = false } = paginConfig || {}
  const pagination = reactive<Saber.AppTable.Pagination>({
    pageSizes: pageSizes || [10, 20, 50, 100],
    pageSize: pageSize || 10,
    currentPage: 1,
    total: 0,
    sizeChange: (size: number) => {
      pagination.pageSize = size
      pagination.currentPage = 1
      updateSearchParams({
        pageNum: pagination.currentPage!,
        pageSize: pagination.pageSize!,
      })
      getData()
    },
    currentPageChange: (page: number) => {
      pagination.currentPage = page
      updateSearchParams({
        pageNum: pagination.currentPage!,
      })
      getData()
    },
  })

  function addIndexToRows(rows: T[]) {
    const current = pagination.currentPage || 1
    const size = pagination.pageSize || 10
    const pageSize = size <= 0 ? 10 : size
    return rows.map((item, index) => {
      return {
        ...item,
        _index: (current - 1) * pageSize + index + 1,
      }
    })
  }

  //   获取数据
  async function getData() {
    startLoading()
    const formattedParams = formatSearchParams(params)
    const response = (await apiFn(formattedParams)) || {}
    const { rows = [], total = 0 } = response?.data || {}
    const _rows = addIndexToRows(rows)
    const transformed = transformer ? transformer(_rows) : _rows
    pagination.total = total
    data.value = transformed
    setEmpty(transformed.length === 0)
    await config.onFetched?.(transformed)
    endLoading()
  }

  function getPaginationParams() {
    if (disablePagination) {
      return {}
    }
    return {
      pageNum: pagination.currentPage!,
      pageSize: pagination.pageSize!,
    }
  }

  function formatSearchParams(params: Record<string, unknown>) {
    let _formattedParams: Record<string, unknown> = {}
    const _params: Record<string, unknown> = Object.assign(getPaginationParams(), params)
    Object.entries(_params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        _formattedParams[key] = value
      }
    })
    return _formattedParams
  }

  /**
   * update search params
   *
   * @param params
   */
  function updateSearchParams(_params: Partial<Parameters<A>[0]>) {
    Object.assign(params, _params)
    getData()
  }

  /** reset search params */
  function resetSearchParams() {
    pagination.currentPage = 1
    const _params = Object.assign({ ...getPaginationParams() }, jsonClone(apiParams))
    Object.assign(params, _params)
    getData()
  }

  if (immediate) {
    getData()
  }

  return {
    loading,
    empty,
    data,
    getData,
    params,
    updateSearchParams,
    resetSearchParams,
    pagination,
    total: computed(() => pagination.total),
  }
}
