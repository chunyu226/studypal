## ADDED Requirements

### Requirement: 导航栏固定展示
导航栏 SHALL 固定在页面视口顶部，始终可见，不随页面滚动而移动。

#### Scenario: 导航栏固定在顶部
- **WHEN** 用户打开页面
- **THEN** 导航栏固定在视口顶部，z-index 高于页面内容
- **AND** 导航栏左侧显示品牌名称"张老师"
- **AND** 导航栏右侧依次显示"首页""项目""联系我"三个链接

#### Scenario: 移动端汉堡菜单
- **WHEN** 视口宽度小于 768px
- **THEN** 右侧导航链接隐藏，显示汉堡菜单按钮
- **AND** 点击汉堡按钮后展开垂直菜单，显示"首页""项目""联系我"

---

### Requirement: 平滑滚动切换
用户点击导航链接时，页面 SHALL 平滑滚动到对应的 section。

#### Scenario: 点击导航链接
- **WHEN** 用户点击导航栏中的"项目"
- **THEN** 页面平滑滚动到 id 为 "projects" 的 section
- **AND** 滚动完成后该 section 完整可见

#### Scenario: 点击"首页"
- **WHEN** 用户点击导航栏中的"首页"
- **THEN** 页面平滑滚动到页面顶部（id 为 "hero" 的 section）

#### Scenario: 目标 section 不存在
- **WHEN** 用户点击一个链接，但其对应的 section 在页面中不存在
- **THEN** 页面不发生任何滚动，不报错

#### Scenario: 移动端点击菜单项后自动关闭
- **WHEN** 用户在移动端展开菜单后点击任意导航项
- **THEN** 导航菜单自动收起

---

### Requirement: 滚动时背景模糊效果
当页面滚动超过一定距离后，导航栏 SHALL 显示背景模糊效果（glassmorphism）。

#### Scenario: 页面在顶部时
- **WHEN** 页面滚动位置处于顶部（scrollY <= 10px）
- **THEN** 导航栏背景完全透明，无模糊效果

#### Scenario: 页面滚动后
- **WHEN** 页面滚动超过 10px
- **THEN** 导航栏显示半透明背景，并带有 backdrop-blur 模糊效果
- **AND** 背景模糊在亮色模式下为白色半透明，暗色模式下为深色半透明

#### Scenario: 滚动回顶部
- **WHEN** 用户从滚动位置回到页面顶部（scrollY <= 10px）
- **THEN** 导航栏模糊效果平滑消失，恢复完全透明

---

### Requirement: 亮/暗模式适配
导航栏 SHALL 自动适配系统的亮色和暗色模式。

#### Scenario: 亮色模式导航栏
- **WHEN** 页面处于亮色模式且用户已滚动超过 10px
- **THEN** 导航栏模糊背景为白色半透明（bg-white/70）
- **AND** 文字颜色为深色

#### Scenario: 暗色模式导航栏
- **WHEN** 页面处于暗色模式且用户已滚动超过 10px
- **THEN** 导航栏模糊背景为深色半透明（bg-slate-900/70）
- **AND** 文字颜色为浅色
