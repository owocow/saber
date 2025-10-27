# Vitepress相关目录

```tree
Project/
├── .vitepress/
├── ├── confs/    这里放置配置文件，看下代码应该就清楚了
├── ├── ├── cn-zh.ts    中文配置
├── ├── ├── sidebar.ts    这里各模块的菜单配置，模块在 nav.ts下的配置，导航
├── ├── ├── ...
│   ├── theme/
│   │   ├── custom.css    配置了主题色，当然你可以使用chrome开发者工具查看到css var
│   │   └── index.ts    配置此文件后，config.ts 定义的logo等资源 去除 /public 前缀路径
│   ├── config.ts
├── ...
├── src/
├── ...
├── docs/    文档统一放到此处
├── ├── public/    放置静态基础资源
├── ├── components/    对应 src/components/
├── ├── ...    其他文件目录，对应 src/结构
├── ├── index.md    为首页内容，其中包含 layout，还没研究，当前用不到
└── ...
```
