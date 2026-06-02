## Why

Dashboard 当前仅有 Overview 页的 Mock 数据卡片，缺少真实的学习行为追踪和可视化。学习数据分析是平台从"工具"升级为"成长伙伴"的关键——用户需要看到自己的学习足迹、连续打卡热力图和成就解锁，才能保持动力。同时平台已完成核心功能闭环，是时候部署上线了。

## What Changes

- **新增后端统计 API**: GET /api/analytics/overview — 返回学习总时长、完成课程数、连续打卡、周/月趋势（从数据库聚合，不再 Mock）
- **新增学习日历 API**: GET /api/analytics/calendar — 返回近 90 天每日学习状态（时长+完成数），支持前端热力图渲染
- **新增成就系统 API**: GET /api/analytics/achievements — 返回用户已解锁和未解锁的成就列表
- **新增 Dashboard 统计页面**: `/dashboard/analytics` — 学习热力图日历 + 趋势图 + 成就徽章墙
- **重构左侧导航栏**: DashboardLayout 侧边栏改为 3 组：学习数据（概览/统计）、AI 对话建议、学习目标（课程/笔记/目标清单）
- **合并到 main 分支并部署**: test → main merge → `npm run deploy` → 上线至 `https://chunyu226.github.io/my-website/`

## Capabilities

### New Capabilities

- `analytics-api`: FastAPI 学习数据聚合 API，返回 overview 统计、90 天日历数据、成就列表
- `analytics-ui`: Dashboard 统计页面，含学习热力图日历、成就徽章墙、趋势图
- `dashboard-nav`: Dashboard 侧边栏重构为 3 组分类导航

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **新增文件**: `backend/app/routers/analytics.py`、`src/pages/AnalyticsPage.tsx`、`src/components/CalendarHeatmap.tsx`、`src/components/AchievementWall.tsx`、`src/data/achievements.ts`
- **修改文件**: `backend/app/main.py`（注册 analytics router）、`src/App.tsx`（添加路由）、`src/components/DashboardLayout.tsx`（重构侧边栏）、`src/pages/DashboardHome.tsx`（移除 Mock 数据改用 API）
- **部署**: test 分支 merge 到 main → `npm run deploy`

## Out of Scope

- 实时通知
- 数据导出

## Rollback Plan

低风险：前端通过 SPA 路由实现，后端新增独立 router。若出问题，移除 analytics router + 恢复 DashboardLayout 旧版侧边栏即可。部署回滚：`git revert` + 重新 deploy。
