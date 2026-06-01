## ADDED Requirements

### Requirement: Canvas 粒子网格绘制
系统 SHALL 在 Hero 背景层使用 Canvas 绘制静态科技感粒子网格，叠加在 CSS 渐变之上。

#### Scenario: 页面首次加载绘制粒子
- **GIVEN** 页面加载完成且 JavaScript 可用
- **WHEN** ParticleBackground 组件挂载
- **THEN** Canvas 元素覆盖整个 Hero 区域
- **AND** Canvas 内绘制 50-80 个粒子节点（移动端 < 768px 时减半）
- **AND** 相邻距离 < 150px 的粒子之间绘制半透明连线
- **AND** 粒子颜色根据当前主题（亮/暗）使用对应色值

#### Scenario: 暗色模式下的粒子颜色
- **GIVEN** 当前主题为暗色模式
- **WHEN** 粒子网格被绘制
- **THEN** 粒子使用 cyan 色系（#4fc3f7）
- **AND** 连线透明度为 15%（rgba 0.15）

#### Scenario: 亮色模式下的粒子颜色
- **GIVEN** 当前主题为亮色模式
- **WHEN** 粒子网格被绘制
- **THEN** 粒子使用 indigo 色系（#4f46e5）
- **AND** 连线透明度为 25%（rgba 0.25）

#### Scenario: 用户切换主题时粒子重绘
- **GIVEN** 粒子网格已绘制
- **WHEN** 用户切换亮/暗模式
- **THEN** Canvas 清空并使用新主题色值重新绘制

#### Scenario: 浏览器窗口尺寸变化
- **GIVEN** 粒子网格已绘制
- **WHEN** 浏览器窗口被缩放导致 Canvas 尺寸变化
- **THEN** Canvas 尺寸更新为新的容器尺寸
- **AND** 粒子按新尺寸重新生成并绘制（debounce 150ms）

#### Scenario: 用户偏好减少动画
- **GIVEN** 用户系统设置了 `prefers-reduced-motion: reduce`
- **WHEN** 页面加载
- **THEN** 粒子依然绘制（因无动画，不受影响）
- **AND** 用户体验不受影响

#### Scenario: Canvas 渲染失败
- **GIVEN** Canvas getContext 调用失败（极端旧浏览器）
- **WHEN** 页面加载
- **THEN** 不抛出异常导致页面崩溃
- **AND** Hero 仅显示 CSS 渐变背景
