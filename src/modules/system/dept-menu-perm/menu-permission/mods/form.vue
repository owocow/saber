<script lang="ts" setup>
import { useLoading } from '@/packages/hooks'
import { fetchCreateMenu, fetchUpdateMenu } from '@/service/api/system'
import { getFormItems, menuModel } from './model'
import { ElNotification } from 'element-plus'
import pick from 'lodash-es/pick'
const visible = defineModel({ type: Boolean, default: false })
interface Props {
  operationType: 'create' | 'edit'
  rawData?: any
  menuTree?: any[]
  fromScratch?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['submit'])
const { loading, startLoading, endLoading } = useLoading()

const modalTitle = computed(() => (props.operationType === 'create' ? '新增菜单|目录' : '编辑菜单|目录'))

/**form part */
const formRef = ref<Saber.AppForm.FormInstance>()
const menuForm = reactive({ ...menuModel })

/** 初始化 */
function intials() {
  if (props.operationType === 'edit' && props.rawData) {
    Object.assign(menuForm, pick(props.rawData, Object.keys(menuModel)))
  }
  if (props.operationType === 'create' && !props.fromScratch) {
    menuForm.parentId = props.rawData?.menuId || 0
  }
}

/** mounted 加载 */
intials()

watch(
  () => menuForm.menuType,
  () => {
    menuForm.isFrame = '1'
    menuForm.queryParam = ''
  }
)

watch(
  () => menuForm.isFrame,
  () => {
    menuForm.queryParam = ''
  }
)

/** 提交表单 */
const handleSubmit = async () => {
  startLoading()
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    if (props.operationType === 'create') {
      const { error } = await fetchCreateMenu(menuForm)
      if (error) return
      ElNotification.success('创建成功')
    } else {
      const { error } = await fetchUpdateMenu({ ...menuForm, menuId: props.rawData.menuId })
      if (error) return
      ElNotification.success('更新成功')
    }
    emits('submit')
    visible.value = false
  } catch (error) {
    return
  } finally {
    endLoading()
  }
}
</script>
<template>
  <saber-dialog v-model="visible" width="560px" :title="modalTitle">
    <el-form label-position="top" status-icon size="large" :model="menuForm" ref="formRef">
      <el-row :gutter="16">
        <template v-for="item in getFormItems({ menuTree, editForm: menuForm })" :key="item.formItemConfig?.prop">
          <el-col :span="item.span || 24">
            <FormItem
              v-bind="item"
              size="large"
              v-model="menuForm[item.formItemConfig?.prop as keyof typeof menuForm]"
            />
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <el-button class="w-32 saber" size="large" :disabed="loading" @click="visible = false">取 消</el-button>
      <el-button class="w-32" size="large" type="primary" :loading="loading" @click="handleSubmit">确 定</el-button>
    </template>
  </saber-dialog>
</template>
