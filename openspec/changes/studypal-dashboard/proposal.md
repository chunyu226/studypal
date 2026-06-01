## Why

当前个人品牌站为纯展示型单页，无法承载学习管理功能。通过引入 Dashboard 布局和学习数据面板，将站点从"名片"升级为"工具"，为用户提供每日学习追踪和规划能力——这是向全栈 AI 学习平台演进的关键第一步。

## What Changes

- **新增依赖**: `react-router-dom` — 实现品牌站（`/`）与 Dashboard（`/dashboard`）的路由分离
- **新增布局组件**: `DashboardLayout` — 左侧固定侧边栏（导航菜单 + 主题切换）+ 右侧内容区（`<Outlet>`）
- **新增首页**: `DashboardHome` — 数据统计卡片 + 每日目标清单 + AI 建议面板 + 周/月趋势图
- **新增数据层**: `src/data/dashboard.ts` — 全部 Mock 数据（统计数字、目标列表、AI 建议、趋势数据）
- **新增图表组件**: `TrendChart` — 使用纯 SVG 绘制折线/柱状趋势图（零依赖）
- **改造**: `App.tsx` — 引入 React Router，`/` 保留品牌站，`/dashboard/*` 渲染 DashboardLayout
- **改造**: 品牌站 Navbar — 添加"进入学习助手"导航项
- **复用**: `useTheme` / `ThemeToggle` / CSS 变量 — 主题系统原样复用
- **复用**: 卡片悬浮特效样式（`hover:scale-[1.03] hover:shadow-xl transition-all`）—— 用于统计卡片

## Capabilities

### New Capabilities

- `routing`: React Router 路由系统，`/` 映射品牌站 Landing Page，`/dashboard` 及子路由映射 Dashboard 模块
- `dashboard-layout`: 左侧固定侧边栏布局，包含导航菜单（概览/课程/笔记/AI 建议/设置）和主题切换入口
- `dashboard-home`: Dashboard 首页，展示学习统计卡片、每日目标清单、AI 学习建议面板、周/月趋势图

### Modified Capabilities

（无——当前无已同步的主规范）

## Impact

- **新增依赖**: `react-router-dom` ^7.x
- **新增文件**:
  - `src/components/DashboardLayout.tsx`
  - `src/components/DashboardHome.tsx`
  - `src/components/TrendChart.tsx`
  - `src/data/dashboard.ts`
- **修改文件**:
  - `src/App.tsx` — 引入 Router，拆分路由
  - `src/components/Navbar.tsx` — 添加 Dashboard 入口链接
  - `package.json` — 添加 `react-router-dom` 依赖
- **不改动**:
  - `Hero.tsx / ProjectShowcase.tsx / AboutSection.tsx / ParticleBackground.tsx` — 品牌站原样保留
  - `useTheme.ts / ThemeToggle.tsx / index.css` — 主题系统原样复用

## Out of Scope

- 后端 API 服务
- AI 对话功能（AI 建议面板使用 Mock 数据）
- 用户认证与登录
- 课程详情页 / 笔记编辑器（侧边栏链接仅为占位）
- 真实数据持久化

## Rollback Plan

低风险变更：品牌站所有文件保持不变，Dashboard 代码完全新增。若出问题——
1. 恢复 `App.tsx` 为此前版本（去除 Router 包裹）
2. 删除 `DashboardLayout / DashboardHome / TrendChart / dashboard.ts`
3. 移除 `react-router-dom` 依赖
4. 品牌站恢复到变更前状态，零数据影响
