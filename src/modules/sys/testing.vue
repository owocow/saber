<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const state1 = ref('')
const value1 = ref(1)
const value = ref('')
const date = ref('')
const options = [
  {
    id: 'Option1',
    label: 'Option1',
  },
  {
    id: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    id: 'Option3',
    label: 'Option3',
  },
  {
    id: 'Option4',
    label: 'Option4',
    disabled: true,
  },
  {
    id: 'Option5',
    label: 'Option5',
  },
]
const props = {
  value: 'id',
  label: 'label',
  options: 'options',
  disabled: 'disabled',
}
</script>
<template>
  <main class="m-8 p-9 bg-dark-700">
    <div class="button-example">
      <div class="pb-3">
        <el-button @click="toggleDark()">Toggle Model</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-button text disabled>Testing Text</el-button>
      </div>

      <div class="pb-3">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </div>

      <div class="pb-3">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" round>Danger</el-button>
      </div>
    </div>
    <div class="pb-4">
      <el-input v-model="state1" placeholder="Type something to see the effect" />
    </div>
    <div class="pb-4">
      <el-rate v-model="value1" />
    </div>
    <div class="pb-4">
      <el-date-picker placeholder="choose date" />
    </div>
    <div class="pb-4">
      <el-select-v2 v-model="value" :options="options" placeholder="Please select" style="width: 240px" multiple />
    </div>
    <div class="pb-4">
      <el-row>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="primary" title="Primary Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6" :xl="4">
          <el-result icon="info" title="Info Tip">
            <template #sub-title>
              <p>Using slot as subtitle</p>
            </template>
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
    </div>
    <article>
      <h4 class="text-primary-500 dark:text-amber-500">Appearance</h4>
      <p class="witter-gray-100">
        Customize the appearance of the app. Select Theme colors and mode, to change the look of the app.
      </p>
    </article>
  </main>
</template>
