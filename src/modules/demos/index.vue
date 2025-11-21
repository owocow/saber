<script lang="ts" setup>
const content = ref('')
const testClick = () => {
  console.log('test click')
}
</script>
<template>
  <app-main scrollable>
    <div class="flex gap-2 flex-wrap justify-start saberBtnGroup">
      <form-item which="umo-editor" v-model="content" />
      <el-button class="saber" @click="testClick">测试按钮</el-button>
    </div>
  </app-main>
</template>
