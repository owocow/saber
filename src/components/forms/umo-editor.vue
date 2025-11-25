<script lang="ts" setup>
import type { UmoEditorOptions } from '@umoteam/editor'
import { UmoEditor } from '@umoteam/editor'
import { useDark } from '@vueuse/core'
import { confirm } from '@/utils/message-box'
import { fetchBatchDeleteOss, fetchUploadFile } from '@/service/api/system/oss'

defineOptions({
  name: 'UmoDocEditor',
})

const isDark = useDark()
const attrs: UmoEditorOptions = useAttrs()
const umoEditorRef = ref<InstanceType<typeof UmoEditor>>()
const isSaved = ref(false)

const value = defineModel<string>({ required: true, default: '' })

watch(
  value,
  () => {
    nextTick(() => {
      if (isSaved.value) {
        isSaved.value = false
        return
      }
      umoEditorRef.value?.setContent(value.value)
    })
  },
  {
    immediate: true,
  }
)

async function handleSave(content: { html: string }) {
  isSaved.value = true
  value.value = content.html
  return true
}

async function handleFileUpload(file: File) {
  const { error, data } = await fetchUploadFile(file)
  if (error) throw new Error(error.message || '上传失败')

  return {
    id: data.ossId,
    url: data.url,
  }
}

async function handleFileDelete(id: CommonType.IdType) {
  const confirmed = await confirm('确认删除文件？')
  if (!confirmed) return false
  const { error } = await fetchBatchDeleteOss([id])
  if (error) throw new Error(error.message || '文件删除失败')
  return true
}

defineExpose({
  saveContent: () => umoEditorRef.value?.saveContent(),
})
</script>

<template>
  <div class="umo-editor size-full">
    <UmoEditor
      v-bind="attrs"
      ref="umoEditorRef"
      :theme="isDark ? 'dark' : 'light'"
      @save="handleSave"
      @file-upload="handleFileUpload"
    />
  </div>
</template>

<style>
body .flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.umo-editor .flex-center {
  display: inherit !important;
  align-items: inherit !important;
  justify-content: inherit !important;
}
</style>
