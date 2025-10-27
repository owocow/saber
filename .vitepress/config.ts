import { defineConfig } from 'vitepress'
import { nav, search, cnZh, sidebar } from './confs'
export default defineConfig({
  lang: 'zh-CN',
  title: 'Saber',
  description: 'Xiaozu 开发文档说明',
  srcDir: './docs',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }]],
  themeConfig: {
    logo: '/logo.svg',
    search,
    nav,
    ...cnZh,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/owocow/saber' }],
  },
})
