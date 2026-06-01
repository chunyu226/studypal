## ADDED Requirements

### Requirement: 侧边栏导航布局
DashboardLayout SHALL 使用左侧固定侧边栏 + 右侧内容区的经典布局。

#### Scenario: 桌面端侧边栏
- **WHEN** 视口宽度 >= 768px
- **THEN** 左侧显示 256px 宽的固定侧边栏，包含品牌标识、5 个导航项和主题切换按钮
- **AND** 右侧内容区填充剩余宽度

#### Scenario: 侧边栏导航高亮
- **WHEN** 用户当前在 `/dashboard` 路由
- **THEN** 侧边栏中"概览"导航项高亮显示

#### Scenario: 点击侧边栏导航项
- **WHEN** 用户点击侧边栏中的"课程"
- **THEN** 右侧内容区切换到 `/dashboard/courses` 占位页面

#### Scenario: 移动端侧边栏
- **WHEN** 视口宽度 < 768px
- **THEN** 侧边栏默认隐藏，顶部显示汉堡按钮
- **AND** 点击汉堡按钮后侧边栏以 overlay 模式弹出，带有 backdrop 遮罩

#### Scenario: 移动端点击导航后关闭
- **WHEN** 用户在移动端 overlay 侧边栏中点击任意导航项
- **THEN** 侧边栏自动关闭

---

### Requirement: 主题系统复用
DashboardLayout SHALL 复用现有的 useTheme hook 和 ThemeToggle 组件。

#### Scenario: 亮暗切换
- **WHEN** 用户在 Dashboard 侧边栏点击主题切换按钮
- **THEN** 整个应用（品牌站 + Dashboard）的主题同步切换，与品牌站行为一致
