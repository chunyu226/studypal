## ADDED Requirements

### Requirement: 用户 Profile API
系统 SHALL 提供 GET /api/users/me 端点，返回当前认证用户的 Profile 信息。

#### Scenario: 获取已登录用户 Profile
- **GIVEN** 用户已登录且持有有效 access token
- **WHEN** 用户发送 GET /api/users/me（携带 Authorization 头）
- **THEN** 返回 200 状态码和 UserProfile：id、email、name、avatar_url、streak_days、level

#### Scenario: 未认证访问
- **GIVEN** 用户未携带有效 token
- **WHEN** 用户发送 GET /api/users/me
- **THEN** 返回 401 状态码

---

### Requirement: Dashboard 侧边栏 Profile 展示
DashboardLayout SHALL 在侧边栏底部显示当前用户的头像、用户名、连续学习天数和等级。

#### Scenario: 已登录展示 Profile
- **GIVEN** 用户已登录
- **WHEN** 用户查看 Dashboard 侧边栏底部
- **THEN** 显示用户头像（或默认头像占位）、用户名、连续打卡天数（🔥 N天）和等级（Lv.N）

#### Scenario: 头像加载失败
- **GIVEN** 用户头像 URL 无效或加载失败
- **WHEN** 侧边栏渲染用户头像
- **THEN** 显示默认头像占位（灰色人像轮廓），不显示破损图标

---

### Requirement: 用户等级计算
系统 SHALL 根据连续学习天数自动计算用户等级。

#### Scenario: 等级计算规则
- **GIVEN** 用户的 streak_days 为 15
- **WHEN** 系统计算用户等级
- **THEN** level = floor(15 / 7) + 1 = 3
