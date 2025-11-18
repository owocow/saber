export function useFormRules() {
  /** required form rule */
  function requiredRule(message = '该项不能为空') {
    return { required: true, message, trigger: ['change', 'blur'] }
  }
  return {
    requiredRule,
  }
}
