## ADDED Requirements

### Requirement: Hero 全屏展示
系统 SHALL 在页面首屏渲染一个全屏高度的 Hero 区域，垂直居中展示用户的核心身份信息。

#### Scenario: 用户首次访问页面
- **GIVEN** 用户打开网站
- **WHEN** 页面加载完成
- **THEN** Hero section 占据整个视口高度
- **AND** 用户姓名、职业、一句话介绍在视口中垂直居中
- **AND** CTA 按钮可见且可点击

#### Scenario: 移动端浏览器地址栏折叠
- **GIVEN** 用户在 iOS Safari 打开网站
- **WHEN** 地址栏折叠导致视口高度变化
- **THEN** Hero 高度自动适配新的视口高度（使用 dvh）
- **AND** 内容始终保持垂直居中

#### Scenario: 浏览器窗口缩放
- **GIVEN** 用户在桌面端拖拽缩放浏览器窗口
- **WHEN** 窗口大小改变
- **THEN** Hero 高度始终占满视口
- **AND** 内容始终保持垂直居中

### Requirement: CTA 按钮跳转
系统 SHALL 提供一个 CTA 按钮，点击后跳转至项目页面。

#### Scenario: 用户点击 CTA 按钮
- **GIVEN** Hero section 已渲染
- **WHEN** 用户点击 CTA 按钮
- **THEN** 浏览器导航至 `/my-website/projects`

#### Scenario: 用户在新标签页打开 CTA
- **GIVEN** Hero section 已渲染
- **WHEN** 用户使用右键或 Ctrl+Click 在新标签页打开 CTA
- **THEN** 新标签页正确加载 `/my-website/projects`

### Requirement: 无障碍可访问性
系统 SHALL 确保 Hero 区域对屏幕阅读器和辅助技术友好。

#### Scenario: 屏幕阅读器访问 Hero
- **GIVEN** 用户使用屏幕阅读器
- **WHEN** 阅读器遍历 Hero 区域
- **THEN** 姓名被识别为标题（h1）
- **AND** 介绍文字被识别为段落
- **AND** CTA 按钮被识别为可交互链接
- **AND** 粒子 Canvas 被标记为 aria-hidden="true"

#### Scenario: 无 JavaScript 环境
- **GIVEN** 用户浏览器禁用了 JavaScript
- **WHEN** 页面加载
- **THEN** Hero 文字内容正常显示（HTML 原生渲染）
- **AND** Canvas 粒子背景不渲染但不影响内容可读性
- **AND** CSS 渐变背景作为 fallback 可见
