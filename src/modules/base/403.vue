<template>
  <main class="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
    <div class="max-w-[26rem] text-center relative z-10">
      <com-403 />
      <p class="pt-4 text-7xl font-bold text-primary-600 dark:text-primary-500">403</p>
      <p class="pt-4 text-xl font-semibold text-gray-800 dark:text-dark-50">抱歉，特工</p>
      <p class="pt-2 text-gray-500 dark:text-dark-200">
        你输入的密令（访问权限）似乎还差一个关键词。本区域高度机密，请核对你的身份卡
      </p>
      <div class="mt-8">
        <RouterLink
          to="/"
          class="inline-block rounded-4xl bg-primary-600 px-10 py-3 font-medium text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          返回首页
        </RouterLink>
      </div>
    </div>
  </main>
</template>
