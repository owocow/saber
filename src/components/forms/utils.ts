import {
  ElInput,
  ElSelect,
  ElDatePicker,
  ElInputNumber,
  ElInputTag,
  ElRadio,
  ElRate,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTreeSelect,
  ElUpload,
  ElAutocomplete,
  ElCascader,
  ElCheckbox,
} from 'element-plus'
import saberCheckbox from './saber-checkbox.vue'
import SaberRadios from './saber-radios.vue'
import UnoEditor from './umo-editor.vue'

export type ComponentMapKey =
  | 'el-input'
  | 'el-select'
  | 'el-date-picker'
  | 'el-input-number'
  | 'el-input-tag'
  | 'el-radio'
  | 'el-rate'
  | 'el-slider'
  | 'el-switch'
  | 'el-time-picker'
  | 'el-tree-select'
  | 'el-upload'
  | 'el-autocomplete'
  | 'el-cascader'
  | 'el-checkbox'
  | 'saber-checkbox'
  | 'saber-radios'
  | 'umo-editor'

const componentMap: Record<ComponentMapKey, Component> = {
  'el-input': ElInput,
  'el-select': ElSelect,
  'el-date-picker': ElDatePicker,
  'el-input-number': ElInputNumber,
  'el-input-tag': ElInputTag,
  'el-radio': ElRadio,
  'el-rate': ElRate,
  'el-slider': ElSlider,
  'el-switch': ElSwitch,
  'el-time-picker': ElTimePicker,
  'el-tree-select': ElTreeSelect,
  'el-upload': ElUpload,
  'el-autocomplete': ElAutocomplete,
  'el-cascader': ElCascader,
  'el-checkbox': ElCheckbox,
  'saber-checkbox': saberCheckbox,
  'saber-radios': SaberRadios,
  'umo-editor': UnoEditor,
}

export function getComponentByWhich(which: ComponentMapKey): any {
  return componentMap[which]
}
