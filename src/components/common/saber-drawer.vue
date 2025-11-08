<template>
  <el-drawer v-bind="$attrs" modal-class="saber" append-to-body>
    <el-scrollbar>
      <div class="px-8 py-2"><slot /></div>
    </el-scrollbar>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-drawer>
</template>
