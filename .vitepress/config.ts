import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists' // 引入插件
import { nav, search, cnZh, sidebar } from './confs'
export default defineConfig({
  lang: 'zh-CN',
  title: 'Saber',
  description: 'Xiaozu 开发文档说明',
  srcDir: './docs',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }]],
  themeConfig: {
    logo: '/logo.svg',
    ...search,
    nav,
    ...cnZh,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/owocow/saber' }],
  },
  markdown: {
    config: md => {
      md.use(taskLists, { enabled: true, label: true })
    },
  },
})
