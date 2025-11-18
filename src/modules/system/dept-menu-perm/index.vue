<script lang="ts" setup>
import Roles from './roles/index.vue'
import Departments from './departments/index.vue'
import MenuPermission from './menu-permission/index.vue'

const menus = [
  { key: 'roles', label: '角色管理', component: Roles },
  { key: 'departments', label: '部门管理', component: Departments },
  { key: 'menu-permission', label: '菜单权限', component: MenuPermission },
]
</script>
<template>
  <app-main title="角色部门菜单管理">
    <saber-tab-layout :menus="menus" active-tab="roles" />
  </app-main>
</template>
