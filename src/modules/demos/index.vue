<template>
  <app-page-with-side>
    <template #aside>
      <div class="p-4" v-for="item in 200">aside</div>
    </template>
    <p v-for="item in 100">测试</p>
  </app-page-with-side>
</template>
