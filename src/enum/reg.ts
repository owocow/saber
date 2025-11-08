export const REG_USER_NAME = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/

/** Phone reg */
export const REG_PHONE =
  /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/

/**
 * Password reg
 *
 * 6-18 characters, including letters, numbers, and underscores
 */
export const REG_PWD = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,18}$/

/** Email reg */
export const REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/** Six digit code reg */
export const REG_CODE_SIX = /^\d{6}$/

/** Four digit code reg */
export const REG_CODE_FOUR = /^\d{4}$/

/** Url reg */
export const REG_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/

/** IP address reg */
export const REG_IP =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
/** Zip code reg */
export const REG_ZIP = /^[1-9]\d{5}$/
/** Chinese characters reg */
export const REG_CHINESE = /^[\u4e00-\u9fa5]+$/

const regMap = {
  userName: REG_USER_NAME,
  phone: REG_PHONE,
  password: REG_PWD,
  email: REG_EMAIL,
  codeSix: REG_CODE_SIX,
  codeFour: REG_CODE_FOUR,
  url: REG_URL,
  ip: REG_IP,
  zip: REG_ZIP,
  chinese: REG_CHINESE,
}

export function _is(value: string, reg: (typeof regMap)[keyof typeof regMap]): boolean {
  if (!reg.test(value)) {
    return false
  }
  return true
}
