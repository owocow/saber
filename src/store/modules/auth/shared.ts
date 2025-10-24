import { localStg } from '@/utils/storage'

/** Get token */
export function getToken() {
  return localStg.get('token') || ''
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token')
  localStg.remove('refreshToken')
}

/** get userInfo */
export function getUserInfoStorage() {
  return (
    localStg.get('userInfo') || {
      user: undefined,
      roles: [],
      permissions: [],
    }
  )
}
