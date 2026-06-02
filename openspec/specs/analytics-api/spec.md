## ADDED Requirements

### Requirement: 学习统计 Overview API
系统 SHALL 提供 GET /api/analytics/overview 返回当前用户的学习统计聚合数据。

#### Scenario: 返回统计数据
- **GIVEN** 用户已登录且有学习活动记录
- **WHEN** 发送 GET /api/analytics/overview
- **THEN** 返回 total_hours、completed_courses、streak_days、weekly_trend、monthly_trend

#### Scenario: 无数据用户
- **GIVEN** 用户刚注册，无任何学习活动
- **WHEN** 发送 GET /api/analytics/overview
- **THEN** 返回 200，所有数值为 0，趋势数组为空

#### Scenario: 未认证
- **GIVEN** 请求未携带有效 token
- **WHEN** 发送 GET /api/analytics/overview
- **THEN** 返回 401

---

### Requirement: 学习日历 API
系统 SHALL 提供 GET /api/analytics/calendar 返回用户近 90 天的每日学习数据。

#### Scenario: 返回日历数据
- **GIVEN** 用户有 30 天的学习记录
- **WHEN** 发送 GET /api/analytics/calendar?days=90
- **THEN** 返回 90 个日期条目，30 天有数据，60 天为空（hours=0）

---

### Requirement: 成就系统 API
系统 SHALL 提供 GET /api/analytics/achievements 返回所有成就及用户解锁状态。

#### Scenario: 返回成就列表
- **GIVEN** 用户已解锁部分成就
- **WHEN** 发送 GET /api/analytics/achievements
- **THEN** 返回全部 10 个成就定义，已解锁的含 unlocked_at 时间，未解锁的含 progress 进度描述
