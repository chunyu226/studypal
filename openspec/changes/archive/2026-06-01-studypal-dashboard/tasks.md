## 1. 基础设施

- [x] 1.1 安装 `react-router-dom` 依赖
- [x] 1.2 创建 `src/data/dashboard.ts` — 定义 `DashboardData` 类型 + Mock 数据（统计/目标/建议/趋势）
- [x] 1.3 创建 `src/components/PlaceholderPage.tsx` — 占位页面组件（课程/笔记/AI/设置）

### 验证
`npx tsc --noEmit` 通过，无类型错误

---

## 2. 路由与布局

- [x] 2.1 重构 `src/App.tsx` — 引入 BrowserRouter（basename="/my-website"），拆分为 `/` 品牌站路由和 `/dashboard` Dashboard 路由，品牌站内容抽取为 `BrandPage` 组件
- [x] 2.2 创建 `src/components/DashboardLayout.tsx` — 左侧固定侧边栏（w-64）+ 右侧 `<Outlet>`，移动端 overlay 模式 + 汉堡按钮
- [x] 2.3 改造 `src/components/Navbar.tsx` — 在导航项末尾添加"学习助手"入口（使用 `<Link to="/dashboard">`）

### 验证
`/` 显示品牌站且原有 anchor 滚动正常，`/dashboard` 显示侧边栏布局

---

## 3. Dashboard 首页

- [x] 3.1 创建 `src/components/DashboardHome.tsx` — StatsGrid（4 统计卡片，复用卡片悬浮特效）
- [x] 3.2 实现 DailyGoals 区域 — 5 项目标清单 + 总体进度条
- [x] 3.3 实现 AISuggestions 区域 — 2-3 条 Mock 建议卡片（左侧色条装饰）
- [x] 3.4 创建 `src/components/TrendChart.tsx` — 纯 SVG 折线图（300×150 视口），周/月 Tab 切换，X/Y 轴标签，折线 + 填充区域
- [x] 3.5 组装 DashboardHome — 串接 4 个区域，从 `dashboard.ts` 读取 Mock 数据

### 验证
Dashboard 首页完整渲染统计卡片 + 目标清单 + AI 建议 + 趋势图，周/月切换正常

---

## 4. 部署适配

- [x] 4.1 创建 `public/404.html` — SPA fallback 脚本（GitHub Pages 刷新 404 处理）
- [x] 4.2 验证 `vite build` 产物正常 + `npm run deploy` 部署到 gh-pages

### 验证
部署后访问 `https://chunyu226.github.io/my-website/dashboard` 正常渲染，刷新不 404
