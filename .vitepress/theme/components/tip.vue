<template>
  <div class="vp-tip">
    <span class="vp-tip__icon" v-html="tipIcon"></span>
    <div class="vp-tip__body">
      <div v-if="title" class="vp-tip__title">{{ title }}</div>
      <div class="vp-tip__content"><slot /></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: { type: String, default: '' },
})

const tipIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 17v-6"/><circle cx="1" cy="1" r="1" fill="currentColor" transform="matrix(1 0 0 -1 11 9)"/></g></svg>'
</script>

<style scoped>
.vp-tip {
  margin: 36px 0;
  display: flex;
  gap: 12px;
  padding: 24px;
  border-radius: 12px;
  align-items: flex-start;
  border: 1px solid #c9ad82;
  background: var(--vp-c-bg-alt);
}
.vp-tip__icon {
  width: 24px;
  flex-shrink: 0;
}
.vp-tip__title {
  font-weight: 600;
  margin-bottom: 4px;
}
.vp-tip__content {
  opacity: 0.7;
  line-height: 1.6;
  font-size: 0.866em;
}
</style>
