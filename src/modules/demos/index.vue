<script lang="ts" setup>
const testClick = () => {
  console.log('测试点击')
}
</script>
<template>
  <app-main>
    <div class="flex gap-2 flex-wrap justify-start saberBtnGroup">
      <saber-button v-for="item in 100" btn-type="add" v-copy="`你好`">测试</saber-button>
    </div>
  </app-main>
</template>
