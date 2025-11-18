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
      text: '业务文档',
      items: [
        {
          text: 'Common 组件',
          items: [
            { text: 'saber-popover.deperated', link: '/components/common/saber-popover' },
            { text: 'logo', link: '/components/common/logo' },
            { text: 'app-main', link: '/components/common/app-main' },
            { text: 'app-search', link: '/components/common/app-search' },
            { text: 'app-table', link: '/components/common/app-table' },
            { text: 'app-with-sidebar', link: '/components/common/app-with-sidebar' },
            { text: 'saber-info', link: '/components/common/saber-info' },
            { text: 'saber-button', link: '/components/common/saber-button' },
            { text: 'saber-tab-layout', link: '/components/common/saber-tab-layout' },
          ],
        },
        {
          text: 'Biz 组件',
          collapsed: true,
          items: [
            { text: '接口设计规范', link: '/business/backend-design/api-design' },
            { text: '错误码设计规范', link: '/business/backend-design/error-code' },
          ],
        },
      ],
    },
  ],
}
