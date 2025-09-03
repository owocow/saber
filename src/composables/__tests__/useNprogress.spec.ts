import { describe, it, vi, expect } from 'vitest'
import * as nprogress from 'nprogress'
import { useNProgress } from '../useNprogress'

vi.mock('nprogress', () => ({
  configure: vi.fn(),
  start: vi.fn(),
  done: vi.fn(),
}))

describe('useNProgress', () => {
  it('should configure NProgress on call', () => {
    useNProgress()
    expect(nprogress.configure).toHaveBeenCalledWith({ showSpinner: true })
  })

  it('should call NProgress.start when start is called', () => {
    const { start } = useNProgress()
    start()
    expect(nprogress.start).toHaveBeenCalled()
  })

  it('should call NProgress.done when done is called', () => {
    const { done } = useNProgress()
    done()
    expect(nprogress.done).toHaveBeenCalled()
  })
})
