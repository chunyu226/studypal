## Context

Dashboard 当前数据来自 Mock，侧边栏为平铺 5 项导航。本次用真实数据库聚合数据替换 Mock，并重构侧边栏为分组结构。

## Goals / Non-Goals

**Goals:**
- 后端 SQL 聚合查询返回学习统计（替代 Mock）
- 学习热力图日历（90 天 GitHub 风格格子）
- 成就徽章系统（10+ 成就，根据用户数据判断解锁状态）
- 侧边栏重构为 3 组导航
- 合并到 main 并部署上线

**Non-Goals:**
- 实时通知 / 数据导出

## Decisions

### 1. 组件层级图

```
App
└── Route "/dashboard" → DashboardLayout (侧边栏重构)
    ├── Sidebar 分组:
    │   ├── 📊 学习数据
    │   │   ├── 概览 → /dashboard
    │   │   └── 统计分析 → /dashboard/analytics ← 新增
    │   ├── 🤖 AI 对话建议 → /dashboard/chat
    │   └── 🎯 学习目标
    │       ├── 课程 → /dashboard/courses
    │       └── 笔记 → /dashboard/notes
    │
    └── <Outlet>
        ├── Route index → DashboardHome (改用 API 数据)
        ├── Route "analytics" → AnalyticsPage (新增)
        │   ├── CalendarHeatmap (90 天格子)
        │   ├── AchievementWall (徽章网格)
        │   └── TrendChart (复用已有组件)
        ├── Route "chat" → ChatPage
        └── ...
```

### 2. AnalyticsPage 布局

```
┌─────────────────────────────────────────────┐
│  统计分析                                    │
├──────────────────┬──────────────────────────┤
│  学习热力图 (90天) │  本周统计               │
│  ┌─┬─┬─┬─┬─┬─┐  │  学习时长: 18.5h          │
│  │ │ │ │ │ │ │  │  完成课程: 3               │
│  │ │ │ │ │ │ │  │  连续打卡: 7天             │
│  └─┴─┴─┴─┴─┴─┘  │                          │
│                  │                          │
├──────────────────┴──────────────────────────┤
│  成就徽章                                    │
│  [🏆 初入江湖] [📚 书虫] [🔥 打卡王者]       │
│  [🔒 学霸] [🔒 全栈大师] ...                │
└─────────────────────────────────────────────┘
```

### 3. 学习热力图 CalendarHeatmap

- 参考 GitHub Contribution Graph 样式
- 90 天 (约 13 周) 网格，每格代表 1 天
- 颜色 4 级渐变：`bg-slate-100` (无数据) → `bg-green-200/400/600/800` (按学习时长)
- 鼠标 hover 显示 tooltip：日期 + 学习时长
- 纯 CSS Grid 实现，零依赖

### 4. 成就系统

成就定义在 `src/data/achievements.ts` 静态文件，后端 API 返回用户每个成就的解锁状态。

| 成就 | 解锁条件 | 图标 |
|------|---------|------|
| 初入江湖 | 完成首次学习 |  🏆 |
| 书虫 | 完成 5 门课程 | 📚 |
| 打卡王者 | 连续打卡 30 天 | 🔥 |
| 学霸 | 累计学习 100 小时 | 💯 |
| 全栈大师 | 完成 20 门课程 | 🧠 |
| 早起鸟 | 早晨学习 10 次 | 🌅 |
| 夜猫子 | 夜间学习 10 次 | 🌙 |
| 坚持就是胜利 | 连续打卡 7 天 | 💪 |
| 知识探索者 | 使用 AI 助手 50 次 | 🔍 |
| 完美一周 | 连续 7 天每天学习 ≥2h | ⭐ |

### 5. 后端统计聚合 API

```python
# GET /api/analytics/overview
{
  "total_hours": 42.5,
  "completed_courses": 8,
  "streak_days": 7,
  "weekly_trend": [...],
  "monthly_trend": [...]
}

# GET /api/analytics/calendar?days=90
{
  "days": [
    {"date": "2026-06-01", "hours": 2.5, "courses": 1},
    ...
  ]
}

# GET /api/analytics/achievements
{
  "achievements": [
    {"id": "first-study", "name": "初入江湖", "icon": "🏆", "unlocked": true, "unlocked_at": "..."},
    {"id": "bookworm", "name": "书虫", "icon": "📚", "unlocked": false, "progress": "3/5"},
    ...
  ]
}
```

由于当前暂无真实学习记录表（仅 users），calendar 和 overview 数据从 Chat 消息活跃度和 Conversation 创建时间推导，作为学习活跃度的替代指标。后续可扩展专用的 `learning_logs` 表。

### 6. 上线部署流程

```
test 分支 → git checkout main → git merge test
→ npm run deploy → gh-pages 分支更新
→ https://chunyu226.github.io/my-website/ 上线
```

## API 端点规范

### GET /api/analytics/overview
- **Headers**: `Authorization: Bearer <token>`
- **Response 200**: `{ total_hours, completed_courses, streak_days, weekly_trend, monthly_trend }`

### GET /api/analytics/calendar
- **Query**: `?days=90`
- **Headers**: `Authorization: Bearer <token>`
- **Response 200**: `{ days: [{date, hours, courses}] }`

### GET /api/analytics/achievements
- **Headers**: `Authorization: Bearer <token>`
- **Response 200**: `{ achievements: [{id, name, icon, unlocked, unlocked_at?, progress?}] }`

## Risks / Trade-offs

- **缺少真实学习记录表** → 用聊天活跃度 + 对话创建时间推导，标注为"学习活跃度"而非精确学习时长。后续添加 `learning_logs` 表后可精确统计
- **部署后后端不可用** → 前端降级为 Mock 数据。API 请求失败时 fallback 到静态数据
