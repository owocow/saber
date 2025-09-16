<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { useElementBounding, useWindowSize } from '@vueuse/core'

type Placement = 'left' | 'right'

const props = defineProps({
  placement: {
    type: String as PropType<Placement>,
    default: 'right',
  },
  offsetX: {
    type: Number,
    default: 8,
  },
  offsetY: {
    type: Number,
    default: 8,
  },
})

const visible = ref(false)
const referenceEl = ref<HTMLElement>()
const targetEl = ref<HTMLElement>()
const referenceBounding = useElementBounding(referenceEl)
const { width } = useWindowSize()

// // 计算弹出层样式
const popoverStyle = computed(() => {
  const map = {
    left: {
      left: `${referenceBounding.left.value - props.offsetX}px`,
    },
    right: {
      right: `${width.value - referenceBounding.right.value - props.offsetX}px`,
      left: 'auto',
    },
  }
  return {
    position: {
      top: `${referenceBounding.top.value + referenceBounding.height.value + props.offsetY}px`,
      ...map[props.placement],
    },
  }
})

// console.log(popoverStyle)

const close = (event?: Event) => {
  if (event?.target && referenceEl.value?.contains(event.target as Node)) {
    return
  }
  visible.value = false
}

const toggle = (event: Event) => {
  event.stopPropagation()
  visible.value = !visible.value
}
</script>

<template>
  <div class="inline-block relative">
    <div ref="referenceEl" @click="e => toggle(e)">
      <slot name="reference" />
    </div>
    <Teleport to="body">
      <OnClickOutside @trigger="close">
        <Transition
          :enter-active-class="`transition duration-150 ease-out`"
          :enter-from-class="`transform translate-y-2 opacity-0`"
          :enter-to-class="'transform translate-y-0 opacity-100'"
          :leave-active-class="`transition duration-50 ease-in`"
          :leave-from-class="'transform translate-y-0 opacity-100'"
          :leave-to-class="`transform translate-y-2 opacity-0`"
        >
          <div v-show="visible" ref="targetEl" class="fixed z-2500" :style="popoverStyle.position">
            <slot name="default" />
          </div>
        </Transition>
      </OnClickOutside>
    </Teleport>
  </div>
</template>
