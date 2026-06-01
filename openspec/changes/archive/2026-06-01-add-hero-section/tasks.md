## 1. 项目初始化

- [x] 1.1 使用 Vite 脚手架创建 React 19 + TypeScript 项目
- [x] 1.2 安装并配置 Tailwind CSS v4（含 `class` dark mode 策略）
- [x] 1.3 配置 `vite.config.ts`：base path 为 `/my-website/`，dev server 端口
- [x] 1.4 创建 `src/index.css`：Tailwind 入口指令 + 亮/暗 CSS 渐变变量

## 2. Theme 系统

- [x] 2.1 实现 `src/hooks/useTheme.ts`：读取 localStorage / 系统偏好、切换主题、写入持久化、操作 `<html>` 的 `dark` class
- [x] 2.2 实现 `src/components/ThemeToggle.tsx`：切换按钮 UI，含 aria-label、focus-visible ring、亮/暗图标
- [x] 2.3 在 `src/App.tsx` 中调用 `useTheme`，验证切换和持久化正常工作

## 3. 粒子背景

- [x] 3.1 实现 `src/components/ParticleBackground.tsx`：Canvas 挂载、获取 2D context、根据主题颜色绘制粒子节点和连线
- [x] 3.2 实现粒子密度自适应：屏幕宽度 < 768px 时粒子数减半
- [x] 3.3 实现 resize 处理：debounce 150ms 重新绘制，Canvas 尺寸跟随容器
- [x] 3.4 实现主题切换时重绘：监听 theme prop 变化，清空 Canvas 用新色值重新绘制

## 4. Hero Section

- [x] 4.1 实现 `src/components/Hero.tsx`：全屏容器（`min-h-screen` + `min-h-dvh` fallback）、flex 垂直居中布局
- [x] 4.2 集成 ParticleBackground 作为背景层（`absolute inset-0 z-0`），内容层 `z-10`
- [x] 4.3 填入姓名（h1）、职业、一句话介绍（p）的占位文案
- [x] 4.4 实现 CTA 按钮：`<a href="/my-website/projects">`，Tailwind 样式，含 hover/focus 态

## 5. 集成与验证

- [x] 5.1 在 `src/App.tsx` 中引入 Hero 组件，确保页面正常渲染
- [x] 5.2 验证亮/暗切换：文字颜色、CSS 渐变、粒子颜色同步变化
- [x] 5.3 验证移动端响应式：dvh 高度适配、粒子密度减半、CTA 可点击
- [x] 5.4 验证无障碍：Tab 键导航、aria 属性、无 JS 时文字可见、Canvas 挂掉时渐变背景 fallback
