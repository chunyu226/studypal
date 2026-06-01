## ADDED Requirements

### Requirement: 主题状态管理
系统 SHALL 提供亮色/暗色主题的状态管理，支持手动切换和持久化。

#### Scenario: 用户首次访问（无 localStorage 记录）
- **GIVEN** 用户首次访问网站，localStorage 中无 `theme` 键
- **WHEN** 页面加载
- **THEN** 主题回退到系统 `prefers-color-scheme` 偏好
- **AND** 若系统偏好为暗色，`<html>` 元素包含 `dark` class
- **AND** 若系统偏好为亮色，`<html>` 元素不包含 `dark` class

#### Scenario: 用户手动切换至暗色模式
- **GIVEN** 当前为亮色模式
- **WHEN** 用户点击主题切换按钮
- **THEN** `<html>` 元素添加 `dark` class
- **AND** `localStorage` 中 `theme` 键值为 `"dark"`
- **AND** 页面所有 Tailwind `dark:` 样式生效

#### Scenario: 用户手动切换至亮色模式
- **GIVEN** 当前为暗色模式
- **WHEN** 用户点击主题切换按钮
- **THEN** `<html>` 元素移除 `dark` class
- **AND** `localStorage` 中 `theme` 键值为 `"light"`
- **AND** 页面所有 Tailwind `dark:` 样式失效

#### Scenario: 用户刷新页面后主题保持
- **GIVEN** 用户之前已切换至暗色模式
- **WHEN** 用户刷新页面或关闭后重新打开
- **THEN** 主题保持为暗色模式（读取 localStorage）
- **AND** 无需用户重新切换

#### Scenario: 主题切换按钮可访问性
- **GIVEN** 用户使用键盘导航
- **WHEN** Tab 键聚焦至主题切换按钮
- **THEN** 按钮有可见的聚焦指示器（focus ring）
- **AND** 用户按 Enter 或 Space 触发切换
- **AND** 按钮有明确的 aria-label（如 "切换至暗色模式" / "切换至亮色模式"）

### Requirement: 全局 Tailwind dark class 联动
系统 SHALL 通过 `<html>` 元素的 `dark` class 驱动全局暗色模式样式。

#### Scenario: 暗色模式下 Hero 文字颜色
- **GIVEN** `<html>` 包含 `dark` class
- **WHEN** Hero 组件渲染
- **THEN** 标题和介绍文字使用白色（`text-white`）
- **AND** CSS 渐变背景使用暗色调色板

#### Scenario: 亮色模式下 Hero 文字颜色
- **GIVEN** `<html>` 不包含 `dark` class
- **WHEN** Hero 组件渲染
- **THEN** 标题和介绍文字使用深色（`text-slate-900`）
- **AND** CSS 渐变背景使用亮色调色板

#### Scenario: 系统偏好变化时自动跟随
- **GIVEN** 用户未手动设置过主题（localStorage 无记录）
- **WHEN** 操作系统切换亮/暗模式
- **THEN** 页面主题自动跟随系统偏好更新
