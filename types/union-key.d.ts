/** The union key namespace */
declare namespace UnionKey {
  type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd' | 'bind-wechat'

  /** Theme scheme */
  type ThemeScheme = 'light' | 'dark' | 'auto'

  /**
   * Reset cache strategy
   *
   * - close: re-cache when close page
   * - refresh: re-cache when refresh page
   */
  type ResetCacheStrategy = 'close' | 'refresh'
  /** Page animate mode */
  type ThemePageAnimateMode = 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out' | 'none'
}
