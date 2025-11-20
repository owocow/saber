import DefaultTheme from 'vitepress/theme'
import Tip from './components/Tip.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Tip', Tip)
  },
}
