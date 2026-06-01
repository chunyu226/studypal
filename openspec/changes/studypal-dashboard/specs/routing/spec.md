## ADDED Requirements

### Requirement: 双域路由隔离
系统 SHALL 通过 React Router 将品牌站（`/`）和 Dashboard（`/dashboard`）隔离为两个独立路由域，品牌站所有原有内容保持不变。

#### Scenario: 访问根路径
- **WHEN** 用户访问 `/` 或 `/my-website/`
- **THEN** 显示完整的品牌站 Landing Page
- **AND** 品牌站所有原有交互行为正常工作

#### Scenario: 访问 Dashboard
- **WHEN** 用户访问 `/dashboard`
- **THEN** 显示 DashboardLayout（左侧边栏 + 首页统计面板）

#### Scenario: 访问不存在的 Dashboard 子路由
- **WHEN** 用户访问 `/dashboard/unknown`
- **THEN** 页面不崩溃，显示 404 占位页或重定向到 `/dashboard`

#### Scenario: basename 路径匹配
- **WHEN** 应用部署在 GitHub Pages（`/my-website/`）下
- **THEN** 所有路由自动添加 `/my-website` 前缀，刷新页面时路由正常解析

---

### Requirement: 品牌站到 Dashboard 导航
品牌站 Navbar SHALL 包含指向 Dashboard 的导航入口。

#### Scenario: 点击"学习助手"链接
- **WHEN** 用户在品牌站点击 Navbar 中的"学习助手"
- **THEN** 页面切换到 `/dashboard` 路由，显示 Dashboard 布局
