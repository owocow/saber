<script lang="ts" setup>
const loading = defineModel('loading', { type: Boolean, default: false })
defineOptions({ name: 'SaberTable' })
interface SaberTableProps {
  loading: boolean
}
const props = withDefaults(defineProps<SaberTableProps>(), {
  loading: false,
})
</script>
<template>
  <div></div>
</template>
