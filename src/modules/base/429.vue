<template>
  <main class="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
    <div class="max-w-[26rem] text-center relative z-10">
      <com-429 />
      <p class="pt-4 text-7xl font-bold text-primary-600 dark:text-primary-500">429</p>
      <p class="pt-4 text-xl font-semibold text-gray-800 dark:text-dark-50">请稍候，目前正在排队！</p>
      <p class="pt-2 text-gray-500 dark:text-dark-200">
        你刚刚按门铃按得太快了，系统需要一点时间来处理前面的请求。请稍作休息，我们会很快为你服务的！
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
