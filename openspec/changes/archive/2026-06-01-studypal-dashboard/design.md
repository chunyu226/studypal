## Context

当前站点为单页品牌站（anchor 滚动导航），需引入 React Router 实现品牌站与 Dashboard 双域共存。Dashboard 采用经典侧边栏布局，所有数据使用 Mock。

## Goals / Non-Goals

**Goals:**
- React Router 实现 `/`（品牌站）与 `/dashboard/*`（Dashboard）路由隔离
- 左侧固定侧边栏，右侧内容区通过 `<Outlet>` 渲染子路由
- Dashboard 首页：统计卡片 + 每日目标 + AI 建议 + 趋势图
- 复用主题系统、CSS 变量、卡片悬浮特效
- 趋势图使用纯 SVG 绘制，零图表库依赖

**Non-Goals:**
- 后端 API / AI 功能 / 用户认证
- 侧边栏子页面（课程/笔记等）的实际内容（仅占位链接）

## Decisions

### 1. 组件层级图

```
App (BrowserRouter, basename="/my-website")
├── Route "/" → BrandPage
│   ├── Navbar (改造: 添加"学习助手"入口)
│   ├── Hero
│   ├── ProjectShowcase
│   ├── AboutSection
│   └── PlaceholderSection #contact
│
└── Route "/dashboard" → DashboardLayout
    ├── Sidebar (固定左侧, w-64)
    │   ├── Logo / 品牌名
    │   ├── NavItem × 5 (概览/课程/笔记/AI建议/设置)
    │   └── ThemeToggle (复用)
    │
    └── <Outlet>
        ├── Route index → DashboardHome
        │   ├── StatsGrid (4 统计卡片)
        │   ├── DailyGoals (清单 + 进度条)
        │   ├── AISuggestions (Mock 建议卡片)
        │   └── TrendChart (SVG 折线图)
        │
        └── Route "*" → 占位页面 (课程/笔记/设置等)
```

### 2. 路由设计

```typescript
// App.tsx
<BrowserRouter basename="/my-website">
  <Routes>
    <Route path="/" element={<BrandPage />} />
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="courses" element={<PlaceholderPage title="课程" />} />
      <Route path="notes" element={<PlaceholderPage title="笔记" />} />
      <Route path="ai" element={<PlaceholderPage title="AI 建议" />} />
      <Route path="settings" element={<PlaceholderPage title="设置" />} />
    </Route>
  </Routes>
</BrowserRouter>
```

`basename="/my-website"` 确保 GitHub Pages 部署路径正确。

### 3. 侧边栏布局方案

固定左侧 256px (`w-64`) 侧边栏，右侧内容区 `ml-64` + `flex-1`。移动端侧边栏默认隐藏，汉堡按钮切换 overlay 模式（复用 Navbar 的 isOpen 逻辑）。

侧边栏高度 `h-screen`，顶部品牌区 + 中间导航菜单 + 底部主题切换。使用 `sticky top-0` 保持固定。

### 4. Dashboard 首页组件拆解

**StatsGrid** — 4 列网格 (`grid-cols-2 lg:grid-cols-4`)：
- 今日学习时长 (h) / 完成课程数 / 连续打卡天数 / 专注指数
- 每张卡片复用 `hover:scale-[1.03] hover:shadow-xl transition-all duration-300` 样式
- 图标使用内联 SVG

**DailyGoals** — 任务清单：
- 5 项目标，每项带 checkbox + 进度百分比
- 总体进度条 (`<div>` 宽度百分比)

**AISuggestions** — Mock 建议卡片：
- 2-3 条学习建议，每条含标题 + 描述 + 标签
- 采用卡片样式，左侧色条装饰

**TrendChart** — 纯 SVG 趋势图：
- 300×150 视口，周/月两个 Tab 切换数据
- 绘制折线 + 填充区域
- X 轴日期标签，Y 轴数值标签
- 零依赖，数据从 `dashboard.ts` mock 获取

### 5. Mock 数据结构

```typescript
interface DashboardData {
  stats: { studyHours, completedCourses, streakDays, focusScore }
  dailyGoals: { id, title, completed, progress }[]
  aiSuggestions: { id, title, description, tag }[]
  weeklyTrend: { date, value }[]
  monthlyTrend: { date, value }[]
}
```

### 6. 品牌站 Navbar 改造

在 NAV_ITEMS 后追加一个"学习助手"入口，使用 `<Link to="/dashboard">` 替代 `<button>`（因为是跨路由跳转而非页内锚点）。

## API 端点规范

本变更无 API 端点。所有数据来自 `src/data/dashboard.ts` 静态 Mock。

## Risks / Trade-offs

- **GitHub Pages SPA 刷新 404** → 在 `public/` 添加 `404.html` redirect 脚本（标准 SPA fallback 方案）
- **basename="/my-website" 配置散落** → 集中在 `vite.config.ts` (base) 和 `BrowserRouter` (basename) 两处，通过注释提醒保持同步
- **移动端侧边栏遮挡内容** → 使用 overlay 模式 + backdrop 遮罩，点击遮罩关闭
