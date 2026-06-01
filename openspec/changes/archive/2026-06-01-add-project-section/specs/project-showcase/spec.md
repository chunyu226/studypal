## ADDED Requirements

### Requirement: 项目卡片展示
项目展示区 SHALL 以卡片网格布局展示至少 4 个项目，每个卡片包含项目截图、名称、简介和 GitHub 链接。

#### Scenario: 卡片完整内容展示
- **WHEN** 用户滚动到项目展示区
- **THEN** 每个卡片显示项目截图（图片）、项目名称、项目简介和 GitHub 链接按钮
- **AND** 至少展示 4 个项目卡片

#### Scenario: 响应式网格布局
- **WHEN** 视口宽度变化
- **THEN** 移动端（<768px）显示单列，平板端显示双列，桌面端显示三列

#### Scenario: 图片加载失败
- **WHEN** 某项目截图的图片资源无法加载
- **THEN** 卡片中显示占位色块，不出现破损图片图标，不影响卡片布局

---

### Requirement: 鼠标悬浮微特效
用户将鼠标悬停在项目卡片上时，卡片 SHALL 呈现微缩放 + 阴影增强的视觉反馈。

#### Scenario: 鼠标悬浮卡片
- **WHEN** 用户鼠标悬停在某张项目卡片上
- **THEN** 该卡片轻微放大（scale 约 1.03）且阴影加深
- **AND** 特效过渡时间不超过 300ms

#### Scenario: 鼠标离开卡片
- **WHEN** 用户鼠标离开卡片
- **THEN** 卡片平滑恢复原始大小和阴影

#### Scenario: 移动端触摸
- **WHEN** 用户在触屏设备上查看项目卡片
- **THEN** 卡片不显示悬浮特效（无 hover 状态残留）

---

### Requirement: GitHub 链接可访问
每张卡片的 GitHub 链接 SHALL 可点击，并在新标签页中打开项目仓库。

#### Scenario: 点击 GitHub 链接
- **WHEN** 用户点击卡片上的 GitHub 链接
- **THEN** 在新标签页中打开对应的 GitHub 仓库页面
- **AND** 当前页面保持不变

---

### Requirement: 图片懒加载
项目展示区中的所有项目截图 SHALL 使用懒加载，仅当图片进入视口时才加载。

#### Scenario: 图片延迟加载
- **WHEN** 用户打开页面且项目展示区尚未进入视口
- **THEN** 项目截图不加载
- **AND** 当用户滚动至项目展示区附近时开始加载图片

---

### Requirement: Hero CTA 锚点指向
Hero 区域的"查看我的项目"按钮 SHALL 使用 #projects 锚点，点击后跳转到项目展示区。

#### Scenario: 点击 Hero CTA 按钮
- **WHEN** 用户点击 Hero 区域的"查看我的项目"按钮
- **THEN** 页面滚动到项目展示区（id 为 "projects" 的 section）
- **AND** 滚动过程中导航栏已存在的平滑滚动机制生效
