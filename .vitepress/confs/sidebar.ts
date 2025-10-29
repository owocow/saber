import type { DefaultTheme } from 'vitepress'
export const sidebar: DefaultTheme.Sidebar = {
  '/how-to-write/': [
    {
      text: '文档编写说明',
      items: [
        { text: 'Markdown', link: '/how-to-write/' },
        { text: 'Vitepress目录说明', link: '/how-to-write/vite' },
      ],
    },
  ],
  '/components/': [
    {
      text: '组件说明',
      items: [{ text: 'saber-popover', link: '/components/saber-popover' }],
    },
  ],
  '/business/backend-design': [
    {
      text: '业务文档',
      items: [{ text: '后端基础设计', link: '/business/backend-design' }],
    },
  ],
}
