<script lang="ts" setup>
defineOptions({ name: 'SaberTabLayout' })
interface MenuType {
  key: string
  label: string
  keepalive?: boolean
  component: any
}
interface Props {
  menus: MenuType[]
  activeTab?: string
}
const props = defineProps<Props>()
const activeTab = ref()
const handleSwitchTab = (key: string) => {
  activeTab.value = key
}

onMounted(() => {
  if (props.activeTab) {
    activeTab.value = props.activeTab
  }
  if (!props.activeTab && props.menus.length > 0) {
    activeTab.value = props.menus[0].key
  }
})

const currentComponent = computed(() => {
  const currentMenu = props.menus.find(menu => menu.key === activeTab.value)
  return currentMenu ? currentMenu.component : null
})

const keepAliveInclude = computed(() => {
  return props.menus.filter(menu => menu.keepalive).map(menu => menu.component.name)
})
</script>
<template>
  <main class="h-full flex flex-col w-full overflow-hidden">
    <header
      class="bg-gray-150/80 inline-flex p-[4px] dark:bg-dark-800 rounded-lg gap-[5px] mb-4 self-start flex-shrink-0"
    >
      <template v-for="menu in props.menus" :key="menu.key">
        <span
          :class="[
            `py-[5px] text-sm px-4 rounded-[4px] cursor-pointer`,
            activeTab === menu.key ? 'bg-white dark:bg-dark-600/70 dark:text-white shadow' : '',
          ]"
          @click="handleSwitchTab(menu.key)"
        >
          {{ menu.label }}
        </span>
      </template>
    </header>
    <section class="flex-1 overflow-hidden pt-2">
      <KeepAlive :include="keepAliveInclude">
        <component :is="currentComponent" />
      </KeepAlive>
    </section>
  </main>
</template>
