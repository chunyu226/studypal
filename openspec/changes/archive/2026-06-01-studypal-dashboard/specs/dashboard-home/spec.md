## ADDED Requirements

### Requirement: 学习统计卡片
DashboardHome SHALL 在顶部以卡片网格展示 4 项学习统计数据。

#### Scenario: 统计卡片展示
- **WHEN** 用户进入 Dashboard 首页
- **THEN** 显示 4 张统计卡片：今日学习时长、完成课程数、连续打卡天数、专注指数
- **AND** 每张卡片包含图标、数值和标签文字
- **AND** 桌面端每行 4 张，移动端每行 2 张

#### Scenario: 统计卡片悬浮特效
- **WHEN** 用户鼠标悬停在统计卡片上
- **THEN** 卡片轻微放大（scale 1.03）且阴影加深
- **AND** 过渡动画时长 300ms

---

### Requirement: 每日目标清单
DashboardHome SHALL 展示每日学习目标清单及总体进度。

#### Scenario: 目标清单展示
- **WHEN** 用户查看每日目标区域
- **THEN** 显示 5 项学习目标，每项包含标题、勾选状态和进度百分比
- **AND** 顶部显示总体进度条（完成数/总数百分比）

#### Scenario: 空目标状态
- **WHEN** 所有目标均未开始（进度为 0）
- **THEN** 进度条宽度为 0，显示"今日尚未开始"提示

---

### Requirement: AI 学习建议面板
DashboardHome SHALL 展示 AI 生成的个性化学习建议（使用 Mock 数据）。

#### Scenario: 建议面板展示
- **WHEN** 用户查看 AI 建议区域
- **THEN** 显示 2-3 条学习建议，每条包含标题、描述文字和分类标签
- **AND** 建议卡片左侧带有色彩装饰条

---

### Requirement: 趋势图组件
DashboardHome SHALL 展示周/月学习趋势的 SVG 折线图。

#### Scenario: 周趋势图
- **WHEN** 用户选择"周" Tab
- **THEN** 显示近 7 天的学习时长折线图，X 轴为日期标签，Y 轴为小时数
- **AND** 折线下方带有半透明填充区域

#### Scenario: 切换到月趋势图
- **WHEN** 用户点击"月" Tab
- **THEN** 趋势图切换为近 30 天的数据

#### Scenario: 趋势数据为空
- **WHEN** Mock 数据中趋势数组为空
- **THEN** 图表区域显示"暂无数据"提示，不渲染空白 SVG
