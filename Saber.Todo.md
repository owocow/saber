# Saber Todos

Saber 出自《Fate/stay night》, 真名为阿尔托莉雅·潘德拉贡，即传说中的亚瑟王，Saber 既有国王的威严和悲情，又有少女的纯粹和可爱，本项目使用 Saber 命名用以体现系统的规范与秩序，又不失美丽与纯粹。

### 基础内容

- [x] el-config-provider 的使用场景  
       在页面内使用，包裹内容，则页面内的 Element 元素全部添加 config 的相关属性
- [x] .env 配置
- [ ] 暗黑风格
- [x] 功能模块化划分, 目录在 modules，目录结构为：
  - modules
    - module
      - api
      - router //为本模块自动加载的路由列表
      - views
- [ ] 定义基础颜色主题 及 重置 element-plus 主题

### store 相关

- [ ] 添加基础 store
- [ ] 添加页面 Tabs 页签
- [ ] 角色权限模块、auth directive

### directives

- [ ] 自动添加指令

### 模版相关

- [ ] 添加 Page Layout 及相关组件

### 路由相关

- [x] 自动化加载模块路由 [./src/router/routes.ts]
- [ ] 添加路由守卫
- [x] 添加 Progress 进度条

### 自动化打包、测试、部署

- [ ] 添加哈士奇
- [ ] 自动化测试
- [ ] 自动化部署
