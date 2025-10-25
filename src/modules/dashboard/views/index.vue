<template>
  <div class="flex items-center">
    <span class="text-2xl font-bold mr-4">工作台</span>
    <span class="w-[1px] h-6 bg-gray-150 mr-3 dark:bg-dark-500" />
    <span class="flex text-gray-300 dark:text-dark-400">
      <el-icon :size="16" class="mr-2">
        <Icon icon="solar:location-outline-duotone" />
      </el-icon>
    </span>
    <div class="flex flex-wrap gap-6 items-center">
      <router-link to="/">商品管理</router-link>
      <router-link to="/">类目管理</router-link>
      <router-link to="/">品牌管理</router-link>
      <router-link to="/">租金模版</router-link>
      <router-link to="/">供应商管理</router-link>
      <div
        class="flex items-center bg-success-500 text-white px-2 py-1 rounded-4xl hover:bg-success-600 cursor-pointer transition"
      >
        <Icon icon="mingcute:wechat-miniprogram-fill" />
        <span class="ml-1">小助手</span>
      </div>
    </div>
  </div>
  <!--  -->
  <!-- <div class="p-5" v-for="item in 40">testing p tag</div> -->
</template>
