<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { jsonClone } from '@/packages/utils'
import { passwordModel, passwordFormItems } from './model'
import { fetchResetUserPassword } from '@/service/api/system'
import { ElNotification } from 'element-plus'
import { useLoading } from '@/packages/hooks'

/** Props */
interface Props {
  userId?: number | string | null
}

const props = defineProps<Props>()
const { userId } = toRefs(props)

/** Emits and define models */
const visible = defineModel({ type: Boolean, default: false })

/** 表单数据及基础 */
const passwordForm = reactive({ ...jsonClone(passwordModel) })
const passwordFormRef = ref<Saber.AppForm.FormInstance>()
const { loading, startLoading, endLoading } = useLoading()

/** 提交重置密码 */
const handleResetPassword = async () => {
  const valid = await passwordFormRef.value?.validate()
  if (!valid) return
  if (!userId?.value) return
  startLoading()
  try {
    const { error } = await fetchResetUserPassword({
      userId: userId.value,
      password: passwordForm.password,
    })
    if (error) return
    ElNotification.success({
      title: '恭喜你',
      message: '密码重置成功',
    })
    visible.value = false
  } finally {
    endLoading()
  }
}
/** 组件挂载时初始化 userId */
onMounted(() => {
  if (userId?.value) {
    passwordForm.userId = userId.value as any
  }
})
</script>

<template>
  <el-dialog modal-class="saber" width="460" append-to-body v-model="visible" align-center title="重置密码">
    <el-form
      label-position="top"
      status-icon
      size="large"
      :model="passwordForm"
      ref="passwordFormRef"
      :disabled="loading"
    >
      <template v-for="item in passwordFormItems(passwordForm)" :key="item.formItemConfig?.prop">
        <FormItem v-bind="item" v-model="passwordForm[item.formItemConfig?.prop as keyof typeof passwordForm]" />
      </template>
    </el-form>

    <template #footer>
      <div class="flex justify-center gap-3">
        <el-button class="saber w-36" size="large" plain @click="visible = false" :disabled="loading"> 取消 </el-button>
        <el-button type="primary" class="w-36" size="large" @click="handleResetPassword" :loading="loading">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
