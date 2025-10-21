export default function useLogin() {
  // login type
  const loginType = ref<'dingtalk' | 'account'>('dingtalk')
  const loginForm = reactive({
    username: '',
    code: '',
  })
  const toggleLoginType = () => {
    loginType.value = loginType.value === 'account' ? 'dingtalk' : 'account'
  }

  const disabled = computed(() => !loginForm.username || !loginForm.code)
  return {
    loginType,
    toggleLoginType,
    loginForm,
    disabled,
  }
}
