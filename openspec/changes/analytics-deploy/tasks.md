## 1. 后端统计 API

- [ ] 1.1 创建 `src/data/achievements.ts` — 10 个成就定义（id/name/icon/condition）
- [ ] 1.2 创建 `backend/app/routers/analytics.py` — GET /api/analytics/overview（聚合 Chat/Conversation 数据）、GET /api/analytics/calendar（90 天活跃度）、GET /api/analytics/achievements（成就列表+解锁状态）
- [ ] 1.3 注册 analytics router 到 `backend/app/main.py`

### 验证
curl 3 个 analytics API 端点返回正确 JSON

---

## 2. 统计页面组件

- [ ] 2.1 创建 `src/components/CalendarHeatmap.tsx` — 90 天 Grid 热力图，4 级颜色渐变，hover tooltip
- [ ] 2.2 创建 `src/components/AchievementWall.tsx` — 成就徽章网格，已解锁彩色 + 未解锁灰色锁
- [ ] 2.3 创建 `src/pages/AnalyticsPage.tsx` — 组装热力图 + 本周统计 + 成就墙，从 API 获取数据

### 验证
页面渲染热力图 + 成就徽章，hover 有 tooltip

---

## 3. 侧边栏重构 + 路由

- [ ] 3.1 修改 `src/components/DashboardLayout.tsx` — NAV_ITEMS 改为 3 组结构（学习数据/AI对话建议/学习目标），每组带标题
- [ ] 3.2 修改 `src/App.tsx` — 添加 /dashboard/analytics 路由，保留旧 /dashboard/ai 兼容重定向

### 验证
侧边栏 3 组导航正确展示，点击跳转正常

---

## 4. 部署上线

- [ ] 4.1 TypeScript + Vite 构建验证
- [ ] 4.2 切换到 main 分支，merge test，推送到 GitHub
- [ ] 4.3 执行 `npm run deploy` 部署到 GitHub Pages

### 验证
访问 https://chunyu226.github.io/my-website/ 品牌站 + Dashboard 正常
