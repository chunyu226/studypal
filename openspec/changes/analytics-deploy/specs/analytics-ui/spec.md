## ADDED Requirements

### Requirement: 学习热力图日历
AnalyticsPage SHALL 展示 90 天 GitHub 风格学习热力图。

#### Scenario: 热力图渲染
- **WHEN** 用户进入统计分析页
- **THEN** 显示 90 天热力图网格，每格颜色深浅反映当日学习时长（4 级渐变）
- **AND** hover 某格时显示日期和学习时长的 tooltip

#### Scenario: 无学习数据
- **GIVEN** 用户无任何学习记录
- **WHEN** 热力图渲染
- **THEN** 全部格子显示浅灰（无数据色），不报错

---

### Requirement: 成就徽章墙
AnalyticsPage SHALL 展示成就徽章网格，区分已解锁和未解锁状态。

#### Scenario: 成就展示
- **WHEN** 用户查看成就区域
- **THEN** 已解锁成就显示彩色图标 + 解锁日期
- **AND** 未解锁成就显示灰色锁定样式 + 进度文字（如 "3/5"）

---

### Requirement: 本周统计卡片
AnalyticsPage SHALL 展示本周学习数据摘要卡片。

#### Scenario: 本周数据展示
- **WHEN** 用户查看统计页面
- **THEN** 显示本周学习时长、完成课程数、连续打卡天数
