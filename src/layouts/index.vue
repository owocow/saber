<script lang="ts" setup>
import SideBar from './components/sidebar.vue'
import PageHeader from './components/header.vue'
</script>
<template>
  <div class="h-screen flex">
    <aside class="w-[var(--page-sidebar-width)] dark:bg-dark-750 border-r dark:border-dark-600/80">
      <SideBar />
    </aside>
    <header
      class="fixed top-0 left-[var(--page-sidebar-width)] right-0 z-10 dark:bg-dark-750/80 backdrop-blur-xs backdrop-grayscale"
    >
      <section class="h-[var(--page-header-height)] border-b dark:border-b-dark-600/80">topbar</section>
      <div class="h-[var(--page-tabs-height)] border-b dark:border-b-dark-600/80">Tabs</div>
    </header>
    <main class="flex-1">
      <el-scrollbar class="p-8 pb-0">
        <div class="scrollbarInner pt-[90px] mb-8">
          <!-- <router-view /> -->
          <div class="dark:bg-dark-700 p-8 rounded-xl">
            <div
              class="relative break-words print:border card rounded-lg bg-white shadow-soft dark:bg-dark-700 dark:shadow-none print:shadow-none h-full w-full p-4 sm:px-5 2xl:mx-auto 2xl:max-w-5xl"
            >
              <div class="w-full max-w-3xl 2xl:max-w-5xl">
                <h5 class="text-lg font-medium text-gray-800 dark:text-dark-50">Appearance</h5>
                <p class="mt-0.5 text-balance text-sm text-gray-500 dark:text-dark-200">
                  Customize the appearance of the app. Select Theme colors and mode, to change the look of the app.
                </p>
                <div class="my-5 h-px bg-gray-200 dark:bg-dark-500"></div>
                <div class="space-y-8">
                  <div>
                    <div>
                      <p class="text-base font-medium text-gray-800 dark:text-dark-100">Theme</p>
                      <p class="mt-0.5">You can select a theme color from the list below.</p>
                    </div>
                    <div
                      class="mt-4"
                      id="headlessui-radiogroup-«r9»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«ra»"
                    >
                      <div class="sr-only" id="headlessui-label-«ra»" data-headlessui-state="">
                        Theme Mode (dark or light)
                      </div>
                      <div class="mt-2 flex flex-wrap gap-6">
                        <span
                          class="w-44 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rb»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          ><div
                            class="relative overflow-hidden rounded-lg border-2 bg-dark-900 dark:border-transparent ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700"
                          >
                            <div
                              class="w-full space-y-2 bg-gray-50 p-1.5"
                              style="clip-path: polygon(50% 50%, 100% 0px, 0px 0px, 0% 100%)"
                            >
                              <div class="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150"></div>
                                <div class="h-2 w-11/12 rounded-lg bg-gray-150"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-gray-150"></div>
                                <div class="h-2 w-full rounded-lg bg-gray-150"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-gray-150"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150"></div>
                              </div>
                            </div>
                            <div
                              class="absolute inset-0 space-y-2 p-1.5"
                              style="clip-path: polygon(50% 50%, 100% 0px, 100% 100%, 0% 100%)"
                            >
                              <div class="w-full space-y-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="h-2 w-9/12 rounded-lg bg-dark-400"></div>
                                <div class="h-2 w-11/12 rounded-lg bg-dark-400"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-dark-400"></div>
                                <div class="h-2 w-full rounded-lg bg-dark-400"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-dark-400"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-dark-400"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center">System</p></span
                        ><span
                          class="w-44 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rc»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg border-2 dark:border-transparent">
                            <div class="w-full space-y-2 bg-gray-50 p-1.5">
                              <div class="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150"></div>
                                <div class="h-2 w-11/12 rounded-lg bg-gray-150"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-gray-150"></div>
                                <div class="h-2 w-full rounded-lg bg-gray-150"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-gray-150"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center">Light</p></span
                        ><span
                          class="w-44 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rd»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg border border-transparent bg-dark-900">
                            <div class="w-full space-y-2 bg-dark-900 p-1.5">
                              <div class="w-full space-y-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="h-2 w-9/12 rounded-lg bg-dark-400"></div>
                                <div class="h-2 w-11/12 rounded-lg bg-dark-400"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-dark-400"></div>
                                <div class="h-2 w-full rounded-lg bg-dark-400"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-dark-700 p-2 shadow-xs">
                                <div class="size-4 shrink-0 rounded-full bg-dark-400"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-dark-400"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center">Dark</p></span
                        >
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p class="text-base font-medium text-gray-800 dark:text-dark-100">Primary Color</p>
                      <p class="mt-0.5">Choose a color that will be used as the primary color for your theme.</p>
                    </div>
                    <div
                      class="mt-2"
                      id="headlessui-radiogroup-«re»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«rf»"
                    >
                      <div class="sr-only" id="headlessui-label-«rf»" data-headlessui-state="">
                        Choose Primary Theme Color
                      </div>
                      <div class="mt-2 flex w-fit flex-wrap gap-4 sm:gap-5">
                        <span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-gray-200 dark:border-dark-500"
                          id="headlessui-radio-«rg»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="mask is-diamond size-6 transition-all"
                            style="background-color: oklch(0.585 0.233 277.117)"
                          ></div></span
                        ><span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-primary-500"
                          id="headlessui-radio-«rh»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          ><div
                            class="mask is-diamond size-6 transition-all rotate-45 scale-110"
                            style="background-color: oklch(0.623 0.214 259.815)"
                          ></div></span
                        ><span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-gray-200 dark:border-dark-500"
                          id="headlessui-radio-«ri»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="mask is-diamond size-6 transition-all"
                            style="background-color: oklch(0.723 0.219 149.579)"
                          ></div></span
                        ><span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-gray-200 dark:border-dark-500"
                          id="headlessui-radio-«rj»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="mask is-diamond size-6 transition-all"
                            style="background-color: oklch(0.769 0.188 70.08)"
                          ></div></span
                        ><span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-gray-200 dark:border-dark-500"
                          id="headlessui-radio-«rk»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="mask is-diamond size-6 transition-all"
                            style="background-color: oklch(0.627 0.265 303.9)"
                          ></div></span
                        ><span
                          class="flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden border-gray-200 dark:border-dark-500"
                          id="headlessui-radio-«rl»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="mask is-diamond size-6 transition-all"
                            style="background-color: oklch(0.645 0.246 16.439)"
                          ></div
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p class="text-base font-medium text-gray-800 dark:text-dark-100">Light Color Scheme</p>
                      <p class="mt-0.5">Select light color scheme that will be used for your theme.</p>
                    </div>
                    <div
                      class="mt-4"
                      id="headlessui-radiogroup-«rm»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«rn»"
                    >
                      <div class="sr-only" id="headlessui-label-«rn»" data-headlessui-state="">
                        Theme Light Mode Color Scheme
                      </div>
                      <div class="mt-2 flex flex-wrap gap-4">
                        <span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«ro»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          ><div
                            class="relative overflow-hidden rounded-lg border-2 dark:border-transparent ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700"
                          >
                            <div class="w-full space-y-2 p-1.5" style="background-color: oklch(0.929 0.013 255.508)">
                              <div class="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                                <div
                                  class="h-2 w-9/12 rounded-lg"
                                  style="background-color: oklch(0.704 0.04 256.788)"
                                ></div>
                                <div
                                  class="h-2 w-11/12 rounded-lg"
                                  style="background-color: oklch(0.704 0.04 256.788)"
                                ></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: oklch(0.704 0.04 256.788)"
                                ></div>
                                <div
                                  class="h-2 w-full rounded-lg"
                                  style="background-color: oklch(0.704 0.04 256.788)"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">slate</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rp»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg border-2 dark:border-transparent">
                            <div class="w-full space-y-2 p-1.5" style="background-color: oklch(0.928 0.006 264.531)">
                              <div class="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                                <div
                                  class="h-2 w-9/12 rounded-lg"
                                  style="background-color: oklch(0.707 0.022 261.325)"
                                ></div>
                                <div
                                  class="h-2 w-11/12 rounded-lg"
                                  style="background-color: oklch(0.707 0.022 261.325)"
                                ></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: oklch(0.707 0.022 261.325)"
                                ></div>
                                <div
                                  class="h-2 w-full rounded-lg"
                                  style="background-color: oklch(0.707 0.022 261.325)"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">gray</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rq»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg border-2 dark:border-transparent">
                            <div class="w-full space-y-2 p-1.5" style="background-color: oklch(0.922 0 0)">
                              <div class="w-full space-y-2 rounded-sm bg-white p-2 shadow-xs">
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: oklch(0.708 0 0)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: oklch(0.708 0 0)"></div>
                              </div>
                              <div class="flex items-center space-x-2 rounded-sm bg-white p-2 shadow-xs">
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: oklch(0.708 0 0)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: oklch(0.708 0 0)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">neutral</p></span
                        >
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p class="text-base font-medium text-gray-800 dark:text-dark-100">Dark Color Scheme</p>
                      <p class="mt-0.5">Select dark color scheme that will be used for your theme.</p>
                    </div>
                    <div
                      class="mt-4"
                      id="headlessui-radiogroup-«rr»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«rs»"
                    >
                      <div class="sr-only" id="headlessui-label-«rs»" data-headlessui-state="">
                        Dark Mode Color Schemes
                      </div>
                      <div class="mt-2 flex flex-wrap gap-4">
                        <span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rt»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg">
                            <div class="w-full space-y-2 p-1.5" style="background-color: rgb(10, 16, 20)">
                              <div
                                class="w-full space-y-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(21, 33, 41)"
                              >
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: rgb(80, 104, 119)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: rgb(80, 104, 119)"></div>
                              </div>
                              <div
                                class="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(21, 33, 41)"
                              >
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: rgb(80, 104, 119)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: rgb(80, 104, 119)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">mint</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«ru»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg">
                            <div class="w-full space-y-2 p-1.5" style="background-color: rgb(24, 32, 48)">
                              <div
                                class="w-full space-y-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(36, 49, 74)"
                              >
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: rgb(92, 107, 138)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: rgb(92, 107, 138)"></div>
                              </div>
                              <div
                                class="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(36, 49, 74)"
                              >
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: rgb(92, 107, 138)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: rgb(92, 107, 138)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">navy</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«rv»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          ><div
                            class="relative overflow-hidden rounded-lg ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700"
                          >
                            <div class="w-full space-y-2 p-1.5" style="background-color: rgb(5, 10, 22)">
                              <div
                                class="w-full space-y-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(16, 26, 46)"
                              >
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: rgb(61, 78, 112)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: rgb(61, 78, 112)"></div>
                              </div>
                              <div
                                class="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(16, 26, 46)"
                              >
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: rgb(61, 78, 112)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: rgb(61, 78, 112)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">mirage</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«r10»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg">
                            <div class="w-full space-y-2 p-1.5" style="background-color: rgb(14, 15, 17)">
                              <div
                                class="w-full space-y-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(28, 29, 33)"
                              >
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: rgb(76, 79, 87)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: rgb(76, 79, 87)"></div>
                              </div>
                              <div
                                class="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(28, 29, 33)"
                              >
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: rgb(76, 79, 87)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: rgb(76, 79, 87)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">cinder</p></span
                        ><span
                          class="w-32 cursor-pointer outline-hidden"
                          id="headlessui-radio-«r11»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div class="relative overflow-hidden rounded-lg">
                            <div class="w-full space-y-2 p-1.5" style="background-color: rgb(0, 0, 0)">
                              <div
                                class="w-full space-y-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(19, 19, 20)"
                              >
                                <div class="h-2 w-9/12 rounded-lg" style="background-color: rgb(74, 74, 79)"></div>
                                <div class="h-2 w-11/12 rounded-lg" style="background-color: rgb(74, 74, 79)"></div>
                              </div>
                              <div
                                class="flex items-center space-x-2 rounded-sm p-2 shadow-xs"
                                style="background-color: rgb(19, 19, 20)"
                              >
                                <div
                                  class="size-4 shrink-0 rounded-full"
                                  style="background-color: rgb(74, 74, 79)"
                                ></div>
                                <div class="h-2 w-full rounded-lg" style="background-color: rgb(74, 74, 79)"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-1.5 text-center capitalize">black</p></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-6 h-px bg-gray-200 dark:bg-dark-500"></div>
                <div>
                  <div>
                    <p class="text-base font-medium text-gray-800 dark:text-dark-100">Notification</p>
                    <p class="mt-0.5">Choose Notification position and group style for your application</p>
                  </div>
                  <div class="mt-3">
                    <p>Notification Group Style</p>
                    <div
                      class="mt-3 text-center"
                      id="headlessui-radiogroup-«r12»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«r13»"
                    >
                      <div class="sr-only" id="headlessui-label-«r13»" data-headlessui-state="">
                        Notification Group Style
                      </div>
                      <div class="grid max-w-xl gap-4 sm:grid-cols-2">
                        <span
                          class="cursor-pointer outline-hidden"
                          id="headlessui-radio-«r14»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          ><div
                            class="relative flex h-52 w-full items-center rounded-lg border border-gray-200 px-3 py-4 dark:border-dark-500 ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700"
                          >
                            <div class="w-full -space-y-6">
                              <div
                                class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                                style="transform: scale(0.9)"
                              >
                                <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              </div>
                              <div
                                class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                                style="transform: scale(0.95)"
                              >
                                <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              </div>
                              <div
                                class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                              >
                                <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                                <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              </div>
                            </div>
                          </div>
                          <p class="mt-2">Stacked</p></span
                        ><span
                          class="cursor-pointer outline-hidden"
                          id="headlessui-radio-«r15»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          ><div
                            class="relative flex h-52 w-full flex-col justify-between space-y-2 rounded-lg border border-gray-200 px-4 py-5 dark:border-dark-500"
                          >
                            <div
                              class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                            >
                              <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                            </div>
                            <div
                              class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                            >
                              <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                            </div>
                            <div
                              class="relative flex h-12 w-full flex-col justify-center space-y-2 rounded-sm border bg-white p-2 shadow-[0_4px_12px_#0000001a] dark:border-dark-500 dark:bg-dark-600 dark:shadow-none"
                            >
                              <div class="h-2 w-9/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                              <div class="h-2 w-11/12 rounded-lg bg-gray-150 dark:bg-dark-400"></div>
                            </div>
                          </div>
                          <p class="mt-2">Expanded</p></span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <p>Notification Max Count</p>
                    <div
                      class="mt-3 text-center"
                      id="headlessui-radiogroup-«r16»"
                      role="radiogroup"
                      aria-labelledby="headlessui-label-«r17»"
                    >
                      <div class="sr-only" id="headlessui-label-«r17»" data-headlessui-state="">
                        Notification Max Count
                      </div>
                      <div class="flex w-full max-w-sm space-x-0.5">
                        <span
                          class="flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden text-primary-600 dark:text-primary-400"
                          id="headlessui-radio-«r18»"
                          role="radio"
                          aria-checked="true"
                          tabindex="0"
                          data-headlessui-state="checked"
                          data-checked=""
                          >1</span
                        ><span
                          class="flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden text-gray-500 dark:text-dark-300"
                          id="headlessui-radio-«r19»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          >2</span
                        ><span
                          class="flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden text-gray-500 dark:text-dark-300"
                          id="headlessui-radio-«r1a»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          >3</span
                        ><span
                          class="flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden text-gray-500 dark:text-dark-300"
                          id="headlessui-radio-«r1b»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          >4</span
                        ><span
                          class="flex-1 cursor-pointer border-2 border-transparent border-b-current pb-1 text-base font-medium outline-hidden text-gray-500 dark:text-dark-300"
                          id="headlessui-radio-«r1c»"
                          role="radio"
                          aria-checked="false"
                          tabindex="-1"
                          data-headlessui-state=""
                          >5</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 grid grid-cols-1 md:grid-cols-3">
                    <p class="my-auto">Notification Position:</p>
                    <div class="flex flex-col [&amp;_.suffix]:pointer-events-none mt-1.5 flex-1 md:col-span-2 md:mt-0">
                      <div data-headlessui-state="">
                        <div class="relative">
                          <div class="input-root">
                            <div class="input-wrapper relative">
                              <button
                                class="form-input-base ltr:pr-9 rtl:pl-9 form-input peer border-gray-300 hover:border-gray-400 focus:border-primary-600 dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500"
                                type="button"
                                id="headlessui-listbox-button-«r1f»"
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                data-headlessui-state=""
                              >
                                <span class="block truncate"
                                  ><span class="text-gray-600 dark:text-dark-200"></span><span>Bottom Right</span></span
                                >
                              </button>
                              <div
                                class="suffix ltr:right-0 rtl:left-0 absolute top-0 flex h-full w-9 items-center justify-center transition-colors text-gray-400 peer-focus:text-primary-600 dark:text-dark-300 dark:peer-focus:text-primary-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  class="size-5 transition-transform"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="my-6 h-px bg-gray-200 dark:bg-dark-500"></div>
                <div class="space-y-5">
                  <div class="grid grid-cols-1 md:grid-cols-3">
                    <p class="my-auto">Card Skin:</p>
                    <div class="flex flex-col [&amp;_.suffix]:pointer-events-none mt-1.5 flex-1 md:col-span-2 md:mt-0">
                      <div data-headlessui-state="">
                        <div class="relative">
                          <div class="input-root">
                            <div class="input-wrapper relative">
                              <button
                                class="form-input-base ltr:pr-9 rtl:pl-9 form-input peer border-gray-300 hover:border-gray-400 focus:border-primary-600 dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500"
                                type="button"
                                id="headlessui-listbox-button-«r1j»"
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                data-headlessui-state=""
                              >
                                <span class="block truncate"
                                  ><span class="text-gray-600 dark:text-dark-200"></span><span>Shadow</span></span
                                >
                              </button>
                              <div
                                class="suffix ltr:right-0 rtl:left-0 absolute top-0 flex h-full w-9 items-center justify-center transition-colors text-gray-400 peer-focus:text-primary-600 dark:text-dark-300 dark:peer-focus:text-primary-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  class="size-5 transition-transform"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3">
                    <p class="my-auto">Theme Chrome Mode:</p>
                    <div
                      class="mt-1.5 flex flex-1 items-center justify-between space-x-2 rounded-lg border border-gray-300 px-3 py-2 dark:border-dark-450 md:col-span-2 md:mt-0"
                    >
                      <p class="text-gray-800 dark:text-dark-100">Monochrome Mode</p>
                      <input
                        class="form-switch this:primary bg-gray-300 before:bg-gray-50 checked:bg-this checked:before:bg-white dark:bg-surface-1 dark:before:bg-dark-50 dark:checked:bg-this-light dark:checked:before:bg-white focus-visible:ring-3 focus-visible:ring-this/50 dark:focus-visible:ring-this-light/50"
                        role="switch"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <button
                    class="btn-base btn this:primary bg-this text-white hover:bg-this-darker focus:bg-this-darker active:bg-this-darker/90 disabled:bg-this-light dark:disabled:bg-this-darker"
                    type="button"
                  >
                    Reset Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </main>
  </div>
</template>
