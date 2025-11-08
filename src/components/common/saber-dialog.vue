<template>
  <el-dialog v-bind="$attrs" modal-class="saber" append-to-body>
    <div class="px-8 py-2"><slot /></div>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
