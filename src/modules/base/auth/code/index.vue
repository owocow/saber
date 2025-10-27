<script lang="ts" setup></script>
<template>
  <!-- form login start -->
  <div class="form-login">
    <el-input type="text" class="h-[40px] roundedInput mb-3" placeholder="请输入用户名" clearable>
      <template #prefix>
        <el-icon :size="20"><Icon icon="solar:smartphone-linear" /></el-icon>
      </template>
    </el-input>
    <div class="relative mb-8">
      <el-input type="text" class="h-[40px] roundedInput" placeholder="请输入验证码">
        <template #prefix>
          <el-icon :size="20"><Icon icon="solar:smartphone-linear" /></el-icon>
        </template>
      </el-input>
      <el-button class="absolute top-[4px] right-[4px]" plain text round> 获取钉钉/短信验证码 </el-button>
    </div>
    <el-button type="primary" size="large" round class="w-full shadow-md">登录</el-button>
  </div>
  <!-- form login end -->
</template>
