<template>
  <main class="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center">
    <div class="max-w-[26rem] text-center relative z-10">
      <com-500 />
      <p class="pt-4 text-7xl font-bold text-primary-600 dark:text-primary-500">500</p>
      <p class="pt-4 text-xl font-semibold text-gray-800 dark:text-dark-50">抱歉，我们正在临时装修！</p>
      <p class="pt-2 text-gray-500 dark:text-dark-200">
        🔨 我们的后台地板可能破了个洞，导致服务暂时中断。请给我们一点时间来修补。（这绝对不是你的错！）
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
