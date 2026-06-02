## ADDED Requirements

### Requirement: 侧边栏分组导航
DashboardLayout 侧边栏 SHALL 将导航项分为 3 个语义分组，每组带有标题标签。

#### Scenario: 分组展示
- **WHEN** 用户查看 Dashboard 侧边栏
- **THEN** 导航项按 3 组显示：学习数据（概览/统计分析）、AI 对话建议、学习目标（课程/笔记）
- **AND** 每组上方有标题标签

#### Scenario: 移动端分组
- **WHEN** 视口宽度 < 768px
- **THEN** 侧边栏 overlay 中同样按 3 组显示导航项

#### Scenario: 高亮当前路由
- **GIVEN** 用户在 /dashboard/analytics 页
- **WHEN** 侧边栏渲染
- **THEN** "统计分析" 项高亮，"概览" 不高亮
