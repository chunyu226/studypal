## Why

当前网站仅有一个 Hero 区域，访问者无法感知站内还有哪些内容。添加顶部导航栏可以提供清晰的站内架构概览，并支持快速切换到不同内容区域，提升单页浏览体验。

## What Changes

- 新增固定在页面顶部的导航栏组件（Navbar）
- 导航栏左侧展示个人品牌名称（"张老师"）
- 导航栏右侧包含三个链接：首页、项目、联系我
- 点击导航链接时平滑滚动到对应的 section
- 页面滚动时导航栏显示背景模糊效果（glassmorphism 风格）
- 导航栏移动端自动折叠为汉堡菜单（维持亮/暗模式支持）

## Capabilities

### New Capabilities

- `navigation`: 页面顶部固定导航栏，包含品牌标识、导航链接、平滑滚动切换和滚动时的背景模糊效果

### Modified Capabilities

（无——当前无现有 spec）

## Impact

- **新增文件**: `src/components/Navbar.tsx` — 导航栏组件
- **修改文件**: `src/App.tsx` — 引入 Navbar 组件，调整页面布局结构
- **样式**: 全部使用 Tailwind CSS，无需额外 CSS 文件

## Out of Scope

- 搜索功能
- 多级下拉菜单
- 用户登录和注册
