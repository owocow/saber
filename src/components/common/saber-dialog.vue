<template>
  <el-dialog v-bind="$attrs" modal-class="saber" align-center append-to-body :close-on-click-modal="false">
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
